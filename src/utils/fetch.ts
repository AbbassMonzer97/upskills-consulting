"use server";
import { cookies } from "next/headers";
import { flattenAttributes } from "./utility";
interface FetchOptions extends RequestInit {
  body?: BodyInit | null;
}

interface FetchDataResponse {
  data: any;
  [key: string]: any;
}

export async function fetchData(
  url: string,
  options: FetchOptions = {},
  isFlattenAttributes: boolean = false,
  enableAuth: boolean = false
): Promise<FetchDataResponse> {
  // Apply backend suffix if available
  const urlSuffix = process.env.BACKEND_SUFFIX ?? "";
  if (urlSuffix && urlSuffix.length > 0) {
    const [base, path] = url.split("/api");
    url = `${base}${urlSuffix}/api${path}`;
  }

  const defaultOptions: FetchOptions = {
    method: "GET",
    cache: "no-store",
    headers: {},
  };

  const finalOptions: FetchOptions = { ...defaultOptions, ...options };

  // Set Content-Type header if not FormData
  if (!(options?.body instanceof FormData)) {
    finalOptions.headers = {
      ...finalOptions.headers,
      "Content-Type": "application/json",
    };
  }

  try {
    console.log(url);
    const response = await fetch(url, finalOptions);

    if (!response.ok) {
      console.log("[-*-*-", response.status, response.statusText, "-*-*-]");
    }
    const data = await response.json();

    if (!response.ok) {
      console.log("[-*-*-", JSON.stringify(data.error), "-*-*-]");
    }
    if (
      isFlattenAttributes &&
      ["PUT", "POST", "GET"].includes(finalOptions.method || "")
    ) {
      const f = flattenAttributes(data);
      return f;
    }
    const d = data === null ? { data: null } : data;
    return d;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}
