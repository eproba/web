import { ApiError } from "@/lib/api";
import Link from "next/link";
import { ToastContentProps } from "react-toastify";

export function ToastMsg({
  data,
  closeToast,
}: Partial<ToastContentProps> & {
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
    return (
      <div>
        <Link href={data.href} onClick={closeToast}>
          <p className="font-semibold">{data.title}</p>
          <p className="text-sm whitespace-break-spaces">{description}</p>
        </Link>
      </div>
    );
  }
  return (
    <div>
      <p className="font-semibold">{data.title}</p>
      <p className="text-sm whitespace-break-spaces">{description}</p>
    </div>
  );
}
