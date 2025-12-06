import { useState } from "react";
import { Music, Download, Loader2 } from "lucide-react";
import ConverterLayout from "./ConverterLayout";
import FileDropzone from "./FileDropzone";
import FormatSelector from "./FormatSelector";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { toast } from "@/hooks/use-toast";

interface AudioConverterProps {
  onClose: () => void;
}

const audioFormats = ["MP3", "WAV", "FLAC", "AAC", "OGG", "M4A", "WMA", "AIFF"];

const AudioConverter = ({ onClose }: AudioConverterProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState("MP3");
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
        return prev + 15;
      });
    }, 400);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsConverting(false);
      toast({
        title: "წარმატება!",
        description: `აუდიო გადაქცეულია ${outputFormat} ფორმატში`,
      });
    }, 3000);
  };

  return (
    <ConverterLayout
      icon={Music}
      title="აუდიო კონვერტერი"
      description="გადააქციე აუდიო ფაილები სასურველ ფორმატში"
      onClose={onClose}
    >
      <div className="space-y-6">
        <FileDropzone
          accept="audio/*"
          onFileSelect={setFile}
          selectedFile={file}
          onClear={() => setFile(null)}
        />

        <FormatSelector
          label="გამოსავალი ფორმატი"
          formats={audioFormats}
          value={outputFormat}
          onChange={setOutputFormat}
        />

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

export default AudioConverter;
