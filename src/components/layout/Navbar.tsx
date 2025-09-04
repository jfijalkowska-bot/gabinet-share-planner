
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, User, Search, LogOut, LayoutDashboard, Menu, UserCheck, MessageCircle, GraduationCap } from "lucide-react";
import { useAuth, signOut } from "@/components/auth/AuthProvider";
import { useState } from "react";
import GlobalSearch from "@/components/common/GlobalSearch";

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b shadow-sm py-3 px-4 bg-white">
      <div className="container mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6 text-therapy-600" />
          <Link to="/" className="font-semibold text-lg text-therapy-800">
            GabinetShare
          </Link>
        </div>
        
        {/* Global search - visible on desktop */}
        <div className="hidden md:flex flex-1 justify-center max-w-md">
          <GlobalSearch />
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
        
        {/* Desktop navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/search" className="text-gray-700 hover:text-therapy-600 transition-colors flex items-center gap-1">
            <Search className="h-4 w-4" /> 
            Przeglądaj oferty
          </Link>
          
          <Link to="/supervisions" className="text-gray-700 hover:text-therapy-600 transition-colors flex items-center gap-1">
            <UserCheck className="h-4 w-4" /> 
            Superwizje
          </Link>
          
          <Link to="/calendar" className="text-gray-700 hover:text-therapy-600 transition-colors flex items-center gap-1">
            <Calendar className="h-4 w-4" /> 
            Kalendarz
          </Link>
          
          <Link to="/rental" className="text-gray-700 hover:text-therapy-600 transition-colors">
            Wynajem
          </Link>
          
          <Link to="/appointments" className="text-gray-700 hover:text-therapy-600 transition-colors">
            Wizyty
          </Link>
          
          <Link to="/management" className="text-gray-700 hover:text-therapy-600 transition-colors flex items-center gap-1">
            <LayoutDashboard className="h-4 w-4" /> 
            Zarządzanie
          </Link>
          
          <Link to="/community" className="text-gray-700 hover:text-therapy-600 transition-colors">
            Społeczność
          </Link>
          
          <Link to="/messages" className="text-gray-700 hover:text-therapy-600 transition-colors flex items-center gap-1">
            <MessageCircle className="h-4 w-4" /> 
            Wiadomości
          </Link>
          
          <Link to="/trainings" className="text-gray-700 hover:text-therapy-600 transition-colors flex items-center gap-1">
            <GraduationCap className="h-4 w-4" /> 
            Szkolenia
          </Link>
          
          <Link to="/affiliate" className="text-gray-700 hover:text-therapy-600 transition-colors">
            Program partnerski
          </Link>
          
          <Link to="/how-it-works" className="text-gray-700 hover:text-therapy-600 transition-colors">
            Jak to działa
          </Link>
        </div>
        
        {/* Mobile menu */}
        <div className={`fixed inset-0 bg-white z-50 md:hidden transition-transform transform ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <Calendar className="h-6 w-6 text-therapy-600" />
                <span className="font-semibold text-lg text-therapy-800">GabinetShare</span>
              </div>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-2"
              >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="flex flex-col p-4 space-y-4 overflow-auto">
              {/* Mobile search */}
              <div className="pb-4 border-b">
                <GlobalSearch />
              </div>
              
              <Link to="/search" className="py-2 px-4 hover:bg-gray-100 rounded-md flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Search className="h-5 w-5" /> Przeglądaj oferty
              </Link>
              
              <Link to="/supervisions" className="py-2 px-4 hover:bg-gray-100 rounded-md flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <UserCheck className="h-5 w-5" /> Superwizje
              </Link>
              
              <Link to="/calendar" className="py-2 px-4 hover:bg-gray-100 rounded-md flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <Calendar className="h-5 w-5" /> Kalendarz
              </Link>
              
              <Link to="/rental" className="py-2 px-4 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                Wynajem
              </Link>
              
              <Link to="/appointments" className="py-2 px-4 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                Wizyty
              </Link>
              
              <Link to="/management" className="py-2 px-4 hover:bg-gray-100 rounded-md flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <LayoutDashboard className="h-5 w-5" /> Zarządzanie
              </Link>
              
              <Link to="/community" className="py-2 px-4 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                Społeczność
              </Link>
              
              <Link to="/messages" className="py-2 px-4 hover:bg-gray-100 rounded-md flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <MessageCircle className="h-5 w-5" /> Wiadomości
              </Link>
              
              <Link to="/trainings" className="py-2 px-4 hover:bg-gray-100 rounded-md flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <GraduationCap className="h-5 w-5" /> Szkolenia
              </Link>
              
              <Link to="/affiliate" className="py-2 px-4 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                Program partnerski
              </Link>
              
              <Link to="/how-it-works" className="py-2 px-4 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                Jak to działa
              </Link>
              
              {!user ? (
                <div className="pt-4 border-t flex flex-col gap-2">
                  <Link to="/login" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="outline" className="w-full">Logowanie</Button>
                  </Link>
                  <Link to="/register" className="w-full" onClick={() => setMobileMenuOpen(false)}>
                    <Button className="w-full bg-therapy-600 hover:bg-therapy-700">Rejestracja</Button>
                  </Link>
                </div>
              ) : (
                <div className="pt-4 border-t">
                  <Link to="/profile" className="py-2 px-4 hover:bg-gray-100 rounded-md flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                    <User className="h-5 w-5" /> Profil
                  </Link>
                  <Link to="/settings" className="py-2 px-4 hover:bg-gray-100 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                    Ustawienia
                  </Link>
                  <button 
                    className="py-2 px-4 hover:bg-gray-100 rounded-md w-full text-left text-red-600 flex items-center gap-2" 
                    onClick={() => { signOut(); setMobileMenuOpen(false); }}
                  >
                    <LogOut className="h-5 w-5" /> Wyloguj
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {!user ? (
            <>
              <Button variant="outline" asChild>
                <Link to="/login">Logowanie</Link>
              </Button>
              <Button className="bg-therapy-600 hover:bg-therapy-700" asChild>
                <Link to="/register">Rejestracja</Link>
              </Button>
            </>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/profile">Profil</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings">Ustawienia</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={signOut} className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" /> Wyloguj
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
