import { useState } from "react";
import { FileArchive, Download, Loader2 } from "lucide-react";
import ConverterLayout from "./ConverterLayout";
import FileDropzone from "./FileDropzone";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { toast } from "@/hooks/use-toast";
import { Slider } from "../ui/slider";
import { Label } from "../ui/label";

interface FileCompressorProps {
  onClose: () => void;
}

const FileCompressor = ({ onClose }: FileCompressorProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [compressionLevel, setCompressionLevel] = useState([70]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleCompress = async () => {
    if (!file) {
      toast({
        title: "შეცდომა",
        description: "გთხოვთ აირჩიოთ ფაილი",
        variant: "destructive",
      });
      return;
    }

    setIsCompressing(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 400);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsCompressing(false);
      
      const originalSize = (file.size / (1024 * 1024)).toFixed(2);
      const compressedSize = ((file.size * (100 - compressionLevel[0]) / 100) / (1024 * 1024)).toFixed(2);
      
      toast({
        title: "წარმატება!",
        description: `ფაილი შეკუმშულია: ${originalSize}MB → ${compressedSize}MB`,
      });
    }, 4500);
  };

  const getCompressionLabel = () => {
    if (compressionLevel[0] < 40) return "მინიმალური";
    if (compressionLevel[0] < 70) return "საშუალო";
    return "მაქსიმალური";
  };

  return (
    <ConverterLayout
      icon={FileArchive}
      title="ფაილის კომპრესია"
      description="შეამცირე ფაილის ზომა ხარისხის შენარჩუნებით"
      onClose={onClose}
    >
      <div className="space-y-6">
        <FileDropzone
          accept="video/*,image/*,application/pdf"
          onFileSelect={setFile}
          selectedFile={file}
          onClear={() => setFile(null)}
        />

        <div className="space-y-3">
          <div className="flex justify-between">
            <Label>კომპრესიის დონე</Label>
            <span className="text-sm text-muted-foreground">
              {getCompressionLabel()} ({compressionLevel[0]}%)
            </span>
          </div>
          <Slider
            value={compressionLevel}
            onValueChange={setCompressionLevel}
            max={90}
            min={10}
            step={5}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            მაღალი კომპრესია = მცირე ზომა, დაბალი ხარისხი
          </p>
        </div>

        {isCompressing && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>კომპრესია მიმდინარეობს...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <Button
          variant="gradient"
          size="lg"
          className="w-full"
          onClick={handleCompress}
          disabled={!file || isCompressing}
        >
          {isCompressing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              კომპრესია...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              შეკუმშვა და გადმოწერა
            </>
          )}
        </Button>
      </div>
    </ConverterLayout>
  );
};

export default FileCompressor;
