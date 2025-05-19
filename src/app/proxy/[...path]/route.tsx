import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function GET(
  request: Request,
  { params }: { params: { path: string[] } },
) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.redirect("/login");
  }

  const url = new URL(request.url);
  const query = url.search ? url.search + "&embed=true" : "?embed=true";
  const path = (await params).path.join("/");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/${path}/${query}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    },
  );

  if (!response.ok) {
    console.error(response);
    return new NextResponse(response.body, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "text/html",
      },
    });
  }

  let html = await response.text();

  // Update all href="/..." and src="/..." to include /proxy/
  const replacements = [
    [/href="\/(?!proxy\/)/g, 'href="/proxy/'],
    [/href = `\/(?!proxy\/)/g, "href = `/proxy/"],
    [/href='\/(?!proxy\/)/g, "href='/proxy/"],
    [/src="\/(?!proxy\/)/g, 'src="/proxy/'],
    [/fetch\("\/(?!proxy\/)/g, 'fetch("/proxy/'],
    [/fetch\('\/(?!proxy\/)/g, "fetch('/proxy/"],
    [/fetch\(`\/(?!proxy\/)/g, "fetch(`/proxy/"],
  ];

  for (const [pattern, replacement] of replacements) {
    html = html.replaceAll(pattern, replacement as string);
  }

  return new NextResponse(html, {
    headers: {
      "Content-Type": response.headers.get("Content-Type") || "text/html",
    },
  });
}

export async function POST(
  request: Request,
  { params }: { params: { path: string[] } },
) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.redirect("/login");
  }

  const path = (await params).path.join("/");
  const body = await request.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/${path}/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    console.error(response);
    return new NextResponse(response.body, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "text/html",
      },
    });
  }

  return new NextResponse(response.body, {
    headers: {
      "Content-Type": response.headers.get("Content-Type") || "text/html",
    },
  });
}

export async function PATCH(
  request: Request,
  { params }: { params: { path: string[] } },
) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.redirect("/login");
  }

  const path = (await params).path.join("/");
  const body = await request.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/${path}/`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    console.error(response);
    return new NextResponse(response.body, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "text/html",
      },
    });
  }

  return new NextResponse(response.body, {
    headers: {
      "Content-Type": response.headers.get("Content-Type") || "text/html",
    },
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: { path: string[] } },
) {
  const session = await auth();
  if (!session || !session.user) {
    return NextResponse.redirect("/login");
  }

  const path = (await params).path.join("/");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/${path}/`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.accessToken}`,
      },
    },
  );

  if (!response.ok) {
    console.error(response);
    return new NextResponse(response.body, {
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "text/html",
      },
    });
  }

  return new NextResponse(response.body, {
    headers: {
      "Content-Type": response.headers.get("Content-Type") || "text/html",
    },
  });
}
