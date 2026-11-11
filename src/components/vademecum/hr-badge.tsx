import { Badge } from "@/components/ui/badge";

/** Marks a guidepost meant mainly for the HR trial, like in print. */
export function HrBadge() {
  return (
    <Badge
      variant="secondary"
      title="Drogowskaz przeznaczony przede wszystkim dla zdobywających HR"
    >
      HR
    </Badge>
  );
}
