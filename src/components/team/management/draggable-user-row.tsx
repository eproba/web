import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ApiUserResponse } from "@/lib/serializers/user";
import { cn } from "@/lib/utils";
import { Organization, Patrol } from "@/types/team";
import { User } from "@/types/user";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { GripVerticalIcon, ListStartIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

import { UserEditDialog } from "./user-edit-dialog";

interface DraggableUserRowProps {
  user: User;
  patrols: Patrol[];
  onUserUpdate: (
    userId: string,
    updatedUser: Partial<ApiUserResponse>,
  ) => Promise<boolean>;
  isUpdating?: boolean;
  allowEditForLowerFunction: boolean;
}

export function DraggableUserRow({
  user,
  patrols,
  onUserUpdate,
  isUpdating = false,
  allowEditForLowerFunction = false,
}: DraggableUserRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  const isHighlighted = searchParams.get("highlightedUserId") === user.id;

  useEffect(() => {
    if (isHighlighted && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
      ref.current.focus();
    }
  }, [isHighlighted]);

  const handleBlur = () => {
    if (isHighlighted) {
      const params = new URLSearchParams(window.location.search);
      params.delete("highlightedUserId");
      router.replace(`${window.location.pathname}?${params.toString()}`, {
        scroll: false,
      });
    }
  };

  useEffect(() => {
    if (isUpdating || !user.isActive) return;
    const el = ref.current;
    const handle = handleRef.current;
    if (el && handle) {
      return draggable({
        element: el,
        dragHandle: handle,
        getInitialData: () => ({ type: "user", userId: user.id }),
      });
    }
  }, [user.id, isUpdating, user.isActive]);

  return (
    <UserEditDialog
      user={user}
      patrols={patrols}
      onUserUpdate={onUserUpdate}
      allowEditForLowerFunction={allowEditForLowerFunction}
    >
      <div
        ref={ref}
        className={cn(
          "hover:bg-muted data-[state=open]:bg-muted flex items-center justify-between gap-2 rounded-md p-2",
          isUpdating && "pointer-events-none opacity-50 select-none",
          isHighlighted && "focus:ring-primary focus:ring-2 focus:outline-none",
        )}
        tabIndex={isHighlighted ? 0 : -1}
        onBlur={handleBlur}
      >
        <div className="flex items-center gap-2">
          {user.isActive && (
            <div
              ref={handleRef}
              className="cursor-grab pointer-coarse:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <GripVerticalIcon className="text-muted-foreground h-5 w-5" />
            </div>
          )}
          <div className="cursor-pointer">
            <p className="font-medium">
              {user.firstName && user.firstName + " "}
              {user.lastName && user.lastName + " "}
              {user.nickname && `"${user.nickname}"`}
              {!user.firstName &&
                !user.lastName &&
                !user.nickname &&
                user.email}
            </p>
            <p className="text-muted-foreground text-sm">
              {user.scoutRank.shortName}
              {user.instructorRank.shortName
                ? ` · ${user.instructorRank.shortName}`
                : ""}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {user.function.numberValue != 0 && (
            <Badge>{user.function.fullName}</Badge>
          )}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href={`/worksheets/manage?userId=${user.id}&userName=${encodeURIComponent(user.displayName || user.email)}`}
              >
                <Button variant="ghost" size="icon">
                  <ListStartIcon className="size-4" />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              Przejdź do prób{" "}
              {user.organization === Organization.Female
                ? "harcerki"
                : "harcerza"}
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </UserEditDialog>
  );
}
