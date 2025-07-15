import { ApiUserResponse, publicUserSerializer } from "@/lib/serializers/user";
import { Post } from "@/types/news";

export interface ApiPostResponse {
  id: string;
  author: ApiUserResponse;
  title: string;
  slug: string;
  created_on: string;
  updated_on: string;
  status: "draft" | "published" | "archived";
  content: string;
  minimum_function: number;
  authorized_only: boolean;
  pinned: boolean;
  priority: number;
  hidden: boolean;
}

export function postSerializer(apiResponse: ApiPostResponse): Post | null {
  return {
    id: apiResponse.id,
    author: publicUserSerializer(apiResponse.author),
    title: apiResponse.title,
    slug: apiResponse.slug,
    createdOn: apiResponse.created_on,
    updatedOn: apiResponse.updated_on,
    status: apiResponse.status,
    content: apiResponse.content,
    minFunction: apiResponse.minimum_function,
    authorizedOnly: apiResponse.authorized_only,
    pinned: apiResponse.pinned,
    priority: apiResponse.priority,
    hidden: apiResponse.hidden,
  };
}
