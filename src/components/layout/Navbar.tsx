
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Calendar, User, Search, LogOut, LayoutDashboard, Menu, UserCheck, MessageCircle, GraduationCap, Building2, Users, Info, Gift, X } from "lucide-react";
import { useAuth, signOut } from "@/components/auth/AuthProvider";
import { useState } from "react";
import GlobalSearch from "@/components/common/GlobalSearch";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <Calendar className="h-6 w-6 text-primary" />
            <span className="font-semibold text-lg">GabinetShare</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/search">
                    <NavigationMenuLink className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50")}>
                      <Search className="h-4 w-4 mr-2" />
                      {t('nav.search')}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Building2 className="h-4 w-4 mr-2" />
                    Dla specjalistów
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li>
                        <Link to="/rental" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Wynajem gabinetu</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Wynajmij swój gabinet innym specjalistom
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/calendar" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            Kalendarz
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Zarządzaj dostępnością i rezerwacjami
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/management" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none flex items-center gap-2">
                            <LayoutDashboard className="h-4 w-4" />
                            Zarządzanie
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Panel zarządzania Twoją działalnością
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/supervisions" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none flex items-center gap-2">
                            <UserCheck className="h-4 w-4" />
                            {t('nav.supervisions')}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Oferuj i rezerwuj superwizje
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/patients" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none flex items-center gap-2">
                            <User className="h-4 w-4" />
                            Pacjenci
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Akta pacjentów i asystent AI
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Users className="h-4 w-4 mr-2" />
                    Społeczność
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li>
                        <Link to="/community" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">Forum społeczności</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Dyskutuj z innymi specjalistami
                          </p>
                        </Link>
                      </li>
                      <li>
                        <Link to="/trainings" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" />
                            {t('nav.trainings')}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            Szkolenia i rozwój zawodowy
                          </p>
                        </Link>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <Link to="/messages">
                    <NavigationMenuLink className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50")}>
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Wiadomości
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile menu button */}
          <Button 
            variant="ghost" 
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Right side actions */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <LanguageSwitcher />
            
            {!user ? (
              <>
                <Button variant="ghost" asChild>
                  <Link to="/login">{t('nav.login')}</Link>
                </Button>
                <Button asChild>
                  <Link to="/register">{t('nav.register')}</Link>
                </Button>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-popover">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/appointments" className="cursor-pointer">
                      <Calendar className="h-4 w-4 mr-2" />
                      Wizyty
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/affiliate" className="cursor-pointer">
                      <Gift className="h-4 w-4 mr-2" />
                      Program partnerski
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/how-it-works" className="cursor-pointer">
                      <Info className="h-4 w-4 mr-2" />
                      Jak to działa
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="text-destructive cursor-pointer">
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('nav.logout')}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs border-l bg-background shadow-lg animate-in slide-in-from-right">
            <div className="flex flex-col h-full">
              {/* Mobile menu header */}
              <div className="flex items-center justify-between p-4 border-b">
                <span className="font-semibold">Menu</span>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* Mobile menu content */}
              <div className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  <Link 
                    to="/search" 
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Search className="h-5 w-5" />
                    {t('nav.search')}
                  </Link>

                  <div className="pt-4">
                    <div className="px-3 py-2 text-xs font-semibold text-muted-foreground">Dla specjalistów</div>
                    <Link to="/rental" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
                      <Building2 className="h-5 w-5" />
                      Wynajem gabinetu
                    </Link>
                    <Link to="/calendar" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
                      <Calendar className="h-5 w-5" />
                      Kalendarz
                    </Link>
                    <Link to="/management" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
                      <LayoutDashboard className="h-5 w-5" />
                      Zarządzanie
                    </Link>
                    <Link to="/supervisions" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
                      <UserCheck className="h-5 w-5" />
                      {t('nav.supervisions')}
                    </Link>
                    <Link to="/patients" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
                      <User className="h-5 w-5" />
                      Pacjenci
                    </Link>
                  </div>

                  <div className="pt-4">
                    <div className="px-3 py-2 text-xs font-semibold text-muted-foreground">Społeczność</div>
                    <Link to="/community" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
                      <Users className="h-5 w-5" />
                      Forum
                    </Link>
                    <Link to="/trainings" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
                      <GraduationCap className="h-5 w-5" />
                      {t('nav.trainings')}
                    </Link>
                  </div>

                  <Link 
                    to="/messages" 
                    className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent mt-4"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <MessageCircle className="h-5 w-5" />
                    Wiadomości
                  </Link>
                </div>
              </div>

              {/* Mobile menu footer */}
              <div className="border-t p-4 space-y-2">
                <LanguageSwitcher />
                {!user ? (
                  <>
                    <Button variant="outline" className="w-full" asChild>
                      <Link to="/login" onClick={() => setMobileMenuOpen(false)}>{t('nav.login')}</Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link to="/register" onClick={() => setMobileMenuOpen(false)}>{t('nav.register')}</Link>
                    </Button>
                  </>
                ) : (
                  <div className="space-y-1">
                    <Link to="/profile" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
                      <User className="h-5 w-5" />
                      Profil
                    </Link>
                    <Link to="/appointments" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
                      <Calendar className="h-5 w-5" />
                      Wizyty
                    </Link>
                    <Link to="/affiliate" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
                      <Gift className="h-5 w-5" />
                      Program partnerski
                    </Link>
                    <Link to="/how-it-works" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
                      <Info className="h-5 w-5" />
                      Jak to działa
                    </Link>
                    <button 
                      className="flex items-center gap-3 rounded-md px-3 py-2 text-sm hover:bg-accent w-full text-left text-destructive" 
                      onClick={() => { signOut(); setMobileMenuOpen(false); }}
                    >
                      <LogOut className="h-5 w-5" />
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
