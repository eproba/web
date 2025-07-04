import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { BadgeData } from "@/app/regulations/male/page";

interface BadgePopoverProps {
  badge: BadgeData;
  imageUrl?: string;
}

export function BadgePopover({ badge, imageUrl }: BadgePopoverProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Badge
          variant="outline"
          className="cursor-pointer hover:bg-muted transition-colors"
        >
          {badge.name}
          <div className="inline-flex items-center">
            {Array.from({ length: badge.stars }).map((_, i) => (
              <StarIcon
                key={i}
                className="w-3 h-3 text-yellow-500 fill-yellow-500"
              />
            ))}
          </div>
        </Badge>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            {imageUrl && (
              <div className="flex-shrink-0">
                <Image
                  src={imageUrl}
                  alt={badge.name}
                  width={48}
                  height={48}
                  className="rounded dark:invert"
                />
              </div>
            )}
            <div>
              <h4 className="font-medium">{badge.name}</h4>
              <div className="flex items-center gap-1">
                {Array.from({ length: badge.stars }).map((_, i) => (
                  <StarIcon
                    key={i}
                    className="w-3 h-3 text-yellow-500 fill-yellow-500"
                  />
                ))}
                <span className="text-sm text-muted-foreground ml-1">
                  {badge.stars}{" "}
                  {badge.stars === 1
                    ? "gwiazdka"
                    : badge.stars < 5
                      ? "gwiazdki"
                      : "gwiazdek"}
                </span>
              </div>
            </div>
          </div>

          {badge.requirements.length > 0 && (
            <div>
              <h5 className="font-medium text-sm mb-2">Wymagania:</h5>
              <ul className="text-xs space-y-1 list-disc pl-4">
                {badge.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
