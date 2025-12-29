import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { 
  Search, 
  Shield, 
  ShieldOff, 
  CreditCard, 
  UserX,
  Calendar 
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface TherapistUser {
  id: string;
  user_id: string;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  created_at: string;
  is_admin?: boolean;
  has_exemption?: boolean;
}

interface ExemptionDialogData {
  userId: string;
  userName: string;
  hasExemption: boolean;
  reason?: string;
  validUntil?: string;
}

const UserManagement = () => {
  const [users, setUsers] = useState<TherapistUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [exemptionDialog, setExemptionDialog] = useState<ExemptionDialogData | null>(null);
  const [exemptionReason, setExemptionReason] = useState("");
  const [exemptionValidUntil, setExemptionValidUntil] = useState("");
  const [isIndefinite, setIsIndefinite] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Pobierz profile terapeutów
      const { data: therapists, error: therapistsError } = await supabase
        .from('therapist_profiles')
        .select('id, user_id, first_name, last_name, phone, created_at');

      if (therapistsError) throw therapistsError;

      // Pobierz role adminów
      const { data: adminRoles } = await supabase
        .from('user_roles')
        .select('user_id, role')
        .eq('role', 'admin');

      // Pobierz zwolnienia z opłat
      const { data: exemptions } = await supabase
        .from('payment_exemptions')
        .select('user_id');

      const adminUserIds = new Set(adminRoles?.map(r => r.user_id) || []);
      const exemptUserIds = new Set(exemptions?.map(e => e.user_id) || []);

      const enrichedUsers = (therapists || []).map(user => ({
        ...user,
        is_admin: adminUserIds.has(user.user_id),
        has_exemption: exemptUserIds.has(user.user_id),
      }));

      setUsers(enrichedUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Błąd podczas pobierania użytkowników');
    } finally {
      setLoading(false);
    }
  };

  const toggleAdminRole = async (userId: string, isAdmin: boolean) => {
    try {
      if (isAdmin) {
        // Usuń rolę admina
        const { error } = await supabase
          .from('user_roles')
          .delete()
          .eq('user_id', userId)
          .eq('role', 'admin');
        
        if (error) throw error;
        toast.success('Usunięto uprawnienia administratora');
      } else {
        // Dodaj rolę admina
        const { error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role: 'admin' });
        
        if (error) throw error;
        toast.success('Nadano uprawnienia administratora');
      }
      fetchUsers();
    } catch (error) {
      console.error('Error toggling admin role:', error);
      toast.error('Błąd podczas zmiany uprawnień');
    }
  };

  const openExemptionDialog = (user: TherapistUser) => {
    setExemptionDialog({
      userId: user.user_id,
      userName: `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Nieznany',
      hasExemption: user.has_exemption || false,
    });
    setExemptionReason("");
    setExemptionValidUntil("");
    setIsIndefinite(true);
  };

  const handleExemption = async () => {
    if (!exemptionDialog) return;

    try {
      if (exemptionDialog.hasExemption) {
        // Usuń zwolnienie
        const { error } = await supabase
          .from('payment_exemptions')
          .delete()
          .eq('user_id', exemptionDialog.userId);
        
        if (error) throw error;
        toast.success('Usunięto zwolnienie z opłat');
      } else {
        // Dodaj zwolnienie
        const { data: { user } } = await supabase.auth.getUser();
        
        const { error } = await supabase
          .from('payment_exemptions')
          .insert({ 
            user_id: exemptionDialog.userId,
            reason: exemptionReason || null,
            valid_until: isIndefinite ? null : exemptionValidUntil || null,
            granted_by: user?.id,
          });
        
        if (error) throw error;
        toast.success('Nadano zwolnienie z opłat');
      }
      setExemptionDialog(null);
      fetchUsers();
    } catch (error) {
      console.error('Error managing exemption:', error);
      toast.error('Błąd podczas zarządzania zwolnieniem');
    }
  };

  const filteredUsers = users.filter(user => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.first_name?.toLowerCase().includes(searchLower) ||
      user.last_name?.toLowerCase().includes(searchLower) ||
      user.phone?.toLowerCase().includes(searchLower)
    );
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Zarządzanie użytkownikami</span>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Szukaj użytkowników..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <p className="text-center py-8 text-muted-foreground">Ładowanie...</p>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Imię i nazwisko</TableHead>
                <TableHead>Telefon</TableHead>
                <TableHead>Data rejestracji</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Akcje</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    {user.first_name} {user.last_name}
                  </TableCell>
                  <TableCell>{user.phone || 'Brak'}</TableCell>
                  <TableCell>
                    {new Date(user.created_at).toLocaleDateString('pl-PL')}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {user.is_admin && (
                        <Badge variant="default">Admin</Badge>
                      )}
                      {user.has_exemption && (
                        <Badge variant="secondary">Zwolniony z opłat</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleAdminRole(user.user_id, user.is_admin || false)}
                        title={user.is_admin ? 'Usuń admina' : 'Nadaj admina'}
                      >
                        {user.is_admin ? (
                          <ShieldOff className="h-4 w-4" />
                        ) : (
                          <Shield className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openExemptionDialog(user)}
                        title={user.has_exemption ? 'Usuń zwolnienie' : 'Zwolnij z opłat'}
                      >
                        <CreditCard className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {/* Dialog zwolnienia z opłat */}
      <Dialog open={!!exemptionDialog} onOpenChange={() => setExemptionDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {exemptionDialog?.hasExemption 
                ? 'Usuń zwolnienie z opłat' 
                : 'Nadaj zwolnienie z opłat'}
            </DialogTitle>
            <DialogDescription>
              Użytkownik: {exemptionDialog?.userName}
            </DialogDescription>
          </DialogHeader>

          {!exemptionDialog?.hasExemption && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Powód zwolnienia (opcjonalnie)</Label>
                <Textarea
                  value={exemptionReason}
                  onChange={(e) => setExemptionReason(e.target.value)}
                  placeholder="Podaj powód zwolnienia..."
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch
                  checked={isIndefinite}
                  onCheckedChange={setIsIndefinite}
                />
                <Label>Bezterminowe zwolnienie</Label>
              </div>

              {!isIndefinite && (
                <div className="space-y-2">
                  <Label>Ważne do</Label>
                  <Input
                    type="date"
                    value={exemptionValidUntil}
                    onChange={(e) => setExemptionValidUntil(e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setExemptionDialog(null)}>
              Anuluj
            </Button>
            <Button 
              onClick={handleExemption}
              variant={exemptionDialog?.hasExemption ? "destructive" : "default"}
            >
              {exemptionDialog?.hasExemption ? 'Usuń zwolnienie' : 'Nadaj zwolnienie'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default UserManagement;