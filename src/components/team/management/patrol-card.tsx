import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ApiUserResponse } from "@/lib/serializers/user";
import { Patrol } from "@/types/team";
import { User } from "@/types/user";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { PenIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { DraggableUserRow } from "./draggable-user-row";
import { DropIndicator } from "./drop-indicator";
import { PatrolEditDialog } from "./patrol-edit-dialog";

interface PatrolCardProps {
  patrol: Patrol;
  users: User[];
  allPatrols: Patrol[];
  onPatrolUpdate: (patrolId: string, name: string) => Promise<boolean>;
  onUserUpdate: (
    userId: string,
    updatedUser: Partial<ApiUserResponse>,
  ) => Promise<boolean>;
  onPatrolDelete: (id: string) => Promise<boolean>;
  updatingUserIds: string[];
  allowEditForLowerFunction: boolean;
}

export function PatrolCard({
  patrol,
  users,
  allPatrols,
  onPatrolUpdate,
  onUserUpdate,
  onPatrolDelete,
  updatingUserIds,
  allowEditForLowerFunction,
}: PatrolCardProps) {
  const ref = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (el) {
      return dropTargetForElements({
        element: el,
        getData: () => ({ patrolId: patrol.id }),
        onDragEnter: () => setIsDraggedOver(true),
        onDragLeave: () => setIsDraggedOver(false),
        onDrop: () => setIsDraggedOver(false),
      });
    }
  }, [patrol.id]);

  return (
    <Card ref={ref} className="relative">
      {isDraggedOver && <DropIndicator />}
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{patrol.name}</CardTitle>
        <div className="flex gap-2">
          <PatrolEditDialog
            patrol={patrol}
            onPatrolUpdate={onPatrolUpdate}
            onPatrolDelete={onPatrolDelete}
            allowDelete={users.length === 0 && allPatrols.length > 1}
            isLastPatrol={allPatrols.length === 1}
          >
            <Button variant="ghost" size="icon">
              <PenIcon className="size-4" />
            </Button>
          </PatrolEditDialog>
        </div>
      </CardHeader>
      <CardContent>
        {users.length > 0 ? (
          <div className="space-y-2">
            {users
              .sort((a, b) => {
                const fnDiff = b.function.numberValue - a.function.numberValue;
                if (fnDiff !== 0) return fnDiff;
                const aName =
                  `${a.firstName || ""} ${a.lastName || ""} ${a.nickname ? `"${a.nickname}"` : a.email}`.trim();
                const bName =
                  `${b.firstName || ""} ${b.lastName || ""} ${b.nickname ? `"${b.nickname}"` : b.email}`.trim();
                return aName.localeCompare(bName);
              })
              .map((user) => (
                <DraggableUserRow
                  key={user.id}
                  user={user}
                  patrols={allPatrols}
                  onUserUpdate={onUserUpdate}
                  isUpdating={updatingUserIds.includes(user.id)}
                  allowEditForLowerFunction={allowEditForLowerFunction}
                />
              ))}
          </div>
        ) : (
          <p className="text-muted-foreground">Brak członków w tym zastępie.</p>
        )}
      </CardContent>
    </Card>
  );
}
