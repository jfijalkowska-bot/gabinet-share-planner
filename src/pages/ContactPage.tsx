import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, Clock, MessageCircle, HelpCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Symulacja wysłania wiadomości
    toast({
      title: "Wiadomość wysłana",
      description: "Dziękujemy za kontakt. Odpowiemy w ciągu 24 godzin.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Kontakt
            </h1>
            <p className="text-xl text-gray-600">
              Skontaktuj się z nami - chętnie odpowiemy na Twoje pytania
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Formularz kontaktowy */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-therapy-600" />
                  Wyślij wiadomość
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Imię i nazwisko *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Adres email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Temat</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Wiadomość *</Label>
                    <Textarea
                      id="message"
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full bg-therapy-600 hover:bg-therapy-700">
                    Wyślij wiadomość
                  </Button>
                </form>
              </CardContent>
            </Card>
            
            {/* Informacje kontaktowe */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Dane kontaktowe</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-therapy-600" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600">kontakt@gabinetshare.pl</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-therapy-600" />
                    <div>
                      <p className="font-medium">Telefon</p>
                      <p className="text-gray-600">+48 123 456 789</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-therapy-600" />
                    <div>
                      <p className="font-medium">Adres</p>
                      <p className="text-gray-600">ul. Przykładowa 123<br />00-001 Warszawa</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-therapy-600" />
                    <div>
                      <p className="font-medium">Godziny obsługi</p>
                      <p className="text-gray-600">
                        Pon-Pt: 9:00-17:00<br />
                        Sob-Niedz: zamknięte
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-therapy-600" />
                    Często zadawane pytania
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">W jakim czasie otrzymam odpowiedź?</h4>
                    <p className="text-gray-600 text-sm">
                      Staramy się odpowiadać na wszystkie wiadomości w ciągu 24 godzin w dni robocze.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Jak mogę zgłosić problem techniczny?</h4>
                    <p className="text-gray-600 text-sm">
                      Opisz szczegółowo problem w formularzu, podając informacje o przeglądarce i urządzeniu.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Czy oferujecie wsparcie telefoniczne?</h4>
                    <p className="text-gray-600 text-sm">
                      Tak, wsparcie telefoniczne dostępne jest w godzinach 10:00-16:00 w dni robocze.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ContactPage;