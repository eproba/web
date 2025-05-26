import { PublicUser } from "@/types/user";

export interface Post {
  id?: string;
  title: string;
  slug: string;
  author: PublicUser;
  createdOn: string;
  updatedOn: string;
  status: "draft" | "published" | "archived";
  content: string;
  minFunction: number;
  authorizedOnly: boolean;
  pinned: boolean;
  priority: number;
  hidden: boolean;
}
