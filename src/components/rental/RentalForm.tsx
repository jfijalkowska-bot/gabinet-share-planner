
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { pl } from "date-fns/locale";

const RentalForm = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [recurring, setRecurring] = useState(false);
  const [recurringType, setRecurringType] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  // Przykładowe godziny
  const times = [
    "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", 
    "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00", "20:00"
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ date, startTime, endTime, recurring, recurringType, name, email, phone, notes });
    // Tu będzie logika wynajmu
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>Wybierz datę</Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="bg-white rounded-md border shadow p-3 pointer-events-auto"
            locale={pl}
          />

          <div className="flex items-center space-x-2 mt-4">
            <Checkbox id="recurring" checked={recurring} onCheckedChange={(checked) => setRecurring(!!checked)} />
            <Label htmlFor="recurring" className="cursor-pointer">
              Wynajem cykliczny
            </Label>
          </div>

          {recurring && (
            <div className="mt-4">
              <Label htmlFor="recurringType">Powtarzaj</Label>
              <Select value={recurringType} onValueChange={setRecurringType}>
                <SelectTrigger>
                  <SelectValue placeholder="Wybierz" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Co tydzień</SelectItem>
                  <SelectItem value="biweekly">Co dwa tygodnie</SelectItem>
                  <SelectItem value="monthly">Co miesiąc</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime">Godzina rozpoczęcia</Label>
              <Select value={startTime} onValueChange={setStartTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Od" />
                </SelectTrigger>
                <SelectContent>
                  {times.map((t) => (
                    <SelectItem key={`start-${t}`} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="endTime">Godzina zakończenia</Label>
              <Select value={endTime} onValueChange={setEndTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Do" />
                </SelectTrigger>
                <SelectContent>
                  {times.map((t) => (
                    <SelectItem key={`end-${t}`} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="name">Imię i nazwisko</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div>
            <Label htmlFor="notes">Dodatkowe informacje</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
            />
          </div>
        </div>
      </div>

      <Button className="w-full bg-therapy-600 hover:bg-therapy-700" type="submit">
        Zarezerwuj gabinet
      </Button>
    </form>
  );
};

export default RentalForm;
