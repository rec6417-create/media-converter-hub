import { LucideIcon } from "lucide-react";
import { Card } from "./ui/card";

interface ConversionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  formats: string[];
  color: "primary" | "secondary" | "accent";
  onClick: () => void;
}

const colorClasses = {
  primary: "from-primary/20 to-primary/5 border-primary/20 hover:border-primary/40",
  secondary: "from-secondary/20 to-secondary/5 border-secondary/20 hover:border-secondary/40",
  accent: "from-accent/20 to-accent/5 border-accent/20 hover:border-accent/40",
};

const iconColorClasses = {
  primary: "text-primary bg-primary/10",
  secondary: "text-secondary bg-secondary/10",
  accent: "text-accent bg-accent/10",
};

const ConversionCard = ({ icon: Icon, title, description, formats, color, onClick }: ConversionCardProps) => {
  return (
    <Card
      variant="interactive"
      className={`p-6 bg-gradient-to-br ${colorClasses[color]} group cursor-pointer`}
      onClick={onClick}
    >
      <div className={`w-14 h-14 rounded-xl ${iconColorClasses[color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
        <Icon className="w-7 h-7" />
      </div>
      
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-4">{description}</p>
      
      <div className="flex flex-wrap gap-2">
        {formats.map((format) => (
          <span
            key={format}
            className="px-2 py-1 text-xs rounded-md bg-muted text-muted-foreground"
          >
            {format}
          </span>
        ))}
      </div>
    </Card>
  );
};

export default ConversionCard;
