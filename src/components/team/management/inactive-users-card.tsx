import React from "react";
import { User } from "@/types/user";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DraggableUserRow } from "@/components/team/management/draggable-user-row";
import { Organization, Patrol } from "@/types/team";
import { ApiUserResponse } from "@/lib/serializers/user";

interface InactiveUsersCardProps {
  users: User[];
  allPatrols: Patrol[];
  onUserUpdate: (
    userId: string,
    updatedUser: Partial<ApiUserResponse>,
  ) => Promise<boolean>;
  currentUser: User;
  updatingUserIds: string[];
}

export function InactiveUsersCard({
  users,
  allPatrols,
  onUserUpdate,
  currentUser,
  updatingUserIds,
}: InactiveUsersCardProps) {
  return (
    <Card className="bg-muted/50 border shadow-none">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>
          {currentUser.organization === Organization.Male
            ? "Nieaktywni harcerze"
            : "Nieaktywne harcerki"}
        </CardTitle>
      </CardHeader>
      <CardContent>
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
                currentUser={currentUser}
                isUpdating={updatingUserIds.includes(user.id)}
              />
            ))}
        </div>
      </CardContent>
    </Card>
  );
}
