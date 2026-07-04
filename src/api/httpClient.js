export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

const buildUrl = (path, params) => {
  const url = new URL(`${API_BASE_URL}${path}`, "http://localhost");

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        url.searchParams.append(key, value);
      }
    });
  }

  return API_BASE_URL ? url.toString() : `${url.pathname}${url.search}`;
};

const parseResponse = async (response) => {
  const contentType = response.headers.get("content-type");
  const hasJson = contentType?.includes("application/json");
  const data = hasJson ? await response.json() : await response.text();

  if (!response.ok) {
    const message = data?.message || response.statusText || "API request failed";
    throw new Error(message);
  }

  return data;
};

export const httpClient = {
  async request(path, { method = "GET", params, body, headers, ...options } = {}) {
    const response = await fetch(buildUrl(path, params), {
      method,
      headers: {
        ...(body ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    });

    return parseResponse(response);
  },

  get(path, options) {
    return this.request(path, { ...options, method: "GET" });
  },

  post(path, body, options) {
    return this.request(path, { ...options, body, method: "POST" });
  },

  put(path, body, options) {
    return this.request(path, { ...options, body, method: "PUT" });
  },

  patch(path, body, options) {
    return this.request(path, { ...options, body, method: "PATCH" });
  },

  delete(path, options) {
    return this.request(path, { ...options, method: "DELETE" });
  },
};
