import { User } from "@/types/user";
import { GripVerticalIcon, ListStartIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useRef } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { UserEditDialog } from "./user-edit-dialog";
import { Organization, Patrol } from "@/types/team";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { ApiUserResponse } from "@/lib/serializers/user";
import { cn } from "@/lib/utils";

interface DraggableUserRowProps {
  user: User;
  patrols: Patrol[];
  onUserUpdate: (
    userId: string,
    updatedUser: Partial<ApiUserResponse>,
  ) => Promise<boolean>;
  currentUser: User;
  isUpdating?: boolean;
}

export function DraggableUserRow({
  user,
  patrols,
  onUserUpdate,
  currentUser,
  isUpdating = false,
}: DraggableUserRowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);

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
      currentUser={currentUser}
    >
      <div
        ref={ref}
        className={cn(
          "flex items-center justify-between gap-2 p-2 rounded-md hover:bg-muted data-[state=open]:bg-muted",
          isUpdating && "opacity-50 pointer-events-none select-none",
        )}
      >
        <div className="flex items-center gap-2">
          {user.isActive && (
            <div
              ref={handleRef}
              className="cursor-grab pointer-coarse:hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <GripVerticalIcon className="h-5 w-5 text-muted-foreground" />
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
            <p className="text-sm text-muted-foreground">
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
