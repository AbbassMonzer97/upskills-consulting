process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
export const get = async (path: string, params: string = "") => {
  const requestOptions = {
    method: "GET",
  };
  let url: string;
  if (params !== "") {
    url = `${process.env.NEXT_PUBLIC_API_URL}/${path}?${params}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
  }
  const df = await helperFetch(url, requestOptions);
  return df;
};

export const post = async (url: string, body: object) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  return await helperFetch(
    process.env.NEXT_PUBLIC_API_URL + url,
    requestOptions
  );
};

export const put = async (url: string, body: object) => {
  const requestOptions = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  };
  return await helperFetch(
    process.env.NEXT_PUBLIC_API_URL + url,
    requestOptions
  );
};

export const _delete = async (url: string) => {
  const requestOptions = {
    method: "DELETE",
  };
  return await helperFetch(
    process.env.NEXT_PUBLIC_API_URL + url,
    requestOptions
  );
};

export const postToBackend = async (url: string, body: object) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_XAPIKEY || "",
    },
    body: JSON.stringify(body),
  };

  return await helperFetch(
    process.env.NEXT_PUBLIC_BACKEND_API_URL + url,
    requestOptions
  );
};

export const getFromBackend = async (path: string, params = null) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "*/*",
      "x-api-key": process.env.NEXT_PUBLIC_XAPIKEY || "",
    },
  };
  let url: string;
  if (params !== null) {
    url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${path}?${params}`;
  } else {
    url = `${process.env.NEXT_PUBLIC_BACKEND_API_URL}${path}`;
  }
  return await helperFetch(url, requestOptions);
};

const helperFetch = async (
  url: RequestInfo | URL,
  requestOptions?: RequestInit
) => {
  const urlString = url instanceof URL ? url.toString() : url;
  // Add cache control headers to disable caching
  const defaultOptions: RequestInit = {
    ...requestOptions,
    headers: {
      ...requestOptions?.headers,
      cache: "no-store",
    },
  };
  const response = await fetch(urlString, defaultOptions);

  const data = response.json();

  if (!response.ok) {
    const error = "Something Went Wrong: " + response.statusText;
    console.error(error);
    throw new Error("Failed to fetch data! " + error);
  }
  return data;
};
export const commonFetch = {
  get,
  post,
  put,
  delete: _delete,
  postToBackend,
  getFromBackend,
};
