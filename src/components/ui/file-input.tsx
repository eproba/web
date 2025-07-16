import { cn } from "@/lib/utils";
import { ImageIcon, UploadIcon, XIcon } from "lucide-react";
import Image from "next/image";
import * as React from "react";
import { useState } from "react";

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
    const [dragActive, setDragActive] = useState(false);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    // Generate preview URL when file changes
    React.useEffect(() => {
      if (value && preview) {
        if (value instanceof File) {
          const url = URL.createObjectURL(value);
          setPreviewUrl(url);
          return () => URL.revokeObjectURL(url);
        } else if (value) {
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
            "group relative flex min-h-[200px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition-all duration-200",
            dragActive
              ? "border-primary bg-primary/10 scale-[1.02]"
              : "border-border hover:border-primary/50 hover:bg-muted/30",
            value && "border-border/50 bg-muted/20 border-solid",
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
              className="absolute top-3 right-3 z-10 h-8 w-8 p-0 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <XIcon className="size-4" />
            </Button>
          )}

          {preview && previewUrl ? (
            <div className="flex w-full flex-col items-center justify-center space-y-3">
              {/* Image preview */}
              <div className="border-border/20 relative h-24 w-24 overflow-hidden rounded-lg border">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                />
              </div>

              {/* File info */}
              <div className="space-y-1 text-center">
                <p className="text-foreground text-sm font-medium">
                  {value instanceof File ? value.name : "Obecny obrazek"}
                </p>
                {value instanceof File && (
                  <p className="text-muted-foreground text-xs">
                    {(value.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                )}
                <p className="text-muted-foreground text-xs">
                  Kliknij aby zmienić lub przeciągnij nowy plik
                </p>
              </div>
            </div>
          ) : value ? (
            <div className="flex flex-col items-center justify-center space-y-3">
              <ImageIcon className="text-muted-foreground size-24 p-4" />
              <div className="space-y-1 text-center">
                <p className="text-foreground text-sm font-medium">
                  {value instanceof File ? value.name : "Obecny obrazek"}
                </p>
                {value instanceof File && (
                  <p className="text-muted-foreground text-xs">
                    {(value.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                )}
                <p className="text-muted-foreground text-xs">
                  Kliknij aby zmienić lub przeciągnij nowy plik
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="bg-muted group-hover:bg-primary/10 rounded-full p-3 transition-colors">
                <UploadIcon className="text-muted-foreground group-hover:text-primary h-8 w-8 transition-colors" />
              </div>
              <div className="space-y-1 text-center">
                <p className="text-foreground text-sm font-medium">
                  Dodaj obrazek
                </p>
                <p className="text-muted-foreground text-xs">
                  Kliknij lub przeciągnij plik tutaj
                </p>
                <p className="text-muted-foreground text-xs">
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
