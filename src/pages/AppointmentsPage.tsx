
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import BookingForm from "@/components/bookings/BookingForm";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, User } from "lucide-react";

const AppointmentsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-6 py-8">
        <PageHeader 
          title="Umów wizytę" 
          description="Wybierz specjalistę i zarezerwuj wizytę w dogodnym terminie spośród dostępnych."
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="pt-6">
                <BookingForm />
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Jak umówić wizytę?</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <User className="w-5 h-5 mt-1 text-therapy-600" />
                    <div>
                      <h4 className="font-medium text-gray-700">1. Wybierz specjalistę</h4>
                      <p className="text-gray-600">
                        Przejrzyj profile dostępnych specjalistów i wybierz odpowiedniego dla siebie.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 mt-1 text-therapy-600" />
                    <div>
                      <h4 className="font-medium text-gray-700">2. Sprawdź dostępne terminy</h4>
                      <p className="text-gray-600">
                        Zobacz kalendarz z wolnymi terminami wybranego specjalisty.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 mt-1 text-therapy-600" />
                    <div>
                      <h4 className="font-medium text-gray-700">3. Zarezerwuj termin</h4>
                      <p className="text-gray-600">
                        Wybierz dogodny termin i wypełnij formularz rezerwacji.
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t">
                    <h4 className="font-medium text-gray-700 mb-2">Cennik</h4>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex justify-between">
                        <span>Konsultacja psychologiczna</span>
                        <span className="font-medium">180 zł</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Psychoterapia indywidualna</span>
                        <span className="font-medium">150 zł</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Terapia par</span>
                        <span className="font-medium">200 zł</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Terapia rodzin</span>
                        <span className="font-medium">250 zł</span>
                      </li>
                      <li className="flex justify-between">
                        <span>Sesja logopedyczna</span>
                        <span className="font-medium">120 zł</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AppointmentsPage;
