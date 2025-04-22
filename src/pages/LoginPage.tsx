
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
    // Tu będzie logika logowania
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-therapy-100 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-therapy-600" />
              </div>
            </div>
            <CardTitle className="text-2xl">Logowanie do GabinetShare</CardTitle>
            <CardDescription>
              Wprowadź swoje dane logowania, aby kontynuować
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Adres email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="twoj@email.pl"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Hasło</Label>
                  <Link to="/forgot-password" className="text-sm text-therapy-600 hover:underline">
                    Zapomniałeś hasła?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <Button className="w-full bg-therapy-600 hover:bg-therapy-700" type="submit">
                Zaloguj się
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm">
              Nie masz jeszcze konta?{" "}
              <Link to="/register" className="text-therapy-600 hover:underline font-medium">
                Zarejestruj się
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default LoginPage;
