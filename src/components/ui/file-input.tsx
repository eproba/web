import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { Button } from "./button";

export interface FileInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  value?: File | string | null;
  onChange?: (file: File | string | null) => void;
  accept?: string;
  maxSizeInMB?: number;
  preview?: boolean;
}

const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(
  (
    {
      className,
      value,
      onChange,
      accept,
      maxSizeInMB = 5,
      preview = true,
      ...props
    },
    ref,
  ) => {
    const [dragActive, setDragActive] = React.useState(false);
    const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    // Generate preview URL when file changes
    React.useEffect(() => {
      if (value && preview) {
        if (value instanceof File) {
          const url = URL.createObjectURL(value);
          setPreviewUrl(url);
          return () => URL.revokeObjectURL(url);
        } else if (typeof value === "string") {
          setPreviewUrl(value);
        }
      } else {
        setPreviewUrl(null);
      }
    }, [value, preview]);

    const handleFileChange = (file: File | string | null) => {
      if (file instanceof File) {
        // Validate file size only for File objects
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
        if (file.size > maxSizeInBytes) {
          alert(`Plik jest za duży. Maksymalny rozmiar to ${maxSizeInMB}MB.`);
          return;
        }
      }
      onChange?.(file);
    };

    const handleDrop = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        handleFileChange(files[0]);
      }
    };

    const handleDragEnter = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
    };

    const handleDragOver = (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files || []);
      if (files.length > 0) {
        handleFileChange(files[0]);
      }
    };

    const handleRemove = () => {
      handleFileChange(null);
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    };

    const openFileDialog = () => {
      inputRef.current?.click();
    };

    return (
      <div className="w-full">
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
          {...props}
        />

        <div
          className={cn(
            "relative group border-2 border-dashed rounded-xl p-6 cursor-pointer transition-all duration-200 min-h-[200px] flex flex-col items-center justify-center",
            dragActive
              ? "border-primary bg-primary/10 scale-[1.02]"
              : "border-border hover:border-primary/50 hover:bg-muted/30",
            value && "border-solid border-border/50 bg-muted/20",
            className,
          )}
          onDrop={handleDrop}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onClick={openFileDialog}
        >
          {/* Remove button overlay */}
          {value && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute top-3 right-3 h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <X className="h-4 w-4" />
            </Button>
          )}

          {preview && previewUrl ? (
            <div className="flex flex-col items-center justify-center space-y-3 w-full">
              {/* Image preview */}
              <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border/20">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>

              {/* File info */}
              <div className="text-center space-y-1">
                <p className="text-sm font-medium text-foreground">
                  {value instanceof File ? value.name : "Obecny obrazek"}
                </p>
                {value instanceof File && (
                  <p className="text-xs text-muted-foreground">
                    {(value.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Kliknij aby zmienić lub przeciągnij nowy plik
                </p>
              </div>
            </div>
          ) : value ? (
            <div className="flex flex-col items-center justify-center space-y-3">
              <ImageIcon className="size-24 p-4 text-muted-foreground" />
              <div className="text-center space-y-1">
                <p className="text-sm font-medium text-foreground">
                  {value instanceof File ? value.name : "Obecny obrazek"}
                </p>
                {value instanceof File && (
                  <p className="text-xs text-muted-foreground">
                    {(value.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Kliknij aby zmienić lub przeciągnij nowy plik
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="p-3 rounded-full bg-muted group-hover:bg-primary/10 transition-colors">
                <Upload className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-medium text-foreground">
                  Dodaj obrazek
                </p>
                <p className="text-xs text-muted-foreground">
                  Kliknij lub przeciągnij plik tutaj
                </p>
                <p className="text-xs text-muted-foreground">
                  JPG, PNG, GIF, SVG (maks. {maxSizeInMB}MB)
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  },
);

FileInput.displayName = "FileInput";

export { FileInput };
