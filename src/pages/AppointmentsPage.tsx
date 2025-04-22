
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import BookingForm from "@/components/bookings/BookingForm";
import { Card, CardContent } from "@/components/ui/card";

const AppointmentsPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-6 py-8">
        <PageHeader 
          title="Umów wizytę" 
          description="Zarezerwuj termin wizyty w dogodnym dla Ciebie czasie."
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
                <h3 className="text-xl font-semibold mb-4">Informacje o wizytach</h3>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-700">Rodzaje wizyt</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>Konsultacja psychologiczna</li>
                      <li>Psychoterapia indywidualna</li>
                      <li>Terapia par</li>
                      <li>Terapia rodzin</li>
                      <li>Sesja logopedyczna</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700">Czas trwania</h4>
                    <p className="text-gray-600">
                      Standardowa wizyta trwa 50 minut.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700">Cennik</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>Konsultacja: 180 zł</li>
                      <li>Psychoterapia indywidualna: 150 zł</li>
                      <li>Terapia par: 200 zł</li>
                      <li>Terapia rodzin: 250 zł</li>
                      <li>Sesja logopedyczna: 120 zł</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700">Zasady odwoływania wizyt</h4>
                    <p className="text-gray-600">
                      Wizytę można odwołać lub przełożyć najpóźniej 24 godziny przed planowanym terminem. W przypadku późniejszego odwołania, pacjent zobowiązany jest do opłacenia 50% ceny wizyty.
                    </p>
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
