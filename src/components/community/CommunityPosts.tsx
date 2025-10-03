
import { useState, useEffect } from "react";
import PostCard from "./PostCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Post } from "./PostCard";

type PostCategory = "pytania" | "inspiracje" | "szkolenia" | "recenzje" | "dla-specjalistow" | null;

interface CommunityPostsProps {
  category: PostCategory;
  searchQuery?: string;
  languageFilter?: string | null;
}

// Dane testowe dla postów
const dummyPosts: Post[] = [
  {
    id: "1",
    title: "Jakie książki polecacie na temat terapii poznawczo-behawioralnej?",
    content: "Szukam dobrych materiałów dla początkującego terapeuty. Co polecacie?",
    author: {
      id: "user1",
      name: "Anna Kowalska",
      avatar: "/placeholder.svg"
    },
    category: "pytania",
    likes: 12,
    comments: 7,
    createdAt: "2025-05-10T10:00:00Z"
  },
  {
    id: "2",
    title: "Moja nowa aranżacja gabinetu - minimalistyczny styl",
    content: "Chciałabym się podzielić efektami ostatniego remontu mojego gabinetu. Postawiłam na minimalizm i uspokajające kolory.",
    author: {
      id: "user2",
      name: "Michał Nowak",
      avatar: "/placeholder.svg"
    },
    category: "inspiracje",
    likes: 24,
    comments: 9,
    createdAt: "2025-05-09T15:30:00Z"
  },
  {
    id: "3",
    title: "Szkolenie: Wprowadzenie do terapii schematu - 15 czerwca 2025",
    content: "Zapraszam na jednodniowe szkolenie wprowadzające do terapii schematu. Idealne dla psychologów chcących poszerzyć swoje kompetencje.",
    author: {
      id: "user3",
      name: "Karolina Wiśniewska",
      avatar: "/placeholder.svg"
    },
    category: "szkolenia",
    likes: 8,
    comments: 3,
    createdAt: "2025-05-08T09:15:00Z"
  },
  {
    id: "4",
    title: "Recenzja książki: 'Uczucia i Rozum' Marty Kondrackiej",
    content: "Ostatnio przeczytałem najnowszą książkę Marty Kondrackiej o równowadze między emocjami a rozsądkiem w terapii. Oto moje przemyślenia...",
    author: {
      id: "user4",
      name: "Piotr Adamski",
      avatar: "/placeholder.svg"
    },
    category: "recenzje",
    likes: 15,
    comments: 5,
    createdAt: "2025-05-07T14:20:00Z"
  },
  {
    id: "5",
    title: "Trudny przypadek w praktyce - potrzebuję porady",
    content: "Pracuję z klientem, który ma bardzo złożony problem. Zastanawiam się nad zmianą strategii terapeutycznej. Czy ktoś ma doświadczenie z podobnymi przypadkami?",
    author: {
      id: "user5",
      name: "Magdalena Zielińska",
      avatar: "/placeholder.svg"
    },
    category: "dla-specjalistow",
    specialistsOnly: true,
    likes: 18,
    comments: 12,
    createdAt: "2025-05-06T11:45:00Z"
  },
  {
    id: "6",
    title: "Wymiana doświadczeń - superwizja grupowa online",
    content: "Organizuję miesięczne spotkania superwizyjne online. Jeśli jesteś zainteresowany dołączeniem do grupy, napisz!",
    author: {
      id: "user6",
      name: "Tomasz Lewandowski",
      avatar: "/placeholder.svg"
    },
    category: "dla-specjalistow",
    specialistsOnly: true,
    likes: 25,
    comments: 8,
    createdAt: "2025-05-05T16:30:00Z"
  }
];

const CommunityPosts = ({ category, searchQuery = "", languageFilter = null }: CommunityPostsProps) => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Reset loading state when search query or category changes
    setLoading(true);
    
    // Symulacja ładowania danych
    const timer = setTimeout(() => {
      // Filtrowanie postów według kategorii i frazy wyszukiwania
      let filteredPosts = category 
        ? dummyPosts.filter(post => post.category === category)
        : [...dummyPosts];
      
      // Filtrowanie postów według frazy wyszukiwania
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        filteredPosts = filteredPosts.filter(post => 
          post.title.toLowerCase().includes(query) || 
          post.content.toLowerCase().includes(query) ||
          post.author.name.toLowerCase().includes(query)
        );
      }
      
      // Note: Language filtering would be applied here when posts have language property
      // For now, we just show all posts in language sections
      
      setPosts(filteredPosts);
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [category, searchQuery, languageFilter]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border rounded-lg p-6">
            <Skeleton className="h-8 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex justify-between mt-4 pt-4 border-t">
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-500">
          {searchQuery ? "Nie znaleziono postów odpowiadających kryteriom wyszukiwania" : "Nie znaleziono postów w tej kategorii"}
        </p>
        <p className="text-gray-400 mt-2">Bądź pierwszą osobą, która doda post!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default CommunityPosts;
