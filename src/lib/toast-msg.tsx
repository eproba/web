import Link from "next/link";
import { ApiError } from "@/lib/api";

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
      if (data.description instanceof ApiError) {
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
    return (
      <Link href={data.href}>
        <p className="font-semibold">{data.title}</p>
        <p className="text-sm">{description}</p>
      </Link>
    );
  }
  return (
    <div>
      <p className="font-semibold">{data.title}</p>
      <p className="text-sm whitespace-break-spaces">{description}</p>
    </div>
  );
}
