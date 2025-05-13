
import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Copy, Link as LinkIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface AffiliateLinkCardProps {
  affiliateLink: string;
}

const AffiliateLinkCard: React.FC<AffiliateLinkCardProps> = ({ affiliateLink }) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopied(true);
    toast({
      title: "Skopiowano!",
      description: "Link afiliacyjny został skopiowany do schowka.",
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Twój link afiliacyjny</CardTitle>
        <CardDescription>
          Udostępnij ten link, aby otrzymywać 10% prowizji od każdego zakupu.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex">
          <Input
            value={affiliateLink}
            readOnly
            className="rounded-r-none"
          />
          <Button 
            onClick={handleCopy} 
            className="rounded-l-none bg-therapy-600 hover:bg-therapy-700"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <LinkIcon className="mr-2 h-4 w-4" />
                Materiały promocyjne
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Materiały promocyjne</DialogTitle>
                <DialogDescription>
                  Wykorzystaj te materiały, aby skuteczniej promować GabinetShare.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <Tabs defaultValue="banners">
                  <TabsList className="grid grid-cols-2">
                    <TabsTrigger value="banners">Bannery</TabsTrigger>
                    <TabsTrigger value="text">Teksty</TabsTrigger>
                  </TabsList>
                  <TabsContent value="banners" className="space-y-4">
                    <p className="text-sm text-gray-500">Bannery będą dostępne wkrótce.</p>
                  </TabsContent>
                  <TabsContent value="text" className="space-y-4">
                    <div className="border rounded-md p-3">
                      <p className="text-sm font-medium mb-1">Krótki tekst:</p>
                      <p className="text-sm text-gray-600">
                        "Szukasz gabinetu do wynajęcia lub chcesz efektywnie zarządzać rezerwacjami? Sprawdź GabinetShare!"
                      </p>
                    </div>
                    <div className="border rounded-md p-3">
                      <p className="text-sm font-medium mb-1">Dłuższy tekst:</p>
                      <p className="text-sm text-gray-600">
                        "GabinetShare to platforma, która rewolucjonizuje sposób wynajmu gabinetów i zarządzania kalendarzem wizyt. Zarówno terapeuci, jak i właściciele gabinetów znajdą tu narzędzia dopasowane do swoich potrzeb. Sprawdź już teraz!"
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </DialogContent>
          </Dialog>
          
          <Button variant="outline" className="w-full" asChild>
            <a href={`mailto:?subject=Poznaj GabinetShare&body=Cześć! Znalazłem/am świetną platformę do wynajmu gabinetów i zarządzania kalendarzem wizyt. Sprawdź: ${affiliateLink}`}>
              Udostępnij przez email
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AffiliateLinkCard;
