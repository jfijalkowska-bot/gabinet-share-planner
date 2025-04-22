
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Wylogowano",
        description: "Pomyślnie wylogowano z systemu"
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Błąd",
        description: "Nie udało się wylogować",
        variant: "destructive"
      });
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
      <LogOut size={16} />
      <span>Wyloguj</span>
    </Button>
  );
};

export default LogoutButton;
