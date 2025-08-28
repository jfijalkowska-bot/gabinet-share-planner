import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import TrainingFilters from "@/components/trainings/TrainingFilters";
import TrainingList from "@/components/trainings/TrainingList";
import TrainingForm from "@/components/trainings/TrainingForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface TrainingSearchParams {
  keywords?: string;
  topic?: string;
  format?: string;
  location?: string;
  priceMin?: number;
  priceMax?: number;
  startDate?: string;
  endDate?: string;
  instructor?: string;
  organizer?: string;
  certificateAvailable?: boolean;
}

const TrainingsPage = () => {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useState<TrainingSearchParams>({});
  const [isCreateTrainingOpen, setIsCreateTrainingOpen] = useState(false);

  const handleSearch = (params: TrainingSearchParams) => {
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-6">
          <PageHeader 
            title="Szkolenia i Kursy" 
            description="Znajdź szkolenia, warsztaty i kursy dla terapeutów"
          />
          {user && (
            <Button 
              onClick={() => setIsCreateTrainingOpen(true)}
              className="bg-therapy-600 hover:bg-therapy-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Dodaj szkolenie
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters */}
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <TrainingFilters onSearch={handleSearch} />
            </div>
          </div>

          {/* Training List */}
          <div className="lg:col-span-3">
            <TrainingList searchParams={searchParams} />
          </div>
        </div>
      </main>
      
      <Footer />

      {/* Create Training Dialog */}
      <Dialog open={isCreateTrainingOpen} onOpenChange={setIsCreateTrainingOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <TrainingForm
            onSuccess={() => setIsCreateTrainingOpen(false)}
            onCancel={() => setIsCreateTrainingOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrainingsPage;