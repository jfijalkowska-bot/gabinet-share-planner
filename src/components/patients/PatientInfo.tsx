import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { pl } from "date-fns/locale";

interface Patient {
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  phone?: string;
  email?: string;
  address?: string;
  diagnosis?: string;
  treatment_goals?: string;
  notes?: string;
  emergency_contact_name?: string;
  emergency_contact_phone?: string;
}

interface PatientInfoProps {
  patient: Patient;
  onUpdate: () => void;
}

export function PatientInfo({ patient }: PatientInfoProps) {
  return (
    <div className="space-y-4 mt-4">
      <Card>
        <CardContent className="pt-6 space-y-3">
          <InfoRow label="Imię i nazwisko" value={`${patient.first_name} ${patient.last_name}`} />
          {patient.date_of_birth && (
            <InfoRow
              label="Data urodzenia"
              value={format(new Date(patient.date_of_birth), "dd MMMM yyyy", { locale: pl })}
            />
          )}
          {patient.phone && <InfoRow label="Telefon" value={patient.phone} />}
          {patient.email && <InfoRow label="Email" value={patient.email} />}
          {patient.address && <InfoRow label="Adres" value={patient.address} />}
        </CardContent>
      </Card>

      {(patient.emergency_contact_name || patient.emergency_contact_phone) && (
        <Card>
          <CardContent className="pt-6 space-y-3">
            <h3 className="font-medium mb-2">Kontakt awaryjny</h3>
            {patient.emergency_contact_name && (
              <InfoRow label="Osoba kontaktowa" value={patient.emergency_contact_name} />
            )}
            {patient.emergency_contact_phone && (
              <InfoRow label="Telefon" value={patient.emergency_contact_phone} />
            )}
          </CardContent>
        </Card>
      )}

      {patient.diagnosis && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium mb-2">Diagnoza</h3>
            <p className="text-sm">{patient.diagnosis}</p>
          </CardContent>
        </Card>
      )}

      {patient.treatment_goals && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium mb-2">Cele terapii</h3>
            <p className="text-sm">{patient.treatment_goals}</p>
          </CardContent>
        </Card>
      )}

      {patient.notes && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="font-medium mb-2">Notatki</h3>
            <p className="text-sm">{patient.notes}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-start">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium text-right">{value}</span>
    </div>
  );
}