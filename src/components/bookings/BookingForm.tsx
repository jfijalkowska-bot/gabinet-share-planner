
import { useState } from "react";
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
import { pl } from "date-fns/locale";

const BookingForm = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Przykładowe dostępne godziny
  const availableTimes = ["9:00", "10:00", "11:00", "14:00", "15:00", "16:00"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ date, time, name, email, phone, message });
    // Tu będzie logika rezerwacji
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
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="time">Dostępne godziny</Label>
            <Select value={time} onValueChange={setTime}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Wybierz godzinę" />
              </SelectTrigger>
              <SelectContent>
                {availableTimes.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>
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
            />
          </div>

          <div>
            <Label htmlFor="message">Wiadomość (opcjonalnie)</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
            />
          </div>
        </div>
      </div>

      <Button className="w-full bg-therapy-600 hover:bg-therapy-700" type="submit">
        Zarezerwuj termin
      </Button>
    </form>
  );
};

export default BookingForm;
