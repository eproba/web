import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { auth, signOut } from "@/auth";
import { LoginRequired } from "@/components/login-required";
import { userSerializer } from "@/lib/serializers/user";
import { API_URL } from "@/lib/api";

export default async function ProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();
  const { id } = await params;
  if (session?.error === "RefreshTokenError") {
    await signOut();
    console.error("Refresh token error");
  }

  const response = await fetch(`${API_URL}/users/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    console.error("Failed to fetch user data");
    return <LoginRequired />;
  }

  const user = userSerializer(await response.json());

  if (!session || !user) {
    return <LoginRequired />;
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
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
