import Link from "next/link";

export function ToastMsg({
  data,
}: {
  data: {
    title: string;
    description: string;
    href?: string;
  };
}) {
  if (data.href) {
    return (
      <Link href={data.href}>
        <p className="font-semibold">{data.title}</p>
        <p className="text-sm">{data.description}</p>
      </Link>
    );
  }
  return (
    <div>
      <p className="font-semibold">{data.title}</p>
      <p className="text-sm">{data.description}</p>
    </div>
  );
}
