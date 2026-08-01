import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useApi } from "@/lib/api-client";
import { districtSerializer, teamSerializer } from "@/lib/serializers/team";
import { District, Patrol, Team } from "@/types/team";
import { FieldInfo } from "@/types/user";
import React, { useCallback, useEffect, useMemo, useState } from "react";

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

const organizationItems = [
  { label: "Organizacja Harcerzy", value: "0" },
  { label: "Organizacja Harcerek", value: "1" },
];

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
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null);

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

  const handleDistrictChange = useCallback(
    async (value: string, orgOverride?: number | null) => {
      setSelectedDistrict(value);
      setSelectedTeam(null);
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

  const handleOrganizationChange = useCallback(
    (value: string) => {
      const newOrg = Number(value);
      setSelectedOrganization(newOrg);
      setSelectedDistrict((prev) => {
        if (prev) handleDistrictChange(prev, newOrg);
        return prev;
      });
    },
    [handleDistrictChange],
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
    <div className="flex w-full min-w-0 flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label>Organizacja</Label>
        <Select
          items={organizationItems}
          value={selectedOrganization?.toString() ?? null}
          onValueChange={(value) => {
            if (value !== null) {
              handleOrganizationChange(value);
            }
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wybierz organizację" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {organizationItems.map((organization) => (
                <SelectItem key={organization.value} value={organization.value}>
                  {organization.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Okręg</Label>
        <Select
          items={districts.map((district) => ({
            label: district.name,
            value: district.id,
          }))}
          value={selectedDistrict}
          onValueChange={(value) => {
            if (value !== null) {
              handleDistrictChange(value, selectedOrganization);
            }
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wybierz okręg" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {districts.map((d) => (
                <SelectItem key={d.id} value={d.id}>
                  {d.name}
                </SelectItem>
              ))}
              {!districts.length && (
                <SelectItem disabled value="__no-options">
                  Brak dostępnych okręgów
                </SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Drużyna</Label>
        <Select
          items={teams.map((team) => ({
            label: team.name,
            value: team.id,
          }))}
          value={selectedTeam}
          onValueChange={(value) => {
            if (value !== null) {
              handleTeamChange(value);
            }
          }}
          disabled={!selectedDistrict}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wybierz drużynę" />
          </SelectTrigger>
          <SelectContent className="w-(--anchor-width)">
            <SelectGroup>
              {teams.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))}
              {!teams.length && (
                <SelectItem disabled value="__no-options">
                  {selectedOrganization !== null
                    ? "Brak drużyn w tym okręgu dla wybranej organizacji"
                    : "Brak drużyn w tym okręgu"}
                </SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-2">
        <Label>Zastęp</Label>
        <Select
          items={patrolOptions}
          value={selectedPatrol || null}
          onValueChange={(value) => setSelectedPatrol(value ?? "")}
          disabled={!selectedTeam}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Wybierz zastęp" />
          </SelectTrigger>
          <SelectContent className="w-(--anchor-width)">
            <SelectGroup>
              {patrolOptions.map((p) => (
                <SelectItem key={p.value} value={p.value}>
                  {p.label}
                </SelectItem>
              ))}
              {!patrols.length && (
                <SelectItem disabled value="__no-options">
                  Brak zastępów w tej drużynie
                </SelectItem>
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
