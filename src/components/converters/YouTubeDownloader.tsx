import { useState } from "react";
import { Youtube, Download, Loader2, Link } from "lucide-react";
import ConverterLayout from "./ConverterLayout";
import FormatSelector from "./FormatSelector";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "@/hooks/use-toast";

interface YouTubeDownloaderProps {
  onClose: () => void;
}

const videoQualities = ["1080p MP4", "720p MP4", "480p MP4", "360p MP4", "MP3 Audio", "WAV Audio"];

const YouTubeDownloader = ({ onClose }: YouTubeDownloaderProps) => {
  const [url, setUrl] = useState("");
  const [quality, setQuality] = useState("1080p MP4");
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [videoInfo, setVideoInfo] = useState<{ title: string; duration: string } | null>(null);

  const isValidYouTubeUrl = (url: string) => {
    const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    return regex.test(url);
  };

  const handleFetchInfo = () => {
    if (!isValidYouTubeUrl(url)) {
      toast({
        title: "შეცდომა",
        description: "გთხოვთ შეიყვანოთ სწორი YouTube ლინკი",
        variant: "destructive",
      });
      return;
    }

    // Simulate fetching video info
    setVideoInfo({
      title: "Sample Video Title - Demo",
      duration: "5:32",
    });

    toast({
      title: "ვიდეო ნაპოვნია!",
      description: "აირჩიეთ ხარისხი და გადმოწერეთ",
    });
  };

  const handleDownload = async () => {
    if (!url || !videoInfo) {
      toast({
        title: "შეცდომა",
        description: "გთხოვთ ჯერ შეიყვანოთ YouTube ლინკი",
        variant: "destructive",
      });
      return;
    }

    setIsDownloading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 5;
      });
    }, 400);

    setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setIsDownloading(false);
      toast({
        title: "წარმატება!",
        description: `ვიდეო გადმოწერილია ${quality} ხარისხით`,
      });
    }, 8000);
  };

  return (
    <ConverterLayout
      icon={Youtube}
      title="YouTube გადმოწერა"
      description="გადმოწერე ვიდეოები YouTube-დან"
      onClose={onClose}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>YouTube ვიდეოს ლინკი</Label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="url"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="pl-10 bg-muted border-border"
              />
            </div>
            <Button variant="outline" onClick={handleFetchInfo}>
              მოძებნა
            </Button>
          </div>
        </div>

        {videoInfo && (
          <div className="p-4 rounded-xl bg-muted/50 border border-border">
            <p className="font-medium mb-1">{videoInfo.title}</p>
            <p className="text-sm text-muted-foreground">ხანგრძლივობა: {videoInfo.duration}</p>
          </div>
        )}

        <FormatSelector
          label="ხარისხი და ფორმატი"
          formats={videoQualities}
          value={quality}
          onChange={setQuality}
        />

        {isDownloading && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>გადმოწერა მიმდინარეობს...</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        <Button
          variant="gradient"
          size="lg"
          className="w-full"
          onClick={handleDownload}
          disabled={!videoInfo || isDownloading}
        >
          {isDownloading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              გადმოწერა...
            </>
          ) : (
            <>
              <Download className="w-4 h-4" />
              გადმოწერა
            </>
          )}
        </Button>
      </div>
    </ConverterLayout>
  );
};

export default YouTubeDownloader;
