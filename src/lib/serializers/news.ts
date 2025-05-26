import { Post } from "@/types/news";
import { publicUserSerializer } from "@/lib/serializers/user";

/* eslint-disable @typescript-eslint/no-explicit-any */

export function postSerializer(apiResponse: any): Post | null {
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
