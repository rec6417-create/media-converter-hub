import { useCallback, useState } from "react";
import { Upload, File, X, Files } from "lucide-react";
import { Button } from "../ui/button";

interface FileDropzoneProps {
  accept: string;
  onFileSelect: (files: File[]) => void;
  selectedFiles: File[];
  onClear: () => void;
  onRemoveFile?: (index: number) => void;
  multiple?: boolean;
}

const FileDropzone = ({ accept, onFileSelect, selectedFiles, onClear, onRemoveFile, multiple = true }: FileDropzoneProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      onFileSelect(multiple ? files : [files[0]]);
    }
  }, [onFileSelect, multiple]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      onFileSelect(files);
    }
    // Reset input
    e.target.value = '';
  }, [onFileSelect]);

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const getTotalSize = () => {
    const total = selectedFiles.reduce((sum, file) => sum + file.size, 0);
    return formatFileSize(total);
  };

  if (selectedFiles.length > 0) {
    return (
      <div className="border border-border rounded-xl p-4 bg-muted/30 space-y-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Files className="w-5 h-5 text-primary" />
            <span className="font-medium">{selectedFiles.length} ფაილი</span>
            <span className="text-sm text-muted-foreground">({getTotalSize()})</span>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={() => document.getElementById("file-input")?.click()}>
              + დამატება
            </Button>
            <Button variant="ghost" size="sm" onClick={onClear}>
              გასუფთავება
            </Button>
          </div>
        </div>
        
        <div className="max-h-48 overflow-y-auto space-y-2">
          {selectedFiles.map((file, index) => (
            <div key={`${file.name}-${index}`} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <File className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-medium truncate text-sm">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
              </div>
              {onRemoveFile && (
                <Button variant="ghost" size="icon" className="h-8 w-8 flex-shrink-0" onClick={() => onRemoveFile(index)}>
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        
        <input
          id="file-input"
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileInput}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${
        isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => document.getElementById("file-input")?.click()}
    >
      <input
        id="file-input"
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileInput}
        className="hidden"
      />
      <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
      <p className="text-lg font-medium mb-2">
        {multiple ? "ჩააგდე ფაილები აქ" : "ჩააგდე ფაილი აქ"}
      </p>
      <p className="text-sm text-muted-foreground">
        {multiple ? "ან დააჭირე მრავალი ფაილის ასარჩევად" : "ან დააჭირე ატვირთვისთვის"}
      </p>
    </div>
  );
};

export default FileDropzone;
