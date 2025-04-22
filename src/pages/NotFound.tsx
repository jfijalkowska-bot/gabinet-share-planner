
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center">
        <div className="text-center px-6 py-16">
          <h1 className="text-6xl font-bold text-therapy-600 mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Strona nie została znaleziona</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Przepraszamy, ale strona której szukasz nie istnieje lub została przeniesiona.
          </p>
          <Button asChild>
            <Link to="/">Powrót do strony głównej</Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
