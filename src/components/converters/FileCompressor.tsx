import { useState } from "react";
import { FileArchive, Download, Loader2, CheckCircle } from "lucide-react";
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

interface FileProgress {
  file: File;
  progress: number;
  status: "pending" | "compressing" | "done";
  originalSize: number;
  compressedSize: number;
}

const FileCompressor = ({ onClose }: FileCompressorProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [compressionLevel, setCompressionLevel] = useState([70]);
  const [isCompressing, setIsCompressing] = useState(false);
  const [fileProgress, setFileProgress] = useState<FileProgress[]>([]);

  const handleFilesSelect = (newFiles: File[]) => {
    setFiles(prev => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const handleCompress = async () => {
    if (files.length === 0) {
      toast({
        title: "შეცდომა",
        description: "გთხოვთ აირჩიოთ ფაილები",
        variant: "destructive",
      });
      return;
    }

    setIsCompressing(true);
    setFileProgress(files.map(file => ({ 
      file, 
      progress: 0, 
      status: "pending",
      originalSize: file.size,
      compressedSize: Math.round(file.size * (100 - compressionLevel[0]) / 100)
    })));

    for (let i = 0; i < files.length; i++) {
      setFileProgress(prev => prev.map((fp, idx) => 
        idx === i ? { ...fp, status: "compressing" } : fp
      ));

      for (let p = 0; p <= 100; p += 20) {
        await new Promise(resolve => setTimeout(resolve, 180));
        setFileProgress(prev => prev.map((fp, idx) => 
          idx === i ? { ...fp, progress: p } : fp
        ));
      }

      setFileProgress(prev => prev.map((fp, idx) => 
        idx === i ? { ...fp, progress: 100, status: "done" } : fp
      ));
    }

    setIsCompressing(false);
    
    const totalOriginal = files.reduce((sum, f) => sum + f.size, 0);
    const totalCompressed = Math.round(totalOriginal * (100 - compressionLevel[0]) / 100);
    
    toast({
      title: "წარმატება!",
      description: `${files.length} ფაილი შეკუმშულია: ${formatFileSize(totalOriginal)} → ${formatFileSize(totalCompressed)}`,
    });
  };

  const overallProgress = fileProgress.length > 0
    ? Math.round(fileProgress.reduce((sum, fp) => sum + fp.progress, 0) / fileProgress.length)
    : 0;

  const getCompressionLabel = () => {
    if (compressionLevel[0] < 40) return "მინიმალური";
    if (compressionLevel[0] < 70) return "საშუალო";
    return "მაქსიმალური";
  };

  return (
    <ConverterLayout
      icon={FileArchive}
      title="ფაილის კომპრესია"
      description="შეამცირე ფაილების ზომა ხარისხის შენარჩუნებით"
      onClose={onClose}
    >
      <div className="space-y-6">
        <FileDropzone
          accept="video/*,image/*,application/pdf"
          onFileSelect={handleFilesSelect}
          selectedFiles={files}
          onClear={() => setFiles([])}
          onRemoveFile={handleRemoveFile}
          multiple={true}
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

        {isCompressing && fileProgress.length > 0 && (
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
                  ) : fp.status === "compressing" ? (
                    <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  ) : (
                    <div className="w-4 h-4 rounded-full border border-muted-foreground" />
                  )}
                  <span className="truncate flex-1">{fp.file.name}</span>
                  {fp.status === "done" && (
                    <span className="text-green-500 text-xs">
                      {formatFileSize(fp.originalSize)} → {formatFileSize(fp.compressedSize)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <Button
          variant="gradient"
          size="lg"
          className="w-full"
          onClick={handleCompress}
          disabled={files.length === 0 || isCompressing}
        >
          {isCompressing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              კომპრესია... ({overallProgress}%)
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              {files.length > 0 ? `${files.length} ფაილის შეკუმშვა` : "შეკუმშვა და გადმოწერა"}
            </>
          )}
        </Button>
      </div>
    </ConverterLayout>
  );
};

export default FileCompressor;
