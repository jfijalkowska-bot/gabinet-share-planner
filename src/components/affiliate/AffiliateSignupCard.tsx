
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const AffiliateSignupCard: React.FC = () => {
  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Program Partnerski</CardTitle>
        <CardDescription>
          Zaloguj się lub zarejestruj, aby wygenerować swój unikalny link afiliacyjny.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p>
          Zarabiaj 7% prowizji od każdej płatności poleconego użytkownika - dożywotnio!
          To proste: polecaj i zarabiaj!
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button className="bg-therapy-600 hover:bg-therapy-700" asChild>
            <a href="/login">Zaloguj się</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/register">Zarejestruj się</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AffiliateSignupCard;
