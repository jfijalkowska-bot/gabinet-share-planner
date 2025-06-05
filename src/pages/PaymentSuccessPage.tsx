
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-2xl text-green-700">Płatność zakończona pomyślnie!</CardTitle>
          </CardHeader>
          
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Twoja płatność została przetworzona pomyślnie. Otrzymasz wkrótce potwierdzenie na email.
            </p>
            
            {sessionId && (
              <p className="text-sm text-gray-500">
                ID sesji: {sessionId}
              </p>
            )}

            <div className="space-y-2 pt-4">
              <Button asChild className="w-full bg-therapy-600 hover:bg-therapy-700">
                <Link to="/appointments">
                  <Calendar className="h-4 w-4 mr-2" />
                  Zobacz moje wizyty
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full">
                <Link to="/">
                  Wróć do strony głównej
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentSuccessPage;
