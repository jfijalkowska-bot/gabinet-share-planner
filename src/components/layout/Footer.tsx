
import LocalizedLink from "@/components/common/LocalizedLink";
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
              {t('footer.description', 'Aplikacja do zarządzania gabinetem - wynajem dla terapeutów i rezerwacje dla klientów.')}
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-therapy-800">{t('footer.quickLinks', 'Szybkie linki')}</h4>
            <ul className="space-y-2">
              <li>
                <LocalizedLink to="/" className="text-gray-600 hover:text-therapy-600 transition-colors">
                  {t('nav.home')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/search" className="text-gray-600 hover:text-therapy-600 transition-colors">
                  {t('nav.search')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/community" className="text-gray-600 hover:text-therapy-600 transition-colors">
                  {t('nav.community', 'Społeczność')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/search?tab=training" className="text-gray-600 hover:text-therapy-600 transition-colors">
                  {t('nav.trainings')}
                </LocalizedLink>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4 text-therapy-800">{t('footer.legal', 'Informacje prawne')}</h4>
            <ul className="space-y-2">
              <li>
                <LocalizedLink to="/terms" className="text-gray-600 hover:text-therapy-600 transition-colors">
                  {t('footer.terms')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/about" className="text-gray-600 hover:text-therapy-600 transition-colors">
                  {t('footer.about')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/payments-info" className="text-gray-600 hover:text-therapy-600 transition-colors">
                  {t('footer.payments', 'Informacje o płatnościach')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/gdpr" className="text-gray-600 hover:text-therapy-600 transition-colors">
                  {t('footer.gdpr')}
                </LocalizedLink>
              </li>
              <li>
                <LocalizedLink to="/contact" className="text-gray-600 hover:text-therapy-600 transition-colors">
                  {t('footer.contact')}
                </LocalizedLink>
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
