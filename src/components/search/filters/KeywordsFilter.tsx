
import { Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UseFormRegister } from "react-hook-form";

interface KeywordsFilterProps {
  register: UseFormRegister<any>;
}

const KeywordsFilter = ({ register }: KeywordsFilterProps) => (
  <div className="space-y-2">
    <Label className="flex items-center gap-2">
      <Search className="h-4 w-4" />
      Słowa kluczowe (np. metoda, problem, nazwisko)
    </Label>
    <Input
      placeholder="Wpisz słowa kluczowe"
      {...register("keywords")}
    />
  </div>
);

export default KeywordsFilter;
