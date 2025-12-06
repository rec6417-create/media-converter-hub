import { useState } from "react";
import { Scissors, Download, Loader2 } from "lucide-react";
import ConverterLayout from "./ConverterLayout";
import FileDropzone from "./FileDropzone";
import FormatSelector from "./FormatSelector";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { toast } from "@/hooks/use-toast";

interface AudioExtractorProps {
  onClose: () => void;
}

const audioFormats = ["MP3", "WAV", "AAC", "FLAC", "OGG", "M4A"];

const AudioExtractor = ({ onClose }: AudioExtractorProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState("MP3");
  const [isExtracting, setIsExtracting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleExtract = async () => {
    if (!file) {
      toast({
        title: "შეცდომა",
        description: "გთხოვთ აირჩიოთ ვიდეო ფაილი",
        variant: "destructive",
      });
      return;
    }

    setIsExtracting(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 8;
      });
    }, 400);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsExtracting(false);
      toast({
        title: "წარმატება!",
        description: `აუდიო ამოღებულია ${outputFormat} ფორმატში`,
      });
    }, 5000);
  };

  return (
    <ConverterLayout
      icon={Scissors}
      title="აუდიოს ამოღება"
      description="ამოიღე აუდიო ტრეკი ვიდეო ფაილიდან"
      onClose={onClose}
    >
      <div className="space-y-6">
        <FileDropzone
          accept="video/*"
          onFileSelect={setFile}
          selectedFile={file}
          onClear={() => setFile(null)}
        />

        <FormatSelector
          label="აუდიოს ფორმატი"
          formats={audioFormats}
          value={outputFormat}
          onChange={setOutputFormat}
        />

        {isExtracting && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>აუდიოს ამოღება მიმდინარეობს...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <Button
          variant="gradient"
          size="lg"
          className="w-full"
          onClick={handleExtract}
          disabled={!file || isExtracting}
        >
          {isExtracting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              ამოღება...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              აუდიოს ამოღება
            </>
          )}
        </Button>
      </div>
    </ConverterLayout>
  );
};

export default AudioExtractor;
