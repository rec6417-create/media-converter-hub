import { useState } from "react";
import { Image, Download, Loader2, CheckCircle } from "lucide-react";
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

interface FileProgress {
  file: File;
  progress: number;
  status: "pending" | "converting" | "done";
}

const ImageConverter = ({ onClose }: ImageConverterProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [outputFormat, setOutputFormat] = useState("PNG");
  const [quality, setQuality] = useState([80]);
  const [isConverting, setIsConverting] = useState(false);
  const [fileProgress, setFileProgress] = useState<FileProgress[]>([]);

  const handleFilesSelect = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleConvert = async () => {
    if (files.length === 0) {
      toast({
        title: "შეცდომა",
        description: "გთხოვთ აირჩიოთ ფაილები",
        variant: "destructive",
      });
      return;
    }

    setIsConverting(true);
    setFileProgress(files.map(file => ({ file, progress: 0, status: "pending" })));

    for (let i = 0; i < files.length; i++) {
      setFileProgress(prev => prev.map((fp, idx) => 
        idx === i ? { ...fp, status: "converting" } : fp
      ));

      for (let p = 0; p <= 100; p += 33) {
        await new Promise(resolve => setTimeout(resolve, 100));
        setFileProgress(prev => prev.map((fp, idx) => 
          idx === i ? { ...fp, progress: Math.min(p, 100) } : fp
        ));
      }

      setFileProgress(prev => prev.map((fp, idx) => 
        idx === i ? { ...fp, progress: 100, status: "done" } : fp
      ));
    }

    setIsConverting(false);
    toast({
      title: "წარმატება!",
      description: `${files.length} სურათი გადაქცეულია ${outputFormat} ფორმატში`,
    });
  };

  const overallProgress = fileProgress.length > 0
    ? Math.round(fileProgress.reduce((sum, fp) => sum + fp.progress, 0) / fileProgress.length)
    : 0;

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
          onFileSelect={handleFilesSelect}
          selectedFiles={files}
          onClear={() => setFiles([])}
          onRemoveFile={handleRemoveFile}
          multiple={true}
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

        {isConverting && fileProgress.length > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>საერთო პროგრესი</span>
              <span>{overallProgress}%</span>
            </div>
            <Progress value={overallProgress} className="h-2" />
            
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {fileProgress.map((fp, index) => (
                <div key={index} className="flex items-center gap-3 text-sm">
                  {fp.status === "done" ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : fp.status === "converting" ? (
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-muted-foreground" />
                  )}
                  <span className="truncate flex-1">{fp.file.name}</span>
                  <span className="text-muted-foreground">{fp.progress}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          variant="gradient"
          size="lg"
          className="w-full"
          onClick={handleConvert}
          disabled={files.length === 0 || isConverting}
        >
          {isConverting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              კონვერტაცია... ({overallProgress}%)
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              {files.length > 0 ? `${files.length} სურათის კონვერტაცია` : "კონვერტაცია და გადმოწერა"}
            </>
          )}
        </Button>
      </div>
    </ConverterLayout>
  );
};

export default ImageConverter;
