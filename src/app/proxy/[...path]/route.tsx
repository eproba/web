import { NextResponse } from "next/server";
import { auth } from "@/auth";

function handleRedirect(response: Response, request: Request) {
  const location = response.headers.get("Location");
  if (!location) return null;

  // Create a full URL for relative redirects
  const isAbsoluteUrl = location.startsWith("http");
  const baseUrl = isAbsoluteUrl
    ? location
    : `${process.env.INTERNAL_SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL}${location.startsWith("/") ? location : "/" + location}`;
  const redirectUrl = new URL(baseUrl);

  // Add embed=true parameter if needed
  if (!redirectUrl.searchParams.has("embed")) {
    redirectUrl.searchParams.append("embed", "true");
  }

  // Update Location to include /proxy/ prefix for internal URLs
  let finalLocation = redirectUrl.toString();
  if (location.startsWith("/") && !location.startsWith("/proxy/")) {
    const relativePath = `/proxy${location.startsWith("/") ? location : "/" + location}`;

    const origin = request.headers.get("host") || "";
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    finalLocation = `${protocol}://${origin}${relativePath}`;
  }

  const redirectResponse = NextResponse.redirect(
    finalLocation,
    response.status,
  );

  // Copy cookies from original response
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") {
      redirectResponse.headers.append("Set-Cookie", value);
    }
  });

  return redirectResponse;
}

function modifyResponseContent(responseText: string) {
  let modified = responseText.replace(
    /<form([^>]*)action="\/([^"]*)"([^>]*)>/g,
    '<form$1action="/proxy/$2"$3>',
  );

  const replacements: [RegExp, string][] = [
    [/href="\/(?!proxy\/)/g, 'href="/proxy/'],
    [/href = `\/(?!proxy\/)/g, "href = `/proxy/"],
    [/href='\/(?!proxy\/)/g, "href='/proxy/"],
    [/src="\/(?!proxy\/)/g, 'src="/proxy/'],
    [/fetch\("\/(?!proxy\/)/g, 'fetch("/proxy/'],
    [/fetch\('\/(?!proxy\/)/g, "fetch('/proxy/"],
    [/fetch\(`\/(?!proxy\/)/g, "fetch(`/proxy/"],
    [/fetchData\('\/(?!proxy\/)/g, "fetchData('/proxy/"],
    [/action="\/(?!proxy\/)/g, 'action="/proxy/'],
  ];

  for (const [pattern, replacement] of replacements) {
    modified = modified.replaceAll(pattern, replacement);
  }

  return modified;
}

function createResponse(
  responseText: BodyInit | null | undefined,
  response: Response,
  status?: undefined,
) {
  // Special handling for 204 No Content responses
  if (response.status === 204) {
    const noContentResponse = new NextResponse(null, {
      status: 204,
    });

    // Forward cookies
    response.headers.forEach((value, key) => {
      if (key.toLowerCase() === "set-cookie") {
        noContentResponse.headers.append("Set-Cookie", value);
      }
    });

    return noContentResponse;
  }

  const nextResponse = new NextResponse(responseText, {
    status: status || response.status,
    headers: {
      "Content-Type": response.headers.get("Content-Type") || "text/html",
    },
  });

  // Forward cookies
  response.headers.forEach((value, key) => {
    if (key.toLowerCase() === "set-cookie") {
      nextResponse.headers.append("Set-Cookie", value);
    }
  });

  return nextResponse;
}

// Main request handler
async function handleRequest(
  request: Request,
  params: Promise<{ path: string[] }>,
  method: string,
) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.redirect("/login");
  }

  const url = new URL(request.url);

  if (!url.searchParams.has("embed")) {
    url.searchParams.append("embed", "true");
  }
  const query = url.search;
  const path = (await params).path.join("/");

  const fetchOptions: RequestInit = {
    method,
    headers: {
      "Content-Type": request.headers.get("Content-Type") || "application/json",
      Cookie: request.headers.get("cookie") || "",
      Authorization: `Bearer ${session.accessToken}`,
    },
    redirect: "manual",
  };

  // Handle request body for POST and PATCH methods
  if (method === "POST" || method === "PATCH") {
    const contentType = request.headers.get("Content-Type") || "";
    const clonedRequest = request.clone();

    if (contentType.includes("application/json")) {
      fetchOptions.body = JSON.stringify(await clonedRequest.json());
    } else if (contentType.includes("multipart/form-data")) {
      fetchOptions.body = await clonedRequest.formData();
    } else {
      fetchOptions.body = await clonedRequest.text();
    }
  }

  const isStaticFile = path.startsWith("static/");

  const response = await fetch(
    `${process.env.INTERNAL_SERVER_URL || process.env.NEXT_PUBLIC_SERVER_URL}/${path}${isStaticFile ? "" : "/"}${query}`,
    fetchOptions,
  );

  // Handle redirects
  if (response.status >= 300 && response.status < 400) {
    const redirectResponse = handleRedirect(response, request);
    if (redirectResponse) return redirectResponse;
  }

  // Handle errors
  if (!response.ok) {
    console.error(`Error ${response.status}:`, response);
    const errorContent = await response.text().catch(() => "");
    return createResponse(errorContent, response);
  }

  // Handle successful response
  const responseText = await response.text();
  const modifiedResponse = modifyResponseContent(responseText);
  return createResponse(modifiedResponse, response);
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return handleRequest(request, params, "GET");
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return handleRequest(request, params, "POST");
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return handleRequest(request, params, "PATCH");
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  return handleRequest(request, params, "DELETE");
}
