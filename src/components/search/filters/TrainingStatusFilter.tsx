
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const trainingStatuses = [
  { id: "training", label: "W trakcie szkolenia" },
  { id: "certification", label: "W trakcie certyfikacji" },
  { id: "certificate", label: "Posiada certyfikat" }
];

interface TrainingStatusFilterProps {
  register: any;
}

const TrainingStatusFilter = ({ register }: TrainingStatusFilterProps) => (
  <div className="space-y-2 mt-2">
    <Label className="mb-2 font-medium">Status szkolenia/certyfikacji</Label>
    <div className="flex flex-col gap-1">
      {trainingStatuses.map((s) => (
        <div key={s.id} className="flex items-center space-x-2">
          <Checkbox
            id={`trainstatus-${s.id}`}
            {...register("trainingStatus")}
            value={s.id}
          />
          <Label htmlFor={`trainstatus-${s.id}`} className="cursor-pointer">
            {s.label}
          </Label>
        </div>
      ))}
    </div>
  </div>
);

export default TrainingStatusFilter;
