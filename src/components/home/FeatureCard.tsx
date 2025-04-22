
import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <Card className="border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="bg-therapy-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
          <Icon className="h-6 w-6 text-therapy-600" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
