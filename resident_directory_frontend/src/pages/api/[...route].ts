import type { NextApiRequest, NextApiResponse } from "next";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000"; // Set to actual backend URL/port

/**
 * PUBLIC_INTERFACE
 * Proxy API for backend FastAPI endpoints (auth, directory, moderation, export, audit).
 *
 * This catch-all route allows the frontend to call /api/* and forwards those to the backend.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let apiRoute = "";
  if (Array.isArray(req.query.route)) {
    apiRoute = req.query.route.join("/");
  } else if (typeof req.query.route === "string") {
    apiRoute = req.query.route;
  }
  const url = `${backendUrl}/${apiRoute}${req.url?.split("?")[1] ? "?" + req.url.split("?")[1] : ""}`;

  // Only include string headers, flattening any string[] values to a comma-separated string
  const headers: Record<string, string> = {};
  Object.entries(req.headers).forEach(([k, v]) => {
    if (typeof v === "string") headers[k] = v;
    else if (Array.isArray(v)) headers[k] = v.join(",");
  });
  // Remove host and connection headers for backend forwarding
  delete headers.host;
  delete headers.connection;

  const options: RequestInit = {
    method: req.method,
    headers,
    // Only send body for relevant methods
    body:
      req.method && ["POST", "PUT", "PATCH"].includes(req.method) ? JSON.stringify(req.body) : undefined,
  };

  try {
    const backendRes = await fetch(url, options as RequestInit);
    const data = await backendRes.arrayBuffer();
    res.status(backendRes.status);
    for (const [key, value] of backendRes.headers.entries()) {
      // pass through useful headers
      if (key === "content-type" || key === "content-disposition") {
        res.setHeader(key, value);
      }
    }
    res.send(Buffer.from(data));
  } catch (err) {
    let message = "API forwarding error";
    if (err instanceof Error) {
      message = err.message;
    } else if (typeof err === "object" && err !== null && "message" in err) {
      message = (err as { message?: string }).message || "API forwarding error";
    }
    res.status(502).json({ error: message });
  }
}
