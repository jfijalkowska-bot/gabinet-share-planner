
import { formatDistanceToNow } from "date-fns";
import { pl } from "date-fns/locale";
import { Heart, MessageCircle, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export type Post = {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  category: "pytania" | "inspiracje" | "szkolenia" | "recenzje";
  likes: number;
  comments: number;
  createdAt: string;
};

interface PostCardProps {
  post: Post;
}

const categoryColors = {
  pytania: "bg-blue-100 text-blue-800",
  inspiracje: "bg-green-100 text-green-800",
  szkolenia: "bg-amber-100 text-amber-800",
  recenzje: "bg-purple-100 text-purple-800"
};

const categoryLabels = {
  pytania: "Pytanie",
  inspiracje: "Inspiracja",
  szkolenia: "Szkolenie",
  recenzje: "Recenzja"
};

const PostCard = ({ post }: PostCardProps) => {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);
  
  const timeAgo = formatDistanceToNow(new Date(post.createdAt), { 
    addSuffix: true,
    locale: pl 
  });

  const handleLike = () => {
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else {
      setLikeCount(prev => prev + 1);
    }
    setLiked(!liked);
  };
  
  return (
    <div className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{post.author.name}</p>
            <p className="text-sm text-gray-500">{timeAgo}</p>
          </div>
        </div>
        <Badge className={categoryColors[post.category]}>
          {categoryLabels[post.category]}
        </Badge>
      </div>
      
      <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
      <p className="text-gray-700 mb-4">{post.content}</p>
      
      <div className="flex items-center justify-between pt-4 border-t">
        <div className="flex gap-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className={`flex items-center gap-1 ${liked ? 'text-red-600' : ''}`}
            onClick={handleLike}
          >
            <Heart className={`h-5 w-5 ${liked ? 'fill-red-600 text-red-600' : ''}`} />
            <span>{likeCount}</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="flex items-center gap-1">
            <MessageCircle className="h-5 w-5" />
            <span>{post.comments}</span>
          </Button>
        </div>
        
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <Share className="h-5 w-5" />
          <span>Udostępnij</span>
        </Button>
      </div>
    </div>
  );
};

export default PostCard;
