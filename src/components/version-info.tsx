import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ExternalLink, XCircle } from "lucide-react";
import * as semver from "semver";
import { API_URL } from "@/lib/api";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

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
  // Compare API versions
  const apiComparison = semver.compare(serverApiVersion, clientApiVersion);
  const apiIsCompatible =
    semver.major(serverApiVersion) === semver.major(clientApiVersion);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          Informacje o wersji
          <a
            href={`${API_URL}/schema/swagger-ui/`}
            target="_blank"
            className="text-sm font-normal text-muted-foreground hover:text-foreground flex items-center gap-1"
          >
            <ExternalLink className="h-3 w-3" />
            Dokumentacja API
          </a>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Version Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground">
              Wersja aplikacji
            </h4>
            <Badge variant="outline" className="text-base font-mono">
              v{appVersion}
            </Badge>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground">
              Wersja serwera
            </h4>
            <Badge variant="outline" className="text-base font-mono">
              v{serverVersion}
            </Badge>
          </div>

          <div className="space-y-2">
            <h4 className="font-semibold text-sm text-muted-foreground">
              Wersje API
            </h4>
            <Tooltip>
              <TooltipTrigger>
                <Badge
                  variant="outline"
                  className="text-base font-mono flex items-center gap-1"
                >
                  {!apiIsCompatible ? (
                    <XCircle className="size-4 text-red-500" />
                  ) : (
                    <CheckCircle
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
              </TooltipTrigger>
              <TooltipContent>
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
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
