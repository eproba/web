import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { auth, signOut } from "@/auth";
import { LoginRequired } from "@/components/login-required";
import { publicUserSerializer } from "@/lib/serializers/user";
import { API_URL } from "@/lib/api";

const browserImages: { [key: string]: string } = {
  chrome: "/browsers/chrome.png",
  edge: "/browsers/edge.png",
  safari: "/browsers/safari.png",
  "mobile safari": "/browsers/mobile-safari.png",
  opera: "/browsers/opera.png",
  firefox: "/browsers/firefox.png",
  app: "/logo.png",
};

const deviceTypeImages: { [key: string]: string } = {
  mobile: "/device-types/mobile.png",
  desktop: "/device-types/desktop.png",
  tablet: "/device-types/tablet.png",
};

export default async function ProfilePage() {
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

  const user = publicUserSerializer(await response.json());

  if (!session || !user) {
    return <LoginRequired />;
  }

  const renderField = (
    value: string | null | undefined,
    defaultValue: string,
  ) =>
    value ? (
      value
    ) : (
      <span className="text-muted-foreground italic">{defaultValue}</span>
    );

  const handleDeviceAction = async (
    deviceId: string,
    action: "activate" | "delete",
  ) => {
    try {
      const response = await fetch(`/api/fcm/devices/${deviceId}`, {
        method: action === "delete" ? "DELETE" : "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Action failed");
      window.location.reload();
    } catch (error) {
      console.error("Device action error:", error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Public Information */}
      <Card>
        <CardContent>
          <h2 className="text-xl font-semibold mb-4">Informacje publiczne</h2>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Imię</TableCell>
                <TableCell>
                  {renderField(user.firstName, "Nie podano")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Nazwisko</TableCell>
                <TableCell>
                  {renderField(user.lastName, "Nie podano")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Płeć</TableCell>
                <TableCell>
                  {renderField(user.gender.fullName, "Nie podano")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Pseudonim</TableCell>
                <TableCell>
                  {renderField(user.nickname, "Nie podano")}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Stopień</TableCell>
                <TableCell>{user.rank}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Okręg</TableCell>
                <TableCell>{user.patrol}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Funkcja</TableCell>
                <TableCell>{user.function.fullName}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Drużyna</TableCell>
                <TableCell>
                  {user.patrol}
                  {user.function === 4 &&
                    ` - ${user.gender === 0 ? "Drużynowy" : "Drużynowa"}`}
                  {user.function === 3 &&
                    ` - ${user.gender === 0 ? "Przyboczny" : "Przyboczna"}`}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Zastęp</TableCell>
                <TableCell>
                  {renderField(user.patrolName, "Nie przypisano")}
                  {user.function === 2 &&
                    ` - ${user.gender === 0 ? "Zastępowy" : "Zastępowa"}`}
                  {user.function === 1 &&
                    ` - ${user.gender === 0 ? "Podzastępowy" : "Podzastępowa"}`}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/*{allowEdit && (*/}
      {/*  <>*/}
      {/*    /!* Private Information *!/*/}
      {/*    <Card className="p-6">*/}
      {/*      <h2 className="text-xl font-semibold mb-4">Informacje prywatne</h2>*/}
      {/*      <Table>*/}
      {/*        <TableBody>*/}
      {/*          <TableRow>*/}
      {/*            <TableCell className="font-medium">Email</TableCell>*/}
      {/*            <TableCell>{user.email}</TableCell>*/}
      {/*          </TableRow>*/}
      {/*        </TableBody>*/}
      {/*      </Table>*/}
      {/*    </Card>*/}

      {/*    /!* Action Buttons *!/*/}
      {/*    <div className="flex flex-wrap gap-4">*/}
      {/*      <Link href="/profile/edit">*/}
      {/*        <Button>*/}
      {/*          <EditIcon className="mr-2 h-4 w-4" />*/}
      {/*          Edytuj profil*/}
      {/*        </Button>*/}
      {/*      </Link>*/}
      {/*      {user.hasPassword ? (*/}
      {/*        <Link href="/change-password">*/}
      {/*          <Button variant="secondary">*/}
      {/*            <KeyIcon className="mr-2 h-4 w-4" />*/}
      {/*            Zmień hasło*/}
      {/*          </Button>*/}
      {/*        </Link>*/}
      {/*      ) : (*/}
      {/*        <Link href="/set-password">*/}
      {/*          <Button variant="secondary">*/}
      {/*            <KeyIcon className="mr-2 h-4 w-4" />*/}
      {/*            Ustaw hasło*/}
      {/*          </Button>*/}
      {/*        </Link>*/}
      {/*      )}*/}
      {/*      <Link href="/delete-account">*/}
      {/*        <Button variant="destructive">*/}
      {/*          <TrashIcon className="mr-2 h-4 w-4" />*/}
      {/*          Usuń konto*/}
      {/*        </Button>*/}
      {/*      </Link>*/}
      {/*    </div>*/}

      {/*    /!* Notification Devices *!/*/}
      {/*    {devices.length > 0 && (*/}
      {/*      <Card className="p-6">*/}
      {/*        <h2 className="text-xl font-semibold mb-4">Powiadomienia</h2>*/}
      {/*        <div className="flex flex-wrap gap-4">*/}
      {/*          {devices.map((device) => {*/}
      {/*            const deviceInfo = JSON.parse(device.deviceInfo || "{}");*/}
      {/*            const isCurrentDevice = device.registration_id === currentDeviceToken;*/}

      {/*            return (*/}
      {/*              <Card key={device.id} className="w-[240px]">*/}
      {/*                <div className="p-4">*/}
      {/*                  <div className="flex items-center gap-4 mb-4">*/}
      {/*                    <Image*/}
      {/*                      src={browserImages[deviceInfo.browser?.name?.toLowerCase()] || "/logo.png"}*/}
      {/*                      alt={deviceInfo.browser?.name}*/}
      {/*                      width={48}*/}
      {/*                      height={48}*/}
      {/*                      className="rounded"*/}
      {/*                    />*/}
      {/*                    <div>*/}
      {/*                      <p className="font-medium">*/}
      {/*                        {deviceInfo.os?.name} {deviceInfo.os?.version}*/}
      {/*                      </p>*/}
      {/*                      <p className="text-sm text-muted-foreground">*/}
      {/*                        {deviceInfo.browser?.name}*/}
      {/*                      </p>*/}
      {/*                      {isCurrentDevice && <Badge className="mt-1">To urządzenie</Badge>}*/}
      {/*                    </div>*/}
      {/*                  </div>*/}

      {/*                  <div className="space-y-4">*/}
      {/*                    <div className="space-y-2">*/}
      {/*                      <p className="text-sm font-medium">Status:</p>*/}
      {/*                      <Button*/}
      {/*                        variant="outline"*/}
      {/*                        className="w-full"*/}
      {/*                        onClick={() => handleDeviceAction(device.id, "activate")}*/}
      {/*                      >*/}
      {/*                        <BellIcon className="mr-2 h-4 w-4" />*/}
      {/*                        {device.active ? "Włączone" : "Wyłączone"}*/}
      {/*                      </Button>*/}
      {/*                    </div>*/}

      {/*                    <div className="space-y-2">*/}
      {/*                      <p className="text-sm font-medium">Akcje:</p>*/}
      {/*                      <Button*/}
      {/*                        variant="destructive"*/}
      {/*                        className="w-full"*/}
      {/*                        onClick={() => handleDeviceAction(device.id, "delete")}*/}
      {/*                      >*/}
      {/*                        <TrashIcon className="mr-2 h-4 w-4" />*/}
      {/*                        Usuń urządzenie*/}
      {/*                      </Button>*/}
      {/*                    </div>*/}
      {/*                  </div>*/}
      {/*                </div>*/}
      {/*              </Card>*/}
      {/*            );*/}
      {/*          })}*/}
      {/*        </div>*/}
      {/*      </Card>*/}
      {/*    )}*/}
      {/*  </>*/}
      {/*)}*/}
    </div>
  );
}
