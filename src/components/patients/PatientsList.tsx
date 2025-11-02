import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface Patient {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  phone?: string;
  email?: string;
}

interface PatientsListProps {
  patients: Patient[];
  selectedPatientId: string | null;
  onSelectPatient: (id: string) => void;
  isLoading: boolean;
}

export function PatientsList({
  patients,
  selectedPatientId,
  onSelectPatient,
  isLoading,
}: PatientsListProps) {
  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  }

  if (patients.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">Brak pacjentów</p>
      </Card>
    );
  }

  return (
    <Card className="p-4">
      <div className="space-y-2">
        {patients.map((patient) => {
          const fullName = [patient.first_name, patient.last_name].filter(Boolean).join(' ') || 'Pacjent anonimowy';
          const initials = (patient.first_name?.[0] || '?') + (patient.last_name?.[0] || '?');
          return (
            <button
              key={patient.id}
              onClick={() => onSelectPatient(patient.id)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-left",
                "hover:bg-accent",
                selectedPatientId === patient.id && "bg-accent"
              )}
            >
              <Avatar>
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">
                  {fullName}
                </p>
                <p className="text-sm text-muted-foreground truncate">
                  {patient.phone || patient.email || "Brak kontaktu"}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </Card>
  );
}