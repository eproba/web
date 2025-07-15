import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { fetchUser } from "@/lib/server-api";
import type { Metadata } from "next";
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

  return (
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
