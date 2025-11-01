import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

interface Session {
  id: string;
  session_date: string;
  duration_minutes?: number;
  session_type: string;
  notes?: string;
  mood_before?: string;
  mood_after?: string;
  topics_discussed?: string[];
  interventions_used?: string[];
  homework_assigned?: string;
  ai_summary?: string;
}

interface SessionDetailsDialogProps {
  session: Session;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SessionDetailsDialog({ session, open, onOpenChange }: SessionDetailsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Szczegóły sesji - {format(new Date(session.session_date), "dd MMMM yyyy, HH:mm", { locale: pl })}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex gap-2">
            <Badge>{session.session_type}</Badge>
            {session.duration_minutes && (
              <Badge variant="outline">{session.duration_minutes} min</Badge>
            )}
          </div>

          {(session.mood_before || session.mood_after) && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-3">Nastrój</h3>
                <div className="grid grid-cols-2 gap-4">
                  {session.mood_before && (
                    <div>
                      <p className="text-sm text-muted-foreground">Przed sesją</p>
                      <p className="font-medium">{session.mood_before}</p>
                    </div>
                  )}
                  {session.mood_after && (
                    <div>
                      <p className="text-sm text-muted-foreground">Po sesji</p>
                      <p className="font-medium">{session.mood_after}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {session.ai_summary && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-2">Podsumowanie AI</h3>
                <p className="text-sm">{session.ai_summary}</p>
              </CardContent>
            </Card>
          )}

          {session.notes && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-2">Notatki</h3>
                <p className="text-sm whitespace-pre-wrap">{session.notes}</p>
              </CardContent>
            </Card>
          )}

          {session.topics_discussed && session.topics_discussed.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-2">Omawiane tematy</h3>
                <div className="flex flex-wrap gap-2">
                  {session.topics_discussed.map((topic, i) => (
                    <Badge key={i} variant="secondary">{topic}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {session.interventions_used && session.interventions_used.length > 0 && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-2">Użyte interwencje</h3>
                <div className="flex flex-wrap gap-2">
                  {session.interventions_used.map((intervention, i) => (
                    <Badge key={i} variant="secondary">{intervention}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {session.homework_assigned && (
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-medium mb-2">Zadanie domowe</h3>
                <p className="text-sm">{session.homework_assigned}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}