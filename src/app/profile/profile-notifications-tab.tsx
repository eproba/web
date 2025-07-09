"use client";
import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useApi } from "@/lib/api-client";
import { ToastMsg } from "@/lib/toast-msg";
import {
  BellIcon,
  BellOffIcon,
  LaptopIcon,
  MailIcon,
  MonitorIcon,
  SmartphoneIcon,
  TabletIcon,
  TrashIcon,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Toggle } from "@/components/ui/toggle";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { User } from "@/types/user";
import { getExistingToken } from "@/lib/firebase";

type DeviceInfo = {
  os?: { name: string; version: string };
  device?: { type: string; vendor: string; model: string };
  browser?: { name: string; version: string; major?: number; type?: string };
};

type Device = {
  id: number;
  name: string;
  registration_id: string;
  device_id: string | null;
  active: boolean;
  date_created: string;
  type: string;
};

export function ProfileNotificationsTab({ user }: { user: User }) {
  const [devices, setDevices] = useState<Device[]>([]);
  // const [emailNotifications, setEmailNotifications] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [currentDeviceToken, setCurrentDeviceToken] = useState<string | null>(
    null,
  );
  const [emailNotifications, setEmailNotifications] = useState<boolean>(
    user.emailNotifications,
  );
  const { apiClient } = useApi();

  const fetchDevices = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiClient("/fcm/devices/", {
        method: "GET",
      });
      const data = await response.json();
      setDevices(data);
    } catch (error) {
      toast.error(
        ToastMsg({
          data: {
            title: "Nie udało się pobrać urządzeń",
            description: error as Error,
          },
        }),
      );
    } finally {
      setIsLoading(false);
    }
  }, [apiClient]);

  useEffect(() => {
    fetchDevices();
    getExistingToken().then((token) => {
      setCurrentDeviceToken(token);
    });
  }, [fetchDevices]);

  const handleDeviceAction = async (
    registrationId: string,
    action: "activate" | "delete",
  ) => {
    try {
      if (action === "activate") {
        const deviceToUpdate = devices.find(
          (d) => d.registration_id === registrationId,
        );
        await apiClient(`/fcm/devices/${registrationId}/`, {
          method: "PATCH",
          body: JSON.stringify({ active: !deviceToUpdate?.active }),
        });
        toast.success("Zaktualizowano ustawienia urządzenia");
      } else {
        await apiClient(`/fcm/devices/${registrationId}/`, {
          method: "DELETE",
        });
        toast.success("Urządzenie zostało usunięte");
      }
      fetchDevices();
    } catch (error) {
      toast.error(
        ToastMsg({
          data: {
            title: "Nie udało się wykonać operacji",
            description: error as Error,
          },
        }),
      );
    }
  };

  const handleEmailNotificationsToggle = async (enabled: boolean) => {
    try {
      await apiClient(`/user/`, {
        method: "PATCH",
        body: JSON.stringify({ email_notifications: enabled }),
      });
      setEmailNotifications(enabled);
      toast.success(
        `Powiadomienia e-mail zostały ${enabled ? "włączone" : "wyłączone"}`,
      );
    } catch (error) {
      toast.error(
        ToastMsg({
          data: {
            title: "Nie udało się zaktualizować powiadomień e-mail",
            description: error as Error,
          },
        }),
      );
    }
  };

  const getDeviceIcon = (deviceType: string, deviceInfo: DeviceInfo) => {
    switch (deviceType) {
      case "android":
      case "ios":
        return <SmartphoneIcon className="size-8" />;
      case "web":
        if (deviceInfo.device?.type === "tablet") {
          return <TabletIcon className="size-8" />;
        }
        return deviceInfo.device?.type === "mobile" ? (
          <SmartphoneIcon className="size-8" />
        ) : (
          <LaptopIcon className="size-8" />
        );
      default:
        return <MonitorIcon className="size-8" />;
    }
  };

  const parseDeviceInfo = (deviceInfoStr: string): DeviceInfo => {
    try {
      return JSON.parse(deviceInfoStr) as DeviceInfo;
    } catch (e) {
      console.error("Failed to parse device info:", e);
      return {};
    }
  };

  const formatDeviceName = (device: Device) => {
    const deviceInfo = parseDeviceInfo(device.name);

    if (deviceInfo.browser?.name === "app") {
      return `Aplikacja Epróba ${deviceInfo.device?.model || ""}`;
    }

    const os = deviceInfo.os?.name ? `${deviceInfo.os.name}` : "";
    const browser = deviceInfo.browser?.name || deviceInfo.browser || "";
    const deviceModel = deviceInfo.device?.model
      ? `${deviceInfo.device.vendor || ""} ${deviceInfo.device.model}`.trim()
      : "";

    return [deviceModel, os, browser].filter(Boolean).join(" • ");
  };

  const isCurrentDevice = (device: Device) => {
    return currentDeviceToken && device.registration_id === currentDeviceToken;
  };

  return (
    <>
      <Card className="gap-2">
        <CardHeader>
          <h2 className="text-xl font-semibold">Powiadomienia</h2>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-4 flex flex-row justify-between gap-4">
            <div className="flex items-center gap-3">
              <MailIcon className="size-8" />
              <div>
                <p className="font-medium">Powiadomienia e-mail</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Switch
                checked={emailNotifications}
                onCheckedChange={(checked) =>
                  handleEmailNotificationsToggle(checked)
                }
                aria-label={`${emailNotifications ? "Wyłącz" : "Włącz"} powiadomienia e-mail`}
              />
            </div>
          </div>

          <h5 className="text-sm font-medium my-4">Urządzenia</h5>

          {devices.length > 0 ? (
            <div className="space-y-4">
              {devices.map((device) => {
                const deviceInfo = parseDeviceInfo(device.name);

                return (
                  <div
                    key={device.id}
                    className="border rounded-lg p-4 flex flex-col sm:flex-row justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      {getDeviceIcon(device.type, deviceInfo)}
                      <div>
                        <p className="font-medium">
                          {formatDeviceName(device)}
                        </p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">
                            {new Date(device.date_created).toLocaleDateString()}
                          </p>
                          {isCurrentDevice(device) && (
                            <Badge variant="info" className="text-xs">
                              To urządzenie
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 justify-end">
                      <Toggle
                        pressed={device.active}
                        onPressedChange={() =>
                          handleDeviceAction(device.registration_id, "activate")
                        }
                        aria-label={
                          device.active
                            ? "Wyłącz powiadomienia"
                            : "Włącz powiadomienia"
                        }
                      >
                        {device.active ? (
                          <BellIcon size={18} />
                        ) : (
                          <BellOffIcon size={18} />
                        )}
                      </Toggle>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() =>
                          handleDeviceAction(device.registration_id, "delete")
                        }
                        title="Usuń urządzenie"
                      >
                        <TrashIcon size={18} />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : isLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="border rounded-lg p-4 flex flex-col sm:flex-row justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-8" />
                    <div>
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-24 mt-2" />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-9 w-9 rounded-md" />
                    <Skeleton className="h-9 w-9 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Brak zarejestrowanych urządzeń</p>
          )}
        </CardContent>
      </Card>
    </>
  );
}
