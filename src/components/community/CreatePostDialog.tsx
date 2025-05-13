
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreatePostDialog = ({ open, onOpenChange }: CreatePostDialogProps) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    if (!title.trim()) {
      toast({
        title: "Brak tytułu",
        description: "Proszę dodać tytuł posta",
        variant: "destructive",
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Brak treści",
        description: "Proszę dodać treść posta",
        variant: "destructive",
      });
      return;
    }

    if (!category) {
      toast({
        title: "Brak kategorii",
        description: "Proszę wybrać kategorię posta",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Tutaj w przyszłości będzie integracja z bazą danych
    setTimeout(() => {
      // Symulacja sukcesu
      toast({
        title: "Post dodany",
        description: "Twój post został pomyślnie opublikowany",
      });
      
      // Reset formularza
      setTitle("");
      setContent("");
      setCategory("");
      setIsSubmitting(false);
      onOpenChange(false);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Dodaj nowy post</DialogTitle>
        </DialogHeader>
        
        <div className="grid gap-5 py-4">
          <div className="grid gap-2">
            <Label htmlFor="category">Kategoria</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category">
                <SelectValue placeholder="Wybierz kategorię" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pytania">Pytanie</SelectItem>
                <SelectItem value="inspiracje">Inspiracja</SelectItem>
                <SelectItem value="szkolenia">Szkolenie</SelectItem>
                <SelectItem value="recenzje">Recenzja</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="title">Tytuł</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Wpisz tytuł..."
              className="w-full"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="content">Treść</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Opisz szczegóły..."
              rows={6}
              className="resize-none w-full"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            Anuluj
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="bg-therapy-600 hover:bg-therapy-700"
          >
            {isSubmitting ? "Publikowanie..." : "Opublikuj post"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePostDialog;
