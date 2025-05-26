import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { auth, signOut } from "@/auth";
import { LoginRequired } from "@/components/login-required";
import { userSerializer } from "@/lib/serializers/user";
import { API_URL } from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileEditForm } from "./profile-edit-form";
import {
  ConstructionIcon,
  KeyRoundIcon,
  MailIcon,
  MailWarningIcon,
  ReplaceIcon,
  UserRoundMinusIcon,
  UserRoundXIcon,
  UsersRoundIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PatrolSelectDialog } from "@/components/patrol-select-dialog";
import { UserDeleteDialog } from "@/components/user-delete-dialog";
import { UserDeactivateDialog } from "@/components/user-deactivate-dialog";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { PasswordChangeDialog } from "@/components/password-change-dialog";
import { ResendVerificationEmailButton } from "@/components/resend-verification-email-button";
import { ProfileNotificationsTab } from "./profile-notifications-tab";

export default async function UserProfilePage() {
  const session = await auth();
  if (session?.error === "RefreshTokenError") {
    await signOut();
    console.error("Refresh token error");
  }

  const response = await fetch(`${API_URL}/user/`, {
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
    <Tabs
      defaultValue="profile"
      orientation="vertical"
      className="flex lg:flex-row"
    >
      <div className="flex justify-center lg:justify-start h-full">
        <TabsList className="flex lg:flex-col h-full lg:w-64 flex-wrap">
          <TabsTrigger
            value="profile"
            className="w-full text-wrap sm:justify-start"
          >
            Profil
          </TabsTrigger>
          <TabsTrigger
            value="edit"
            className="w-full text-wrap sm:justify-start"
          >
            Edytuj
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="w-full text-wrap hidden sm:flex sm:justify-start"
          >
            Bezpieczeństwo i synchronizacja
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="w-full text-wrap sm:hidden sm:justify-start"
          >
            Bezpieczeństwo
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="w-full text-wrap sm:justify-start"
          >
            Powiadomienia
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="profile">
        <Card className="gap-2">
          <CardHeader>
            <h2 className="text-xl font-semibold">Profil</h2>
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
                  <TableCell className="font-medium">Email</TableCell>
                  <TableCell>{user.email}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Stopień</TableCell>
                  <TableCell>{user.rank}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Drużyna</TableCell>
                  <TableCell>
                    {user.teamName || "Nie jesteś przypisany do drużyny"}
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
                    <TableCell className="font-medium">
                      Rola w Epróbie
                    </TableCell>
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
      </TabsContent>

      <TabsContent value="edit" className="flex flex-col gap-2">
        <Card className="gap-2">
          <CardHeader>
            <h2 className="text-xl font-semibold">Edytuj profil</h2>
          </CardHeader>
          <CardContent>
            <ProfileEditForm user={user} />
          </CardContent>
        </Card>
        <Card className="gap-2">
          <CardHeader>
            <h2 className="text-xl font-semibold">Akcje</h2>
          </CardHeader>
          <CardContent className="flex flex-row gap-2 flex-wrap">
            <PatrolSelectDialog
              userGender={user.gender}
              variant={user.patrol ? "change" : "set"}
            >
              {user.patrol ? (
                <Button variant="warning" className="">
                  <ReplaceIcon size={20} />
                  Zmień drużynę
                </Button>
              ) : (
                <Button variant="outline">
                  <UsersRoundIcon size={20} />
                  Znajdź swoją drużynę
                </Button>
              )}
            </PatrolSelectDialog>
            <UserDeactivateDialog user={user}>
              <Button variant="destructive">
                <UserRoundMinusIcon size={20} />
                Deaktywuj konto
              </Button>
            </UserDeactivateDialog>
            <UserDeleteDialog user={user}>
              <Button variant="destructive">
                <UserRoundXIcon size={20} />
                Usuń konto
              </Button>
            </UserDeleteDialog>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="security" className="flex flex-col gap-2">
        <Card className="gap-2">
          <CardHeader>
            <h2 className="text-xl font-semibold">Bezpieczeństwo</h2>
          </CardHeader>
          <CardContent>
            <div className="block sm:table w-full">
              <div className="sm:table-header-group">
                <div className="hidden sm:table-row"></div>
              </div>
              <div className="sm:table-row-group">
                <div className="block sm:table-row border-b last:border-b-0 py-2 sm:py-0">
                  <div className="block sm:table-cell px-4 py-2 sm:py-4 font-medium">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/google-icon.svg"
                        alt="Logowanie z Google"
                        width={20}
                        height={20}
                      />
                      Logowanie z Google
                    </div>
                  </div>
                  <div className="block sm:table-cell px-4 py-2 sm:py-4 sm:text-right">
                    <Badge variant="success">Aktywne</Badge>
                  </div>
                </div>

                <div className="block sm:table-row border-b last:border-b-0 py-2 sm:py-0">
                  <div className="block sm:table-cell px-4 py-2 sm:py-4 font-medium">
                    <div className="flex items-center gap-2">
                      <ConstructionIcon size={20} />
                      Logowanie z cz!appka
                    </div>
                  </div>
                  <div className="block sm:table-cell px-4 py-2 sm:py-4 sm:text-right">
                    <Badge variant="info">Wkrótce</Badge>
                  </div>
                </div>

                <div className="block sm:table-row border-b last:border-b-0 py-2 sm:py-0">
                  <div className="block sm:table-cell px-4 py-2 sm:py-4 font-medium">
                    <div className="flex items-center gap-2">
                      {user.emailVerified ? (
                        <MailIcon size={20} />
                      ) : (
                        <MailWarningIcon size={20} />
                      )}
                      Email ({user.email})
                    </div>
                  </div>
                  <div className="block sm:table-cell px-4 py-2 sm:py-4 sm:text-right">
                    {user.emailVerified ? (
                      <Badge variant="success">Zweryfikowany</Badge>
                    ) : (
                      <div className="flex items-center gap-2 sm:justify-end">
                        <Badge variant="warning">Niezweryfikowany</Badge>
                        <ResendVerificationEmailButton />
                      </div>
                    )}
                  </div>
                </div>

                <div className="block sm:table-row border-b last:border-b-0 py-2 sm:py-0">
                  <div className="block sm:table-cell px-4 py-2 sm:py-4 font-medium">
                    <div className="flex items-center gap-2">
                      <KeyRoundIcon size={20} />
                      Hasło
                    </div>
                  </div>
                  <div className="block sm:table-cell px-4 py-2 sm:py-4 sm:text-right">
                    <PasswordChangeDialog
                      variant={user.hasPassword ? "change" : "set"}
                    >
                      {user.hasPassword ? (
                        <Button variant="outline" size="sm">
                          Zmień hasło
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm">
                          Ustaw hasło
                        </Button>
                      )}
                    </PasswordChangeDialog>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="gap-2">
          <CardHeader>
            <h2 className="text-xl font-semibold">Synchronizacja</h2>
          </CardHeader>
          <CardContent>
            <div className="block sm:table w-full">
              <div className="sm:table-header-group">
                <div className="hidden sm:table-row"></div>
              </div>
              <div className="sm:table-row-group">
                <div className="block sm:table-row border-b last:border-b-0 py-2 sm:py-0">
                  <div className="block sm:table-cell px-4 py-2 sm:py-4 font-medium">
                    <div className="flex items-center gap-2">
                      <ConstructionIcon size={20} />
                      Synchronizacja z cz!appka
                    </div>
                  </div>
                  <div className="block sm:table-cell px-4 py-2 sm:py-4 sm:text-right">
                    <Badge variant="info">Wkrótce</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notifications" className="flex flex-col gap-2">
        <ProfileNotificationsTab />
      </TabsContent>
    </Tabs>
  );
}
