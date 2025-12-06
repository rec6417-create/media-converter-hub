import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface FormatSelectorProps {
  label: string;
  formats: string[];
  value: string;
  onChange: (value: string) => void;
}

const FormatSelector = ({ label, formats, value, onChange }: FormatSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full bg-muted border-border">
          <SelectValue placeholder="აირჩიე ფორმატი" />
        </SelectTrigger>
        <SelectContent>
          {formats.map((format) => (
            <SelectItem key={format} value={format}>
              {format}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormatSelector;
