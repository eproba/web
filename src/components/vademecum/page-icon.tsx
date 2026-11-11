import type { IconName } from "@/lib/vademecum/types";
import {
  AwardIcon,
  BookOpenIcon,
  BrainIcon,
  ChurchIcon,
  CompassIcon,
  CrownIcon,
  FlameIcon,
  HandHeartIcon,
  HeartPulseIcon,
  HouseIcon,
  LandmarkIcon,
  ListChecksIcon,
  type LucideProps,
  MessageCircleQuestionIcon,
  MessagesSquareIcon,
  RouteIcon,
  ShieldIcon,
  SignpostIcon,
  SparklesIcon,
  TreesIcon,
  UserRoundCheckIcon,
  UsersIcon,
} from "lucide-react";

const ICONS: Record<IconName, React.ComponentType<LucideProps>> = {
  "book-open": BookOpenIcon,
  flame: FlameIcon,
  award: AwardIcon,
  crown: CrownIcon,
  "user-round-check": UserRoundCheckIcon,
  users: UsersIcon,
  route: RouteIcon,
  "list-checks": ListChecksIcon,
  compass: CompassIcon,
  "message-circle-question": MessageCircleQuestionIcon,
  signpost: SignpostIcon,
  church: ChurchIcon,
  shield: ShieldIcon,
  brain: BrainIcon,
  "heart-pulse": HeartPulseIcon,
  "hand-heart": HandHeartIcon,
  landmark: LandmarkIcon,
  house: HouseIcon,
  sparkles: SparklesIcon,
  "messages-square": MessagesSquareIcon,
  trees: TreesIcon,
};

export function PageIcon({ name, ...props }: { name: IconName } & LucideProps) {
  const Icon = ICONS[name];
  return <Icon aria-hidden {...props} />;
}
