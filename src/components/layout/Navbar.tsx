
import LocalizedLink from "@/components/common/LocalizedLink";
import { useLocation } from "react-router-dom";
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
import { Calendar, User, Search, LogOut, LayoutDashboard, Menu, UserCheck, MessageCircle, GraduationCap, Building2, Users, Info, Gift, X, CreditCard } from "lucide-react";
import { useAuth, signOut } from "@/components/auth/AuthProvider";
import { useState } from "react";
import GlobalSearch from "@/components/common/GlobalSearch";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

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
          <LocalizedLink to="/" className="flex items-center gap-2 shrink-0">
            <img src={logo} alt="GabinetShare" className="h-8 w-8" />
            <span className="font-semibold text-lg">GabinetShare</span>
          </LocalizedLink>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50")}>
                    <LocalizedLink to="/search">
                      <Search className="h-4 w-4 mr-2" />
                      {t('nav.search')}
                    </LocalizedLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Building2 className="h-4 w-4 mr-2" />
                    {t('nav.forSpecialists', 'Dla specjalistów')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li>
                        <LocalizedLink to="/rental" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">{t('nav.rental', 'Wynajem gabinetu')}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {t('nav.rentalDesc', 'Wynajmij swój gabinet innym specjalistom')}
                          </p>
                        </LocalizedLink>
                      </li>
                      <li>
                        <LocalizedLink to="/calendar" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {t('nav.calendar', 'Kalendarz')}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {t('nav.calendarDesc', 'Zarządzaj dostępnością i rezerwacjami')}
                          </p>
                        </LocalizedLink>
                      </li>
                      <li>
                        <LocalizedLink to="/management" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none flex items-center gap-2">
                            <LayoutDashboard className="h-4 w-4" />
                            {t('nav.management', 'Moje oferty')}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {t('nav.managementDesc', 'Wystaw gabinet, superwizję, szkolenie lub praktyki')}
                          </p>
                        </LocalizedLink>
                      </li>
                      <li>
                        <LocalizedLink to="/search?tab=supervision" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none flex items-center gap-2">
                            <UserCheck className="h-4 w-4" />
                            {t('nav.supervisions')}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {t('nav.supervisionsDesc', 'Znajdź lub oferuj superwizje')}
                          </p>
                        </LocalizedLink>
                      </li>
                      <li>
                        <LocalizedLink to="/patients" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none flex items-center gap-2">
                            <User className="h-4 w-4" />
                            {t('nav.patients', 'Pacjenci')}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {t('nav.patientsDesc', 'Akta pacjentów i asystent AI')}
                          </p>
                        </LocalizedLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>
                    <Users className="h-4 w-4 mr-2" />
                    {t('nav.community', 'Społeczność')}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      <li>
                        <LocalizedLink to="/community" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">{t('nav.forum', 'Forum społeczności')}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {t('nav.forumDesc', 'Dyskutuj z innymi specjalistami')}
                          </p>
                        </LocalizedLink>
                      </li>
                      <li>
                        <LocalizedLink to="/search?tab=training" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" />
                            {t('nav.trainings')}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {t('nav.trainingsDesc', 'Szkolenia i rozwój zawodowy')}
                          </p>
                        </LocalizedLink>
                      </li>
                      <li>
                        <LocalizedLink to="/search?tab=practicum" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none">{t('nav.practicums', 'Praktyki i staże')}</div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {t('nav.practicumsDesc', 'Znajdź praktyki dla początkujących terapeutów')}
                          </p>
                        </LocalizedLink>
                      </li>
                      <li>
                        <LocalizedLink to="/affiliate" className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground">
                          <div className="text-sm font-medium leading-none flex items-center gap-2">
                            <Gift className="h-4 w-4" />
                            {t('nav.affiliate', 'Program partnerski')}
                          </div>
                          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {t('nav.affiliateDesc', 'Zarabiaj 7% polecając platformę')}
                          </p>
                        </LocalizedLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50")}>
                    <LocalizedLink to="/messages">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      {t('nav.messages', 'Wiadomości')}
                    </LocalizedLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuLink asChild className={cn("group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50")}>
                    <LocalizedLink to="/pricing">
                      <CreditCard className="h-4 w-4 mr-2" />
                      {t('nav.pricing', 'Cennik')}
                    </LocalizedLink>
                  </NavigationMenuLink>
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
                  <LocalizedLink to="/login">{t('nav.login')}</LocalizedLink>
                </Button>
                <Button asChild>
                  <LocalizedLink to="/register">{t('nav.register')}</LocalizedLink>
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
                    <LocalizedLink to="/management?tab=profile" className="cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      {t('nav.profile', 'Profil')}
                    </LocalizedLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <LocalizedLink to="/appointments" className="cursor-pointer">
                      <Calendar className="h-4 w-4 mr-2" />
                      {t('nav.appointments', 'Wizyty')}
                    </LocalizedLink>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <LocalizedLink to="/affiliate" className="cursor-pointer">
                      <Gift className="h-4 w-4 mr-2" />
                      {t('nav.affiliate', 'Program partnerski')}
                    </LocalizedLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <LocalizedLink to="/how-it-works" className="cursor-pointer">
                      <Info className="h-4 w-4 mr-2" />
                      {t('nav.howItWorks', 'Jak to działa')}
                    </LocalizedLink>
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
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background shadow-2xl animate-in slide-in-from-right z-[101]">
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b shrink-0">
                <span className="font-semibold text-lg">Menu</span>
                <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                  <X className="h-5 w-5" />
                </Button>
              </div>

              <nav className="flex-1 overflow-y-auto overscroll-contain py-4 px-2">
                <div className="space-y-1">
                  <LocalizedLink to="/search" className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                    <Search className="h-5 w-5" />
                    {t('nav.search')}
                  </LocalizedLink>

                  <div className="pt-4 border-t mt-2">
                    <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t('nav.forSpecialists', 'Dla specjalistów')}</div>
                    <LocalizedLink to="/rental" className="flex items-center gap-3 rounded-lg px-3 py-3 text-base hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      <Building2 className="h-5 w-5" />
                      {t('nav.rental', 'Wynajem gabinetu')}
                    </LocalizedLink>
                    <LocalizedLink to="/calendar" className="flex items-center gap-3 rounded-lg px-3 py-3 text-base hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      <Calendar className="h-5 w-5" />
                      {t('nav.calendar', 'Kalendarz')}
                    </LocalizedLink>
                    <LocalizedLink to="/management" className="flex items-center gap-3 rounded-lg px-3 py-3 text-base hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      <LayoutDashboard className="h-5 w-5" />
                      {t('nav.management', 'Moje oferty')}
                    </LocalizedLink>
                    <LocalizedLink to="/search?tab=supervision" className="flex items-center gap-3 rounded-lg px-3 py-3 text-base hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      <UserCheck className="h-5 w-5" />
                      {t('nav.supervisions')}
                    </LocalizedLink>
                    <LocalizedLink to="/patients" className="flex items-center gap-3 rounded-lg px-3 py-3 text-base hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      <User className="h-5 w-5" />
                      {t('nav.patients', 'Pacjenci')}
                    </LocalizedLink>
                  </div>

                  <div className="pt-4 border-t mt-2">
                    <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">{t('nav.community', 'Społeczność')}</div>
                    <LocalizedLink to="/community" className="flex items-center gap-3 rounded-lg px-3 py-3 text-base hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      <Users className="h-5 w-5" />
                      {t('nav.forum', 'Forum')}
                    </LocalizedLink>
                    <LocalizedLink to="/search?tab=training" className="flex items-center gap-3 rounded-lg px-3 py-3 text-base hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      <GraduationCap className="h-5 w-5" />
                      {t('nav.trainings')}
                    </LocalizedLink>
                    <LocalizedLink to="/search?tab=practicum" className="flex items-center gap-3 rounded-lg px-3 py-3 text-base hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      <UserCheck className="h-5 w-5" />
                      {t('nav.practicums', 'Praktyki i staże')}
                    </LocalizedLink>
                    <LocalizedLink to="/affiliate" className="flex items-center gap-3 rounded-lg px-3 py-3 text-base hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      <Gift className="h-5 w-5" />
                      {t('nav.affiliate', 'Program partnerski')}
                    </LocalizedLink>
                  </div>

                  <div className="pt-4 border-t mt-2">
                    <LocalizedLink to="/messages" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
                      <MessageCircle className="h-5 w-5" />
                      {t('nav.messages', 'Wiadomości')}
                    </LocalizedLink>
                    <LocalizedLink to="/pricing" className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent" onClick={() => setMobileMenuOpen(false)}>
                      <CreditCard className="h-5 w-5" />
                      {t('nav.pricing', 'Cennik')}
                    </LocalizedLink>
                  </div>
                </div>
              </nav>

              <div className="border-t p-4 space-y-2 shrink-0">
                <LanguageSwitcher />
                {!user ? (
                  <>
                    <Button variant="outline" className="w-full" asChild>
                      <LocalizedLink to="/login" onClick={() => setMobileMenuOpen(false)}>{t('nav.login')}</LocalizedLink>
                    </Button>
                    <Button className="w-full" asChild>
                      <LocalizedLink to="/register" onClick={() => setMobileMenuOpen(false)}>{t('nav.register')}</LocalizedLink>
                    </Button>
                  </>
                ) : (
                  <div className="space-y-1">
                    <LocalizedLink to="/management?tab=profile" className="flex items-center gap-3 rounded-lg px-3 py-3 text-base hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      <User className="h-5 w-5" />
                      {t('nav.profile', 'Profil')}
                    </LocalizedLink>
                    <LocalizedLink to="/appointments" className="flex items-center gap-3 rounded-lg px-3 py-3 text-base hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      <Calendar className="h-5 w-5" />
                      {t('nav.appointments', 'Wizyty')}
                    </LocalizedLink>
                    <LocalizedLink to="/affiliate" className="flex items-center gap-3 rounded-lg px-3 py-3 text-base hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      <Gift className="h-5 w-5" />
                      {t('nav.affiliate', 'Program partnerski')}
                    </LocalizedLink>
                    <LocalizedLink to="/how-it-works" className="flex items-center gap-3 rounded-lg px-3 py-3 text-base hover:bg-accent transition-colors" onClick={() => setMobileMenuOpen(false)}>
                      <Info className="h-5 w-5" />
                      {t('nav.howItWorks', 'Jak to działa')}
                    </LocalizedLink>
                    <button 
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-base hover:bg-accent transition-colors w-full text-left text-destructive" 
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
