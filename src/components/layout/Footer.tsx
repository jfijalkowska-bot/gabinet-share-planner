
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  
  return (
    <footer className="bg-gray-50 border-t py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4 text-therapy-800">GabinetShare</h3>
            <p className="text-gray-600">
              Aplikacja do zarządzania gabinetem - wynajem dla terapeutów i rezerwacje dla klientów.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-therapy-800">Szybkie linki</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-therapy-600 transition-colors">
                  Strona główna
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-600 hover:text-therapy-600 transition-colors">
                  Wyszukiwarka
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-600 hover:text-therapy-600 transition-colors">
                  Społeczność
                </Link>
              </li>
              <li>
                <Link to="/trainings" className="text-gray-600 hover:text-therapy-600 transition-colors">
                  Szkolenia
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-therapy-800">Informacje prawne</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-therapy-600 transition-colors">
                  Regulamin
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-therapy-600 transition-colors">
                  O firmie
                </Link>
              </li>
              <li>
                <Link to="/payments-info" className="text-gray-600 hover:text-therapy-600 transition-colors">
                  Informacje o płatnościach
                </Link>
              </li>
              <li>
                <Link to="/gdpr" className="text-gray-600 hover:text-therapy-600 transition-colors">
                  Prawa RODO
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-therapy-600 transition-colors">
                  Kontakt i reklamacje
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-therapy-800">{t('footer.owner')}</h4>
            <ul className="space-y-2 text-gray-600">
              <li>Jadwiga Fijałkowska</li>
              <li>Osiedle Piastowskie 100/6</li>
              <li>61-163 Poznań</li>
              <li className="pt-2">Email: kontakt@gabinet-psychologa.com.pl</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} GabinetShare. {t('footer.allRights')}.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
