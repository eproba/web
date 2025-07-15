import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import * as React from "react";

interface InputProps extends React.ComponentProps<"input"> {
  containerClassName?: string;
  startIcon?: LucideIcon;
  endIcon?: LucideIcon;
}

function Input({
  className,
  containerClassName,
  type,
  startIcon,
  endIcon,
  ...props
}: InputProps) {
  const StartIcon = startIcon;
  const EndIcon = endIcon;

  return (
    <div className={cn("relative w-full", containerClassName)}>
      {StartIcon && (
        <div className="absolute top-1/2 left-1.5 -translate-y-1/2 transform">
          <StartIcon size={18} className="text-muted-foreground" />
        </div>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          startIcon ? "pl-8" : "",
          endIcon ? "pr-8" : "",
          className,
        )}
        {...props}
      />
      {EndIcon && (
        <div className="absolute top-1/2 right-3 -translate-y-1/2 transform">
          <EndIcon className="text-muted-foreground" size={18} />
        </div>
      )}
    </div>
  );
}

export { Input };
