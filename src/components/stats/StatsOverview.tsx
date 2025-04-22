
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar, Clock, User, Users } from "lucide-react";

const StatsOverview = () => {
  // Przykładowe dane statystyczne
  const stats = [
    {
      title: "Łączna liczba wizyt",
      value: "245",
      description: "W tym miesiącu",
      icon: Calendar,
      color: "text-therapy-600",
    },
    {
      title: "Godziny wynajmu",
      value: "86",
      description: "W tym miesiącu",
      icon: Clock,
      color: "text-blue-600",
    },
    {
      title: "Liczba klientów",
      value: "52",
      description: "Aktywnych",
      icon: User,
      color: "text-green-600",
    },
    {
      title: "Współpracujący terapeuci",
      value: "8",
      description: "Wynajmujący gabinet",
      icon: Users,
      color: "text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <CardDescription>{stat.description}</CardDescription>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsOverview;
