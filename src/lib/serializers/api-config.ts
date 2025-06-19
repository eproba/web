import { ApiConfig } from "@/types/api-config";

export interface ApiConfigResponse {
  maintenance_mode: boolean;
  server_version: string;
  api_version: string;
}

export function apiConfigSerializer(apiResponse: ApiConfigResponse): ApiConfig {
  return {
    maintenanceMode: apiResponse.maintenance_mode,
    serverVersion: apiResponse.server_version,
    apiVersion: apiResponse.api_version,
  };
}
