import { ApiError } from "@/lib/api";
import Link from "next/link";

export function ToastMsg({
  data,
}: {
  data: {
    title: string;
    description: string | ApiError | Error;
    href?: string;
  };
}) {
  let description: string;
  switch (typeof data.description) {
    case "string":
      description = data.description;
      break;
    case "object":
      if ("status" in data.description && "statusText" in data.description) {
        description = `${data.description.status} ${data.description.statusText}\n${data.description.message}`;
      } else if (data.description.message) {
        description = data.description.message;
      } else {
        description = JSON.stringify(data.description);
      }
      break;
    default:
      description = "Nieznany błąd";
  }
  if (data.href) {
    return {
      title: data.title,
      description: (
        <Link href={data.href} className="whitespace-break-spaces">
          {description}
        </Link>
      ),
    };
  }
  return { title: data.title, description };
}
