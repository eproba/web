import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { API_URL } from "@/lib/api";
import { cn } from "@/lib/utils";
import { CheckCircleIcon, ExternalLinkIcon, XCircleIcon } from "lucide-react";
import * as semver from "semver";

interface VersionInfoProps {
  appVersion: string;
  serverVersion: string;
  serverApiVersion: string;
  clientApiVersion: string;
}

export function VersionInfo({
  appVersion,
  serverVersion,
  serverApiVersion,
  clientApiVersion,
}: VersionInfoProps) {
  const apiComparison = semver.compare(serverApiVersion, clientApiVersion);
  const apiIsCompatible =
    semver.major(serverApiVersion) === semver.major(clientApiVersion);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex flex-wrap items-center gap-2 text-2xl font-bold">
          Informacje o wersji
          <a
            href={`${API_URL}/schema/swagger-ui/`}
            target="_blank"
            className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm font-normal"
          >
            <ExternalLinkIcon className="h-3 w-3" />
            Dokumentacja API
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Version Overview */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <h4 className="text-muted-foreground text-sm font-semibold">
              Wersja aplikacji
            </h4>
            <Badge variant="outline" className="font-mono text-base">
              v{appVersion}
            </Badge>
          </div>

          <div className="space-y-2">
            <h4 className="text-muted-foreground text-sm font-semibold">
              Wersja serwera
            </h4>
            <Badge variant="outline" className="font-mono text-base">
              v{serverVersion}
            </Badge>
          </div>

          <div className="space-y-2">
            <h4 className="text-muted-foreground text-sm font-semibold">
              Wersje API
            </h4>
            <Popover>
              <PopoverTrigger>
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 font-mono text-base"
                >
                  {!apiIsCompatible ? (
                    <XCircleIcon className="size-4 text-red-500" />
                  ) : (
                    <CheckCircleIcon
                      className={cn(
                        "size-4 text-green-500",
                        ...(apiComparison < 0 ? "text-blue-500" : ""),
                      )}
                    />
                  )}
                  {apiComparison < 0 ? (
                    <span>
                      v{serverApiVersion} &lt; v{clientApiVersion}
                    </span>
                  ) : apiComparison > 0 ? (
                    <span>
                      v{serverApiVersion} &gt; v{clientApiVersion}
                    </span>
                  ) : (
                    <>
                      <span>v{serverApiVersion}</span>
                    </>
                  )}
                </Badge>
              </PopoverTrigger>
              <PopoverContent className="text-sm">
                <p>Wersja API klienta: v{clientApiVersion}</p>
                <p>Wersja API serwera: v{serverApiVersion}</p>
                {apiComparison < 0 && (
                  <p className="text-blue-500">
                    Serwer używa starszej wersji API.
                  </p>
                )}
                {apiComparison > 0 && (
                  <p className="text-blue-500">
                    Serwer używa nowszej wersji API.
                  </p>
                )}
                {apiIsCompatible ? (
                  <p className="text-green-500">Wersje API są kompatybilne.</p>
                ) : (
                  <p className="text-red-500">
                    Wersje API nie są kompatybilne!
                  </p>
                )}
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
