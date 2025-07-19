import { Button } from "@/components/ui/button";
import { Team } from "@/types/team";

import { TeamEditDialog } from "./team-edit-dialog";

interface TeamHeaderProps {
  team: Team;
  onTeamUpdate: (name: string, shortName: string) => Promise<boolean>;
  allowEdit: boolean;
}

export function TeamHeader({ team, onTeamUpdate, allowEdit }: TeamHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2 px-2 sm:px-0">
      <div>
        <h1 className="text-xl font-semibold sm:text-2xl">
          {team.name}{" "}
          <span className="font-normal">
            · <span className="text-nowrap">{team.shortName}</span>
          </span>
        </h1>
        <p className="text-muted-foreground">{team.district.name}</p>
      </div>
      {allowEdit && (
        <TeamEditDialog team={team} onTeamUpdate={onTeamUpdate}>
          <Button>Edytuj dane drużyny</Button>
        </TeamEditDialog>
      )}
    </div>
  );
}
