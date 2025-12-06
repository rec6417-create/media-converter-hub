import { useState } from "react";
import { Video, Download, Loader2 } from "lucide-react";
import ConverterLayout from "./ConverterLayout";
import FileDropzone from "./FileDropzone";
import FormatSelector from "./FormatSelector";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { toast } from "@/hooks/use-toast";

interface VideoConverterProps {
  onClose: () => void;
}

const videoFormats = ["MP4", "AVI", "MOV", "MKV", "WebM", "WMV", "FLV", "3GP"];

const VideoConverter = ({ onClose }: VideoConverterProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [outputFormat, setOutputFormat] = useState("MP4");
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

    // Simulate conversion progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsConverting(false);
      toast({
        title: "წარმატება!",
        description: `ფაილი გადაქცეულია ${outputFormat} ფორმატში`,
      });
    }, 5500);
  };

  return (
    <ConverterLayout
      icon={Video}
      title="ვიდეო კონვერტერი"
      description="გადააქციე ვიდეო ფაილები სასურველ ფორმატში"
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
          label="გამოსავალი ფორმატი"
          formats={videoFormats}
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

export default VideoConverter;
