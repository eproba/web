import { PasswordChangeDialog } from "@/components/profile/password-change-dialog";
import { PatrolSelectDialog } from "@/components/profile/patrol-select-dialog";
import { ResendVerificationEmailButton } from "@/components/profile/resend-verification-email-button";
import { UserDeactivateDialog } from "@/components/profile/user-deactivate-dialog";
import { UserDeleteDialog } from "@/components/profile/user-delete-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchCurrentUser } from "@/lib/server-api";
import {
  ConstructionIcon,
  KeyRoundIcon,
  MailIcon,
  MailWarningIcon,
  ReplaceIcon,
  UserMinusIcon,
  UserXIcon,
  UsersIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

import { ProfileEditForm } from "./profile-edit-form";
import { ProfileNotificationsTab } from "./profile-notifications-tab";

export const metadata: Metadata = {
  title: "Twój profil",
};

export default async function UserProfilePage() {
  const { user, error: userError } = await fetchCurrentUser();
  if (userError) {
    return userError;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Tabs
      defaultValue="profile"
      orientation="vertical"
      className="flex lg:flex-row"
    >
      <div className="flex h-full justify-center lg:justify-start">
        <TabsList className="flex h-full flex-wrap lg:w-64 lg:flex-col">
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
            className="hidden w-full text-wrap sm:flex sm:justify-start"
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
          <CardContent className="flex flex-row flex-wrap gap-2">
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
                  <UsersIcon size={20} />
                  Znajdź swoją drużynę
                </Button>
              )}
            </PatrolSelectDialog>
            <UserDeactivateDialog user={user}>
              <Button variant="destructive">
                <UserMinusIcon size={20} />
                Deaktywuj konto
              </Button>
            </UserDeactivateDialog>
            <UserDeleteDialog user={user}>
              <Button variant="destructive">
                <UserXIcon size={20} />
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
            <div className="block w-full sm:table">
              <div className="sm:table-header-group">
                <div className="hidden sm:table-row"></div>
              </div>
              <div className="sm:table-row-group">
                <div className="block border-b py-2 last:border-b-0 sm:table-row sm:py-0">
                  <div className="block px-4 py-2 font-medium sm:table-cell sm:py-4">
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
                  <div className="block px-4 py-2 sm:table-cell sm:py-4 sm:text-right">
                    <Badge variant="success">Aktywne</Badge>
                  </div>
                </div>

                <div className="block border-b py-2 last:border-b-0 sm:table-row sm:py-0">
                  <div className="block px-4 py-2 font-medium sm:table-cell sm:py-4">
                    <div className="flex items-center gap-2">
                      <ConstructionIcon size={20} />
                      Logowanie z cz!appka
                    </div>
                  </div>
                  <div className="block px-4 py-2 sm:table-cell sm:py-4 sm:text-right">
                    <Badge variant="info">Wkrótce</Badge>
                  </div>
                </div>

                <div className="block border-b py-2 last:border-b-0 sm:table-row sm:py-0">
                  <div className="block px-4 py-2 font-medium sm:table-cell sm:py-4">
                    <div className="flex items-center gap-2">
                      {user.emailVerified ||
                      user.email.endsWith("@eproba.zhr.pl") ? (
                        <MailIcon size={20} />
                      ) : (
                        <MailWarningIcon size={20} />
                      )}
                      Email ({user.email})
                    </div>
                  </div>
                  <div className="block px-4 py-2 sm:table-cell sm:py-4 sm:text-right">
                    {user.emailVerified ? (
                      <Badge variant="success">Zweryfikowany</Badge>
                    ) : user.email.endsWith("@eproba.zhr.pl") ? (
                      <Badge variant="info">Wewnętrzny (@eproba.zhr.pl)</Badge>
                    ) : (
                      <div className="flex items-center gap-2 sm:justify-end">
                        <Badge variant="warning">Niezweryfikowany</Badge>
                        <ResendVerificationEmailButton />
                      </div>
                    )}
                  </div>
                </div>

                <div className="block border-b py-2 last:border-b-0 sm:table-row sm:py-0">
                  <div className="block px-4 py-2 font-medium sm:table-cell sm:py-4">
                    <div className="flex items-center gap-2">
                      <KeyRoundIcon size={20} />
                      Hasło
                    </div>
                  </div>
                  <div className="block px-4 py-2 sm:table-cell sm:py-4 sm:text-right">
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
            <div className="block w-full sm:table">
              <div className="sm:table-header-group">
                <div className="hidden sm:table-row"></div>
              </div>
              <div className="sm:table-row-group">
                <div className="block border-b py-2 last:border-b-0 sm:table-row sm:py-0">
                  <div className="block px-4 py-2 font-medium sm:table-cell sm:py-4">
                    <div className="flex items-center gap-2">
                      <ConstructionIcon size={20} />
                      Synchronizacja z cz!appka
                    </div>
                  </div>
                  <div className="block px-4 py-2 sm:table-cell sm:py-4 sm:text-right">
                    <Badge variant="info">Wkrótce</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="notifications" className="flex flex-col gap-2">
        <ProfileNotificationsTab user={user} />
      </TabsContent>
    </Tabs>
  );
}
