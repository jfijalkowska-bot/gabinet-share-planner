import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const TrainingsPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Redirect to search page with training tab
    navigate('/search?tab=training', { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Przekierowywanie do wyszukiwarki...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TrainingsPage;