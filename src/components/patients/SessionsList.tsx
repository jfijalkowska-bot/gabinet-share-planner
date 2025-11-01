import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { useState } from "react";
import { SessionDetailsDialog } from "./SessionDetailsDialog";

interface Session {
  id: string;
  session_date: string;
  duration_minutes?: number;
  session_type: string;
  notes?: string;
  mood_before?: string;
  mood_after?: string;
  ai_summary?: string;
}

interface SessionsListProps {
  sessions: Session[];
}

export function SessionsList({ sessions }: SessionsListProps) {
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  if (sessions.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Brak sesji
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="space-y-3">
        {sessions.map((session) => (
          <Card
            key={session.id}
            className="cursor-pointer hover:bg-accent transition-colors"
            onClick={() => setSelectedSession(session)}
          >
            <CardContent className="py-4">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">
                    {format(new Date(session.session_date), "dd MMMM yyyy, HH:mm", { locale: pl })}
                  </p>
                  {session.duration_minutes && (
                    <p className="text-sm text-muted-foreground">
                      Czas trwania: {session.duration_minutes} min
                    </p>
                  )}
                  {session.ai_summary && (
                    <p className="text-sm mt-2 line-clamp-2">{session.ai_summary}</p>
                  )}
                </div>
                <Badge variant="outline">{session.session_type}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedSession && (
        <SessionDetailsDialog
          session={selectedSession}
          open={!!selectedSession}
          onOpenChange={(open) => !open && setSelectedSession(null)}
        />
      )}
    </>
  );
}