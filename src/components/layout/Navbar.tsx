

import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Calendar, User, Search, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth, signOut } from "@/components/auth/AuthProvider";

const Navbar = () => {
  const { user } = useAuth();
  const location = useLocation();

  return (
    <nav className="border-b shadow-sm py-3 px-4 bg-white">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6 text-therapy-600" />
          <Link to="/" className="font-semibold text-lg text-therapy-800">
            GabinetShare
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/search" className="text-gray-700 hover:text-therapy-600 transition-colors">
            Wyszukaj specjalistę
          </Link>
          <Link to="/community" className="text-gray-700 hover:text-therapy-600 transition-colors">
            Społeczność
          </Link>
          <Link to="/affiliate" className="text-gray-700 hover:text-therapy-600 transition-colors">
            Program partnerski
          </Link>
          {user && (
            <>
              <Link to="/calendar" className="text-gray-700 hover:text-therapy-600 transition-colors">
                Kalendarz
              </Link>
              <Link to="/rent" className="text-gray-700 hover:text-therapy-600 transition-colors">
                Wynajem
              </Link>
              <Link to="/appointments" className="text-gray-700 hover:text-therapy-600 transition-colors">
                Wizyty
              </Link>
              <Link to="/management" className="text-gray-700 hover:text-therapy-600 transition-colors">
                Zarządzanie
              </Link>
            </>
          )}
          <Link to="/how-it-works" className="text-gray-700 hover:text-therapy-600 transition-colors">
            Jak to działa
          </Link>
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
