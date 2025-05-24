import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { District, Patrol, Team } from "@/types/team";
import { useApi } from "@/lib/api-client";
import { districtSerializer, teamSerializer } from "@/lib/serializers/team";
import { FieldInfo } from "@/types/user";

interface PatrolSelectFormProps {
  userGender: FieldInfo | null;
  selectedPatrol?: string;
  setSelectedPatrol: (patrol: string) => void;
}

const sortDistricts = (a: District, b: District) =>
  a.name.localeCompare(b.name);
const sortPatrols = (a: Patrol, b: Patrol) => a.name.localeCompare(b.name);
const extractNumber = (name: string) =>
  parseInt((name.match(/^\d+/) || ["0"])[0], 10);
const sortTeams = (a: Team, b: Team) =>
  extractNumber(a.name) - extractNumber(b.name) || a.name.localeCompare(b.name);

export const PatrolSelector: React.FC<PatrolSelectFormProps> = ({
  userGender,
  selectedPatrol,
  setSelectedPatrol,
}) => {
  const { apiClient, isApiReady } = useApi();
  const [districts, setDistricts] = useState<District[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [patrols, setPatrols] = useState<Patrol[]>([]);

  const initialOrganization = userGender?.numberValue ?? null;
  const [selectedOrganization, setSelectedOrganization] = useState<
    number | null
  >([0, 1].includes(initialOrganization ?? -1) ? initialOrganization : null);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTeam, setSelectedTeam] = useState("");

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await apiClient("/districts/");
        const data = (await response.json())
          .map(districtSerializer)
          .sort(sortDistricts);
        setDistricts(data);
      } catch (err) {
        console.error("Failed to fetch districts:", err);
      }
    };

    if (isApiReady) {
      fetchDistricts();
    }
  }, [isApiReady, apiClient]);

  const handleOrganizationChange = useCallback((value: string) => {
    const newOrg = Number(value);
    setSelectedOrganization(newOrg);
    setSelectedDistrict((prev) => {
      if (prev) handleDistrictChange(prev, newOrg);
      return prev;
    });
  }, []);

  const handleDistrictChange = useCallback(
    async (value: string, orgOverride?: number | null) => {
      setSelectedDistrict(value);
      setSelectedTeam("");
      setPatrols([]);
      setSelectedPatrol("");

      try {
        const organization = orgOverride ?? selectedOrganization;
        const orgQuery =
          organization !== null ? `&organization=${organization}` : "";
        const response = await apiClient(
          `/teams/?district=${value}&is_verified=true${orgQuery}`,
        );

        const teamsData = (await response.json())
          .map(teamSerializer)
          .sort(sortTeams);

        setTeams(teamsData);
      } catch (err) {
        console.error("Failed to fetch teams:", err);
      }
    },
    [selectedOrganization, apiClient, setSelectedPatrol],
  );

  const handleTeamChange = useCallback(
    async (value: string) => {
      setSelectedTeam(value);
      setSelectedPatrol("");

      try {
        const response = await apiClient(`/teams/${value}/`);
        const team = teamSerializer(await response.json());
        setPatrols((team.patrols || []).sort(sortPatrols));
      } catch (err) {
        console.error("Failed to fetch patrols:", err);
      }
    },
    [apiClient, setSelectedPatrol],
  );

  const patrolOptions = useMemo(
    () => patrols.map((p) => ({ value: p.id, label: p.name })),
    [patrols],
  );

  return (
    <div className="flex flex-col gap-4 w-full overflow-hidden">
      <div>
        <Label>Organizacja</Label>
        <Select
          value={selectedOrganization?.toString() ?? ""}
          onValueChange={handleOrganizationChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wybierz organizację" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Organizacja Harcerzy</SelectItem>
            <SelectItem value="1">Organizacja Harcerek</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Okręg</Label>
        <Select
          value={selectedDistrict}
          onValueChange={(v) => handleDistrictChange(v, selectedOrganization)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wybierz okręg" />
          </SelectTrigger>
          <SelectContent>
            {districts.map((d) => (
              <SelectItem key={d.id} value={d.id}>
                {d.name}
              </SelectItem>
            ))}
            {!districts.length && (
              <SelectItem disabled value="null">
                Brak dostępnych okręgów
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Drużyna</Label>
        <Select
          value={selectedTeam}
          onValueChange={handleTeamChange}
          disabled={!selectedDistrict}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wybierz drużynę" />
          </SelectTrigger>
          <SelectContent>
            {teams.map((t) => (
              <SelectItem key={t.id} value={t.id}>
                {t.name}
              </SelectItem>
            ))}
            {!teams.length && (
              <SelectItem disabled value="null">
                {selectedOrganization !== null
                  ? "Brak drużyn w tym okręgu dla wybranej organizacji"
                  : "Brak drużyn w tym okręgu"}
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label>Zastęp</Label>
        <Select
          value={selectedPatrol}
          onValueChange={setSelectedPatrol}
          disabled={!selectedTeam}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wybierz zastęp" />
          </SelectTrigger>
          <SelectContent>
            {patrolOptions.map((p) => (
              <SelectItem key={p.value} value={p.value}>
                {p.label}
              </SelectItem>
            ))}
            {!patrols.length && (
              <SelectItem disabled value="null">
                Brak zastępów w tej drużynie
              </SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
