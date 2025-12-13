import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { API_URL, INTERNAL_API_URL } from "@/lib/api";
import { handleError } from "@/lib/error-alert-handler";
import {
  ApiConfigResponse,
  apiConfigSerializer,
} from "@/lib/serializers/api-config";
import { ApiPostResponse, postSerializer } from "@/lib/serializers/news";
import { ApiTeamResponse, teamSerializer } from "@/lib/serializers/team";
import {
  ApiTeamRequestResponse,
  teamRequestSerializer,
} from "@/lib/serializers/team-request";
import {
  ApiTeamStatisticsResponse,
  teamStatisticsSerializer,
} from "@/lib/serializers/team-statistics";
import {
  ApiTemplateWorksheetResponse,
  templateSerializer,
} from "@/lib/serializers/templates";
import {
  ApiUserResponse,
  publicUserSerializer,
  userSerializer,
} from "@/lib/serializers/user";
import {
  ApiWorksheetResponse,
  worksheetSerializer,
} from "@/lib/serializers/worksheet";
import { ApiConfig } from "@/types/api-config";
import { Post } from "@/types/news";
import { Team } from "@/types/team";
import { TeamRequest } from "@/types/team-request";
import { TeamStatistics } from "@/types/team-statistics";
import { TemplateWorksheet } from "@/types/template";
import { PublicUser, User } from "@/types/user";
import { Worksheet } from "@/types/worksheet";
import { JSX } from "react";

/**
 * Server-side API service for making authenticated requests with automatic serialization
 * and error handling. All functions return either serialized data or error components.
 */

interface ApiOptions {
  method?: string;
  body?: unknown;
  headers?: Record<string, string>;
  allowUnauthorized?: boolean;
}

/**
 * Base API fetch function with automatic authentication
 */
async function apiRequest<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<{ data?: T; error?: JSX.Element }> {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    const accessToken = (session?.session)?.accessToken;
    if (
      (!session || !session.user || !accessToken) &&
      !options.allowUnauthorized
    ) {
      return {
        error: await handleError(
          new Response(null, {
            status: 401,
            statusText: "Unauthorized",
          }),
        ),
      };
    }

    const response = await fetch(`${INTERNAL_API_URL || API_URL}${endpoint}`, {
      method: options.method || "GET",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken
          ? { Authorization: `Bearer ${accessToken}` }
          : {}),
        ...options.headers,
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      return { error: await handleError(response) };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error("API request failed:", error);
    return {
      error: await handleError(
        new Response(null, {
          status: 500,
          statusText: "Internal Server Error",
        }),
      ),
    };
  }
}

// ===================================================================
// USER MANAGEMENT
// ===================================================================

/**
 * Fetch current user data
 */
export async function fetchCurrentUser(): Promise<{
  user?: User;
  error?: JSX.Element;
}> {
  const result = await apiRequest<ApiUserResponse>("/user/");

  if (result.error) {
    return { error: result.error };
  }

  const user = userSerializer(result.data!);
  return { user };
}

/**
 * Fetch public user data by user ID
 */
export async function fetchUser(userId: string): Promise<{
  user?: PublicUser;
  error?: JSX.Element;
}> {
  const result = await apiRequest<ApiUserResponse>(`/users/${userId}/`);

  if (result.error) {
    return { error: result.error };
  }

  const user = publicUserSerializer(result.data!);
  return { user };
}

/**
 * Fetch users by team ID
 */
export async function fetchUsersByTeamId(teamId: string): Promise<{
  users?: PublicUser[] | User[];
  error?: JSX.Element;
}> {
  const result = await apiRequest<ApiUserResponse[]>(`/users/?team=${teamId}`);

  if (result.error) {
    return { error: result.error };
  }

  const users = result.data!.map(userSerializer);
  if (users.some((user) => user.email)) {
    // If any user has an email, return full User objects
    return { users: users as User[] };
  }
  return { users: users as PublicUser[] };
}

// ===================================================================
// WORKSHEET MANAGEMENT
// ===================================================================

/**
 * Fetch all worksheets (for management/admin)
 */
export async function fetchWorksheets(): Promise<{
  worksheets?: Worksheet[];
  error?: JSX.Element;
}> {
  const result = await apiRequest<ApiWorksheetResponse[]>("/worksheets/");

  if (result.error) {
    return { error: result.error };
  }

  const worksheets = result.data!.reduce(
    (acc: Worksheet[], worksheet: ApiWorksheetResponse) => {
      const serializedWorksheet = worksheetSerializer(worksheet);
      if (serializedWorksheet) {
        acc.push(serializedWorksheet);
      }
      return acc;
    },
    [],
  ) as Worksheet[];

  return { worksheets };
}

/**
 * Fetch user's worksheets
 */
export async function fetchUserWorksheets(): Promise<{
  worksheets?: Worksheet[];
  error?: JSX.Element;
}> {
  const result = await apiRequest<ApiWorksheetResponse[]>("/worksheets/?user");

  if (result.error) {
    return { error: result.error };
  }

  const worksheets = result.data!.reduce(
    (acc: Worksheet[], worksheet: ApiWorksheetResponse) => {
      const serializedWorksheet = worksheetSerializer(worksheet);
      if (serializedWorksheet) {
        acc.push(serializedWorksheet);
      }
      return acc;
    },
    [],
  ) as Worksheet[];

  return { worksheets };
}

/**
 * Fetch archived worksheets
 */
export async function fetchArchivedWorksheets(): Promise<{
  worksheets?: Worksheet[];
  error?: JSX.Element;
}> {
  const result = await apiRequest<ApiWorksheetResponse[]>(
    "/worksheets/?archived",
  );

  if (result.error) {
    return { error: result.error };
  }

  const worksheets = result.data!.reduce(
    (acc: Worksheet[], worksheet: ApiWorksheetResponse) => {
      const serializedWorksheet = worksheetSerializer(worksheet);
      if (serializedWorksheet) {
        acc.push(serializedWorksheet);
      }
      return acc;
    },
    [],
  ) as Worksheet[];

  return { worksheets };
}

/**
 * Fetch worksheets for review
 */
export async function fetchReviewWorksheets(): Promise<{
  worksheets?: Worksheet[];
  error?: JSX.Element;
}> {
  const result = await apiRequest<ApiWorksheetResponse[]>(
    "/worksheets/?review",
  );

  if (result.error) {
    return { error: result.error };
  }

  const worksheets = result.data!.reduce(
    (acc: Worksheet[], worksheet: ApiWorksheetResponse) => {
      const serializedWorksheet = worksheetSerializer(worksheet);
      if (serializedWorksheet) {
        acc.push(serializedWorksheet);
      }
      return acc;
    },
    [],
  ) as Worksheet[];

  return { worksheets };
}

/**
 * Fetch specific worksheet by ID
 */
export async function fetchWorksheet(
  worksheetId: string,
): Promise<{ worksheet?: Worksheet; error?: JSX.Element }> {
  const result = await apiRequest<ApiWorksheetResponse>(
    `/worksheets/${worksheetId}`,
  );

  if (result.error) {
    return { error: result.error };
  }

  const worksheet = worksheetSerializer(result.data!);
  if (!worksheet) {
    return {
      error: await handleError(
        new Response(null, {
          status: 404,
          statusText: "Worksheet not found",
        }),
      ),
    };
  }

  return { worksheet };
}

// ===================================================================
// TEMPLATE MANAGEMENT
// ===================================================================

/**
 * Fetch templates
 */
export async function fetchTemplates(): Promise<{
  templates?: TemplateWorksheet[];
  error?: JSX.Element;
}> {
  const result =
    await apiRequest<ApiTemplateWorksheetResponse[]>("/templates/");

  if (result.error) {
    return { error: result.error };
  }

  const templates = result.data!.reduce(
    (acc: TemplateWorksheet[], template: ApiTemplateWorksheetResponse) => {
      const serializedTemplate = templateSerializer(template);
      if (serializedTemplate) {
        acc.push(serializedTemplate);
      }
      return acc;
    },
    [],
  ) as TemplateWorksheet[];

  return { templates };
}

/**
 * Fetch a specific template by ID
 */
export async function fetchTemplate(templateId: string): Promise<{
  template?: TemplateWorksheet;
  error?: JSX.Element;
}> {
  const result = await apiRequest<ApiTemplateWorksheetResponse>(
    `/templates/${templateId}/`,
  );

  if (result.error) {
    return { error: result.error };
  }

  const template = templateSerializer(result.data!);
  if (!template) {
    return {
      error: await handleError(
        new Response(null, {
          status: 404,
          statusText: "Template not found",
        }),
      ),
    };
  }

  return { template };
}

// ===================================================================
// TEAM MANAGEMENT
// ===================================================================

/**
 * Fetch user teams
 */
export async function fetchUserTeam(): Promise<{
  team?: Team;
  error?: JSX.Element;
}> {
  const result = await apiRequest<ApiTeamResponse[]>("/teams/?user");

  if (result.error) {
    return { error: result.error };
  }

  const teams = result.data!.map(teamSerializer) as Team[];
  if (teams.length === 0) {
    return {
      error: await handleError(
        new Response(null, {
          status: 404,
          statusText: "No teams found for user",
        }),
      ),
    };
  }
  return { team: teams[0] };
}

/**
 * Fetch specific team by ID
 */
export async function fetchTeam(
  teamId: string,
): Promise<{ team?: Team; error?: JSX.Element }> {
  const result = await apiRequest<ApiTeamResponse>(`/teams/${teamId}/`);

  if (result.error) {
    return { error: result.error };
  }

  const team = teamSerializer(result.data!);
  return { team };
}

// ===================================================================
// NEWS MANAGEMENT
// ===================================================================

/**
 * Fetch all published news posts
 */
export async function fetchNews(): Promise<{
  posts?: Post[];
  error?: JSX.Element;
}> {
  const result = await apiRequest<ApiPostResponse[]>("/news/", {
    allowUnauthorized: true,
  });

  if (result.error) {
    return { error: result.error };
  }

  const posts = result.data!.reduce((acc: Post[], post: ApiPostResponse) => {
    const serializedPost = postSerializer(post);
    if (serializedPost) {
      acc.push(serializedPost);
    }
    return acc;
  }, []) as Post[];

  return { posts };
}

/**
 * Fetch a specific news post by slug
 */
export async function fetchNewsPost(slug: string): Promise<{
  post?: Post;
  error?: JSX.Element;
}> {
  const result = await apiRequest<ApiPostResponse>(`/news/${slug}/`, {
    allowUnauthorized: true,
  });

  if (result.error) {
    return { error: result.error };
  }

  const post = postSerializer(result.data!);
  if (!post) {
    return {
      error: await handleError(
        new Response(null, {
          status: 404,
          statusText: "News post not found",
        }),
      ),
    };
  }

  return { post };
}

// ===================================================================
// UTILITY FUNCTIONS
// ===================================================================

/**
 * Fetch api config
 */
export async function fetchApiConfig(): Promise<{
  config?: ApiConfig;
  error?: JSX.Element;
}> {
  const result = await apiRequest<ApiConfigResponse>("/config/", {
    allowUnauthorized: true,
  });

  if (result.error) {
    return { error: result.error };
  }

  const config = apiConfigSerializer(result.data!);
  if (!config) {
    return {
      error: await handleError(
        new Response(null, {
          status: 500,
          statusText: "Failed to fetch API config",
        }),
      ),
    };
  }

  return { config };
}

/**
 * Generic API request function for custom endpoints.
 * Use this when you need to make requests that aren't covered by the specific functions above
 */
export async function makeAuthenticatedRequest<T>(
  endpoint: string,
  options: ApiOptions = {},
): Promise<{ data?: T; error?: JSX.Element }> {
  return apiRequest<T>(endpoint, options);
}

/**
 * Verify email with token
 */
export async function verifyEmail(
  userId: string,
  token: string,
): Promise<{ data?: { message: string }; error?: JSX.Element }> {
  return apiRequest<{ message: string }>("/user/verify-email/", {
    method: "POST",
    body: {
      user_id: userId,
      token: token,
    },
    allowUnauthorized: true,
  });
}

/**
 * Fetch team statistics
 */
export async function fetchTeamStatistics(): Promise<{
  data?: TeamStatistics;
  error?: JSX.Element;
}> {
  const result =
    await apiRequest<ApiTeamStatisticsResponse>("/team-statistics/");

  if (result.error) {
    return { error: result.error };
  }

  if (result.data) {
    return {
      data: teamStatisticsSerializer(result.data),
    };
  }

  return { data: undefined };
}

/**
 * ===================================================================
 * TEAM REQUESTS MANAGEMENT
 * ===================================================================
 */

/**
 * Fetch team requests
 */
export async function fetchTeamRequests(
  endpoint: string = "/team-requests/",
): Promise<{
  data?: TeamRequest[];
  error?: JSX.Element;
}> {
  const result = await apiRequest<ApiTeamRequestResponse[]>(endpoint);

  if (result.error) {
    return { error: result.error };
  }

  if (result.data) {
    return {
      data: result.data.map(teamRequestSerializer),
    };
  }

  return { data: [] };
}
