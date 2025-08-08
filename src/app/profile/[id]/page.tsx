import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { RequiredFunctionLevel } from "@/lib/const";
import { fetchCurrentUser, fetchUser } from "@/lib/server-api";
import { Organization } from "@/types/team";
import { ListStartIcon, PencilIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { user, error: userError } = await fetchUser(id);
  if (userError) {
    return userError;
  }

  if (!user) {
    notFound();
  }

  const { user: currentUser } = await fetchCurrentUser();

  return (
    <div className="space-y-4">
      <Card className="gap-2">
        <CardHeader>
          <h2 className="text-xl font-semibold">{user.displayName}</h2>
        </CardHeader>
        <CardContent>
          <Table>
            <TableBody className="overflow-x-auto">
              <TableRow>
                <TableCell className="font-medium">Imię</TableCell>
                <TableCell>{user.firstName || "Nie podano"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Nazwisko</TableCell>
                <TableCell>{user.lastName || "Nie podano"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Płeć</TableCell>
                <TableCell>{user.gender?.fullName || "Nie podano"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Pseudonim</TableCell>
                <TableCell>{user.nickname || "Nie podano"}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Stopień</TableCell>
                <TableCell>{user.rank}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Drużyna</TableCell>
                <TableCell>
                  {user.teamName || "Nie przypisano do drużyny"}
                </TableCell>
              </TableRow>
              {user.patrol && (
                <TableRow>
                  <TableCell className="font-medium">Zastęp</TableCell>
                  <TableCell>{user.patrolName}</TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell className="font-medium">Funkcja</TableCell>
                <TableCell>{user.function.fullName}</TableCell>
              </TableRow>
              {user.isStaff && (
                <TableRow>
                  <TableCell className="font-medium">Rola w Epróbie</TableCell>
                  <TableCell>
                    <Badge variant={user.isSuperuser ? "success" : "info"}>
                      {user.isSuperuser ? "Administrator" : "Obsługa"}
                    </Badge>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      {(currentUser?.function.numberValue || 0) >=
        RequiredFunctionLevel.WORKSHEET_MANAGEMENT &&
        currentUser?.team &&
        currentUser?.team === user.team && (
          <Card className="gap-2">
            <CardContent className="flex flex-wrap gap-4">
              {(currentUser?.function.numberValue || 0) >=
                RequiredFunctionLevel.TEAM_MANAGEMENT && (
                <Link href={`/team/?highlightedUserId=${user.id}`}>
                  <Button variant="outline">
                    <PencilIcon />
                    Edytuj harcer
                    {user.organization === Organization.Female ? "kę" : "za"} w
                    drużynie
                  </Button>
                </Link>
              )}
              <Link
                href={`/worksheets/manage?userId=${user.id}&userName=${encodeURIComponent(user.displayName)}`}
              >
                <Button variant="outline">
                  <ListStartIcon />
                  Przejdź do prób
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
    </div>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  const { user, error: userError } = await fetchUser(id);
  if (userError) {
    return { title: "Błąd" };
  }

  if (!user) {
    return { title: "Nie znaleziono użytkownika" };
  }

  return {
    title: `${user.displayName} - Profil użytkownika`,
    description: `Profil użytkownika ${user.displayName} w systemie Epróba.`,
  };
}
