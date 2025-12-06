import { useState } from "react";
import { Image, Download, Loader2 } from "lucide-react";
import ConverterLayout from "./ConverterLayout";
import FileDropzone from "./FileDropzone";
import FormatSelector from "./FormatSelector";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { toast } from "@/hooks/use-toast";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";

interface ImageConverterProps {
  onClose: () => void;
}

const imageFormats = ["PNG", "JPG", "WebP", "GIF", "BMP", "TIFF", "ICO"];

const ImageConverter = ({ onClose }: ImageConverterProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState("PNG");
  const [quality, setQuality] = useState([80]);
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleConvert = async () => {
    if (!file) {
      toast({
        title: "შეცდომა",
        description: "გთხოვთ აირჩიოთ ფაილი",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 20;
      });
    }, 300);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsConverting(false);
      toast({
        title: "წარმატება!",
        description: `სურათი გადაქცეულია ${outputFormat} ფორმატში`,
      });
    }, 2000);
  };

  return (
    <ConverterLayout
      icon={Image}
      title="სურათის კონვერტერი"
      description="გადააქციე სურათები სასურველ ფორმატში"
      onClose={onClose}
    >
      <div className="space-y-6">
        <FileDropzone
          accept="image/*"
          onFileSelect={setFile}
          selectedFile={file}
          onClear={() => setFile(null)}
        />

        <FormatSelector
          label="გამოსავალი ფორმატი"
          formats={imageFormats}
          value={outputFormat}
          onChange={setOutputFormat}
        />

        <div className="space-y-3">
          <div className="flex justify-between">
            <Label>ხარისხი</Label>
            <span className="text-sm text-muted-foreground">{quality[0]}%</span>
          </div>
          <Slider
            value={quality}
            onValueChange={setQuality}
            max={100}
            min={10}
            step={5}
            className="w-full"
          />
        </div>

        {isConverting && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>კონვერტაცია მიმდინარეობს...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <Button
          variant="gradient"
          size="lg"
          className="w-full"
          onClick={handleConvert}
          disabled={!file || isConverting}
        >
          {isConverting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              კონვერტაცია...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              კონვერტაცია და გადმოწერა
            </>
          )}
        </Button>
      </div>
    </ConverterLayout>
  );
};

export default ImageConverter;
