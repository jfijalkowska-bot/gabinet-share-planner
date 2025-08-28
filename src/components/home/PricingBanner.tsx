
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PricingBanner = () => {
  return (
    <div className="bg-therapy-50 py-10">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="md:flex">
            <div className="md:w-2/3 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-therapy-700 mb-2">
                GabinetShare dla każdego
              </h2>
              <p className="text-gray-600 mb-4">
                Wyszukuj gabinety i terapeutów całkowicie bezpłatnie. 
                Wybierz plan dopasowany do swoich potrzeb - od wizytówki za 49 zł rocznie po pełny abonament z kalendarzem, superwizją i wszystkimi funkcjami.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/how-it-works">
                  <Button variant="outline">
                    Jak działa GabinetShare?
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-therapy-600 hover:bg-therapy-700">
                    Dołącz do społeczności
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/3 bg-gradient-to-r from-therapy-600 to-therapy-700 p-6 md:p-8 text-white flex flex-col justify-center">
              <h3 className="text-xl font-semibold mb-2">Program Partnerski</h3>
              <p className="mb-4 text-therapy-50">
                Zarabiaj 10% prowizji za każde polecenie, niezależnie od Twojej roli.
              </p>
              <Link to="/affiliate">
                <Button variant="secondary" className="w-full">
                  Dowiedz się więcej
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingBanner;
