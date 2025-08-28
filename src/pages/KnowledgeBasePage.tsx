import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { BookOpen, Search, FileText, Calculator, Shield, Users, Clock, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface Article {
  id: string;
  title: string;
  description: string;
  category: string;
  icon: React.ComponentType<any>;
  readTime: string;
  tags: string[];
}

const articles: Article[] = [
  {
    id: "1",
    title: "Jak wystawiać faktury za usługi terapeutyczne",
    description: "Przewodnik po wystawianiu faktur, stosowanych stawkach VAT i obowiązkach księgowych dla terapeutów.",
    category: "Finanse",
    icon: Calculator,
    readTime: "8 min",
    tags: ["faktury", "VAT", "księgowość"]
  },
  {
    id: "2", 
    title: "RODO w praktyce terapeutycznej",
    description: "Jak zabezpieczyć dane pacjentów i spełnić wymogi RODO w gabinecie terapeutycznym.",
    category: "Prawo",
    icon: Shield,
    readTime: "12 min",
    tags: ["RODO", "prywatność", "dane osobowe"]
  },
  {
    id: "3",
    title: "Umowy wynajmu gabinetu - na co zwrócić uwagę",
    description: "Kluczowe punkty przy wynajmowaniu przestrzeni gabinetu i negocjowaniu umów.",
    category: "Biznes",
    icon: FileText,
    readTime: "6 min",
    tags: ["wynajem", "umowy", "gabinet"]
  },
  {
    id: "4",
    title: "Jak budować relacje z pacjentami",
    description: "Praktyczne wskazówki dotyczące komunikacji i budowania zaufania w relacji terapeutycznej.",
    category: "Terapia",
    icon: Users,
    readTime: "10 min",
    tags: ["komunikacja", "pacjenci", "relacje"]
  },
  {
    id: "5",
    title: "Zarządzanie czasem w praktyce prywatnej",
    description: "Strategie efektywnego planowania dnia pracy i optymalnego wykorzystania czasu.",
    category: "Organizacja",
    icon: Clock,
    readTime: "7 min",
    tags: ["czas", "organizacja", "efektywność"]
  },
  {
    id: "6",
    title: "Marketing dla terapeutów - podstawy",
    description: "Jak promować swoją praktykę w sposób etyczny i skuteczny.",
    category: "Marketing",
    icon: TrendingUp,
    readTime: "15 min",
    tags: ["marketing", "promocja", "etyka"]
  }
];

const categories = ["Wszystkie", "Finanse", "Prawo", "Biznes", "Terapia", "Organizacja", "Marketing"];

const KnowledgeBasePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Wszystkie");

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "Wszystkie" || article.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="bg-therapy-100 p-4 rounded-full">
                <BookOpen className="h-8 w-8 text-therapy-700" />
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
              Baza wiedzy
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Praktyczne poradniki i artykuły dla terapeutów i właścicieli gabinetów
            </p>
          </div>
          
          {/* Wyszukiwanie i filtry */}
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Szukaj artykułów..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map(category => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={`cursor-pointer transition-colors ${
                    selectedCategory === category 
                      ? "bg-therapy-600 hover:bg-therapy-700" 
                      : "hover:bg-therapy-50"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          
          {/* Lista artykułów */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredArticles.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-gray-900">Brak wyników</h3>
                <p className="text-gray-600">
                  Nie znaleziono artykułów pasujących do wyszukiwanego hasła.
                </p>
              </div>
            ) : (
              filteredArticles.map(article => {
                const IconComponent = article.icon;
                return (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <div className="bg-therapy-100 p-2 rounded-lg">
                          <IconComponent className="h-5 w-5 text-therapy-700" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg mb-2">{article.title}</CardTitle>
                          <CardDescription>{article.description}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="text-xs">
                          {article.category}
                        </Badge>
                        <span className="text-sm text-gray-500">{article.readTime}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {article.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      
                      <Button variant="outline" className="w-full">
                        Czytaj więcej
                      </Button>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
          
          {/* CTA */}
          <div className="bg-therapy-50 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4">Potrzebujesz pomocy?</h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Nie znalazłeś odpowiedzi na swoje pytanie? Skontaktuj się z nami, 
              a nasz zespół ekspertów pomoże Ci rozwiązać problem.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-therapy-600 hover:bg-therapy-700">
                <Link to="/contact">Skontaktuj się z nami</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/community">Zadaj pytanie na forum</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default KnowledgeBasePage;