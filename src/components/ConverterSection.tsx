import { useState } from "react";
import { Video, Music, Image, FileArchive, Scissors, Youtube } from "lucide-react";
import ConversionCard from "./ConversionCard";
import VideoConverter from "./converters/VideoConverter";
import AudioConverter from "./converters/AudioConverter";
import ImageConverter from "./converters/ImageConverter";
import YouTubeDownloader from "./converters/YouTubeDownloader";
import AudioExtractor from "./converters/AudioExtractor";
import FileCompressor from "./converters/FileCompressor";

type ConverterType = "video" | "audio" | "image" | "youtube" | "extract" | "compress" | null;

const ConverterSection = () => {
  const [activeConverter, setActiveConverter] = useState<ConverterType>(null);

  const converters = [
    {
      id: "video" as const,
      icon: Video,
      title: "ვიდეო კონვერტერი",
      description: "გადააქციე ვიდეო ფაილები სხვადასხვა ფორმატში",
      formats: ["MP4", "AVI", "MOV", "MKV", "WebM", "WMV"],
      color: "primary" as const,
    },
    {
      id: "audio" as const,
      icon: Music,
      title: "აუდიო კონვერტერი",
      description: "კონვერტაცია აუდიო ფორმატებს შორის",
      formats: ["MP3", "WAV", "FLAC", "AAC", "OGG", "M4A"],
      color: "secondary" as const,
    },
    {
      id: "image" as const,
      icon: Image,
      title: "სურათის კონვერტერი",
      description: "გადააქციე სურათები სხვადასხვა ფორმატში",
      formats: ["PNG", "JPG", "WebP", "GIF", "SVG", "BMP"],
      color: "primary" as const,
    },
    {
      id: "youtube" as const,
      icon: Youtube,
      title: "YouTube გადმოწერა",
      description: "გადმოწერე ვიდეოები YouTube-დან",
      formats: ["MP4", "MP3", "WebM", "1080p", "4K"],
      color: "secondary" as const,
    },
    {
      id: "extract" as const,
      icon: Scissors,
      title: "აუდიოს ამოღება",
      description: "ამოიღე აუდიო ტრეკი ვიდეოდან",
      formats: ["MP3", "WAV", "AAC", "FLAC"],
      color: "primary" as const,
    },
    {
      id: "compress" as const,
      icon: FileArchive,
      title: "ფაილის კომპრესია",
      description: "შეამცირე ფაილის ზომა ხარისხის შენარჩუნებით",
      formats: ["ვიდეო", "სურათი", "PDF"],
      color: "secondary" as const,
    },
  ];

  const renderActiveConverter = () => {
    switch (activeConverter) {
      case "video":
        return <VideoConverter onClose={() => setActiveConverter(null)} />;
      case "audio":
        return <AudioConverter onClose={() => setActiveConverter(null)} />;
      case "image":
        return <ImageConverter onClose={() => setActiveConverter(null)} />;
      case "youtube":
        return <YouTubeDownloader onClose={() => setActiveConverter(null)} />;
      case "extract":
        return <AudioExtractor onClose={() => setActiveConverter(null)} />;
      case "compress":
        return <FileCompressor onClose={() => setActiveConverter(null)} />;
      default:
        return null;
    }
  };

  return (
    <section id="converter" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            აირჩიე <span className="gradient-text">კონვერტერი</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            აირჩიე სასურველი ინსტრუმენტი და დაიწყე ფაილების კონვერტაცია წამებში
          </p>
        </div>

        {activeConverter ? (
          <div className="max-w-3xl mx-auto animate-scale-in">
            {renderActiveConverter()}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {converters.map((converter) => (
              <ConversionCard
                key={converter.id}
                icon={converter.icon}
                title={converter.title}
                description={converter.description}
                formats={converter.formats}
                color={converter.color}
                onClick={() => setActiveConverter(converter.id)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ConverterSection;
