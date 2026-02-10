import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { SUPPORTED_LANGS, PRIMARY_LANGS } from '@/hooks/useLanguagePrefix';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { lang } = useParams<{ lang: string }>();

  const allLanguages = [
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'ru', name: 'Русский', flag: '🇷🇺' },
    { code: 'el', name: 'Ελληνικά', flag: '🇬🇷' },
    { code: 'cs', name: 'Čeština', flag: '🇨🇿' },
    { code: 'pt', name: 'Português', flag: '🇵🇹' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
    { code: 'sv', name: 'Svenska', flag: '🇸🇪' },
    { code: 'ja', name: '日本語', flag: '🇯🇵' },
    { code: 'ko', name: '한국어', flag: '🇰🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦' },
  ];

  const primaryLanguages = allLanguages.filter(l => PRIMARY_LANGS.includes(l.code));
  const otherLanguages = allLanguages.filter(l => !PRIMARY_LANGS.includes(l.code));

  const switchLanguage = (newLang: string) => {
    // Replace current lang prefix in URL path
    const currentPath = location.pathname;
    const pathWithoutLang = lang 
      ? currentPath.replace(`/${lang}`, '') || '/'
      : currentPath;
    
    i18n.changeLanguage(newLang);
    navigate(`/${newLang}${pathWithoutLang === '/' ? '' : pathWithoutLang}${location.search}${location.hash}`);
  };

  const currentLang = allLanguages.find(l => l.code === (lang || i18n.language)) || allLanguages[0];

  return (
    <div className="flex items-center gap-1">
      {/* Primary language quick toggle: PL | IT */}
      {primaryLanguages.map((language, index) => (
        <span key={language.code} className="flex items-center">
          {index > 0 && <span className="text-muted-foreground mx-1">|</span>}
          <Button
            variant="ghost"
            size="sm"
            className={`px-2 py-1 text-sm font-medium ${
              currentLang.code === language.code 
                ? 'text-primary font-bold underline underline-offset-4' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => switchLanguage(language.code)}
          >
            {language.flag} {language.code.toUpperCase()}
          </Button>
        </span>
      ))}

      {/* Other languages in dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="px-2 text-muted-foreground">
            ▾
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {otherLanguages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              onClick={() => switchLanguage(language.code)}
              className="cursor-pointer"
            >
              <span className="mr-2">{language.flag}</span>
              {language.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LanguageSwitcher;
