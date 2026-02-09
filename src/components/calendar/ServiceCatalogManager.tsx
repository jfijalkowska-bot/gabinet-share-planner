import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Trash2, Edit2, Clock, Monitor, MapPin, Wrench } from "lucide-react";
import {
  useTherapistServices,
  useServiceTemplates,
  useCreateService,
  useUpdateService,
  useDeleteService,
  type TherapistService,
} from "@/hooks/useTherapistServices";

const DURATION_OPTIONS = [
  { value: 30, label: "30 min" },
  { value: 45, label: "45 min" },
  { value: 50, label: "50 min" },
  { value: 60, label: "1 godz." },
  { value: 90, label: "1,5 godz." },
  { value: 120, label: "2 godz." },
];

const SERVICE_TYPE_LABELS: Record<string, string> = {
  in_person: "Stacjonarna",
  remote: "Zdalna",
  both: "Stacjonarna / Zdalna",
};

const SERVICE_TYPE_ICONS: Record<string, React.ReactNode> = {
  in_person: <MapPin className="w-3 h-3" />,
  remote: <Monitor className="w-3 h-3" />,
  both: <><MapPin className="w-3 h-3" /><Monitor className="w-3 h-3" /></>,
};

interface ServiceFormData {
  name: string;
  description: string;
  duration_minutes: number;
  service_type: "in_person" | "remote" | "both";
  requires_equipment: string;
  note_for_client: string;
  price: string;
}

const emptyForm: ServiceFormData = {
  name: "",
  description: "",
  duration_minutes: 50,
  service_type: "in_person",
  requires_equipment: "",
  note_for_client: "",
  price: "",
};

export default function ServiceCatalogManager() {
  const { data: services, isLoading } = useTherapistServices();
  const { data: templates } = useServiceTemplates();
  const createService = useCreateService();
  const updateService = useUpdateService();
  const deleteService = useDeleteService();

  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ServiceFormData>(emptyForm);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsOpen(true);
  };

  const openEdit = (s: TherapistService) => {
    setEditingId(s.id);
    setForm({
      name: s.name,
      description: s.description || "",
      duration_minutes: s.duration_minutes,
      service_type: s.service_type,
      requires_equipment: s.requires_equipment?.join(", ") || "",
      note_for_client: s.note_for_client || "",
      price: s.price?.toString() || "",
    });
    setIsOpen(true);
  };

  const applyTemplate = (t: { name: string; default_duration_minutes: number }) => {
    setForm({ ...form, name: t.name, duration_minutes: t.default_duration_minutes });
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    const payload = {
      name: form.name,
      description: form.description || null,
      duration_minutes: form.duration_minutes,
      service_type: form.service_type,
      requires_equipment: form.requires_equipment
        ? form.requires_equipment.split(",").map((s) => s.trim()).filter(Boolean)
        : [],
      note_for_client: form.note_for_client || null,
      price: form.price ? parseFloat(form.price) : null,
    };

    if (editingId) {
      updateService.mutate({ id: editingId, ...payload } as any, {
        onSuccess: () => setIsOpen(false),
      });
    } else {
      createService.mutate(payload as any, {
        onSuccess: () => setIsOpen(false),
      });
    }
  };

  if (isLoading) return <div>Ładowanie...</div>;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Katalog usług</CardTitle>
            <CardDescription>
              Zdefiniuj usługi, które oferujesz. Klienci będą mogli wybrać konkretną usługę przy rezerwacji.
            </CardDescription>
          </div>
          <Button onClick={openCreate}>
            <Plus className="w-4 h-4 mr-2" />
            Dodaj usługę
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {services?.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">
            Nie masz jeszcze zdefiniowanych usług. Dodaj pierwszą usługę, aby klienci mogli rezerwować konkretne sesje.
          </p>
        ) : (
          <div className="space-y-3">
            {services?.map((s) => (
              <div
                key={s.id}
                className={`flex items-center justify-between border rounded-lg p-4 ${
                  !s.is_active ? "opacity-50" : ""
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{s.name}</span>
                    <Badge variant="outline" className="gap-1 text-xs">
                      <Clock className="w-3 h-3" />
                      {s.duration_minutes} min
                    </Badge>
                    <Badge variant="secondary" className="gap-1 text-xs">
                      {SERVICE_TYPE_ICONS[s.service_type]}
                      {SERVICE_TYPE_LABELS[s.service_type]}
                    </Badge>
                    {s.price && (
                      <Badge variant="outline" className="text-xs">
                        {s.price} PLN
                      </Badge>
                    )}
                  </div>
                  {s.description && (
                    <p className="text-sm text-muted-foreground">{s.description}</p>
                  )}
                  {s.requires_equipment?.length > 0 && (
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Wrench className="w-3 h-3" />
                      Sprzęt: {s.requires_equipment.join(", ")}
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={s.is_active}
                    onCheckedChange={(checked) =>
                      updateService.mutate({ id: s.id, is_active: checked })
                    }
                  />
                  <Button variant="ghost" size="sm" onClick={() => openEdit(s)}>
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteService.mutate(s.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingId ? "Edytuj usługę" : "Dodaj nową usługę"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {!editingId && templates && templates.length > 0 && (
              <div className="space-y-2">
                <Label>Wybierz z szablonów (opcjonalnie)</Label>
                <div className="flex flex-wrap gap-2">
                  {templates.map((t) => (
                    <Badge
                      key={t.id}
                      variant="outline"
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => applyTemplate(t)}
                    >
                      {t.name} ({t.default_duration_minutes} min)
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label>Nazwa usługi *</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="np. Psychoterapia indywidualna"
              />
            </div>

            <div className="space-y-2">
              <Label>Opis</Label>
              <Textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Krótki opis usługi widoczny dla klientów"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Czas trwania</Label>
                <Select
                  value={form.duration_minutes.toString()}
                  onValueChange={(v) =>
                    setForm({ ...form, duration_minutes: parseInt(v) })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {DURATION_OPTIONS.map((d) => (
                      <SelectItem key={d.value} value={d.value.toString()}>
                        {d.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Typ sesji</Label>
                <Select
                  value={form.service_type}
                  onValueChange={(v: "in_person" | "remote" | "both") =>
                    setForm({ ...form, service_type: v })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="in_person">Stacjonarna</SelectItem>
                    <SelectItem value="remote">Zdalna</SelectItem>
                    <SelectItem value="both">Obie formy</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Cena (PLN)</Label>
              <Input
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="np. 200"
              />
            </div>

            <div className="space-y-2">
              <Label>Wymagany sprzęt (po przecinku)</Label>
              <Input
                value={form.requires_equipment}
                onChange={(e) =>
                  setForm({ ...form, requires_equipment: e.target.value })
                }
                placeholder="np. Aparat EEG, Słuchawki"
              />
            </div>

            <div className="space-y-2">
              <Label>Notatka dla klienta</Label>
              <Textarea
                value={form.note_for_client}
                onChange={(e) =>
                  setForm({ ...form, note_for_client: e.target.value })
                }
                placeholder="np. Proszę zabrać ze sobą słuchawki"
                rows={2}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Anuluj
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={
                !form.name.trim() ||
                createService.isPending ||
                updateService.isPending
              }
            >
              {editingId ? "Zapisz zmiany" : "Dodaj usługę"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
