import Link from "next/link";
import { ApiError } from "@/lib/api";

export function ToastMsg({
  data,
}: {
  data: {
    title: string;
    description: string | ApiError;
    href?: string;
  };
}) {
  const description = typeof data.description === "string" ? data.description : `${data.description.status} ${data.description.statusText}\n${data.description.message}`;
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
