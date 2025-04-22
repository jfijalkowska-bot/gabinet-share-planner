
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import CalendarView from "@/components/calendar/CalendarView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StatsOverview from "@/components/stats/StatsOverview";

const CalendarPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-6 py-8">
        <PageHeader 
          title="Kalendarz gabinetu" 
          description="Zarządzaj dostępnością, wizytami klientów i wynajmem gabinetu."
        />
        
        <div className="mb-8">
          <StatsOverview />
        </div>
        
        <Tabs defaultValue="calendar">
          <TabsList className="mb-4">
            <TabsTrigger value="calendar">Widok kalendarza</TabsTrigger>
            <TabsTrigger value="appointments">Wizyty klientów</TabsTrigger>
            <TabsTrigger value="rentals">Wynajem gabinetu</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar">
            <CalendarView />
          </TabsContent>
          
          <TabsContent value="appointments">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Nadchodzące wizyty</h2>
              {/* Tu będzie lista wizyt, na razie placeholder */}
              <p className="text-gray-600">
                W tej sekcji będzie wyświetlana lista nadchodzących wizyt klientów.
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="rentals">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h2 className="text-xl font-semibold mb-4">Wynajem gabinetu</h2>
              {/* Tu będzie lista wynajmów, na razie placeholder */}
              <p className="text-gray-600">
                W tej sekcji będzie wyświetlana lista aktualnych i nadchodzących wynajmów gabinetu.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default CalendarPage;
