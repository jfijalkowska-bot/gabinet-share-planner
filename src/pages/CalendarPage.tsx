
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import CalendarView from "@/components/calendar/CalendarView";
import AvailabilityManager from "@/components/calendar/AvailabilityManager";
import BookingRequestsList from "@/components/calendar/BookingRequestsList";
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
            <TabsTrigger value="availability">Zarządzaj dostępnością</TabsTrigger>
            <TabsTrigger value="requests">Prośby o rezerwację</TabsTrigger>
          </TabsList>
          
          <TabsContent value="calendar">
            <CalendarView />
          </TabsContent>
          
          <TabsContent value="availability">
            <AvailabilityManager />
          </TabsContent>
          
          <TabsContent value="requests">
            <BookingRequestsList />
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default CalendarPage;
