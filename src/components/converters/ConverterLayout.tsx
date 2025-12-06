import { ReactNode } from "react";
import { ArrowLeft, LucideIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

interface ConverterLayoutProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClose: () => void;
  children: ReactNode;
}

const ConverterLayout = ({ icon: Icon, title, description, onClose, children }: ConverterLayoutProps) => {
  return (
    <Card variant="glass" className="p-8">
      <Button variant="ghost" size="sm" onClick={onClose} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        უკან დაბრუნება
      </Button>

      <div className="flex items-center gap-4 mb-6">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
          <Icon className="w-7 h-7 text-primary-foreground" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>

      {children}
    </Card>
  );
};

export default ConverterLayout;
