/* eslint-disable @typescript-eslint/no-explicit-any */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

interface ApiResponse<T> {
  data: T;
  error?: string;
  ok: boolean;
}
export const fetchData = async <T>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  body?: unknown
): Promise<ApiResponse<T>> => {
  const token = localStorage.getItem("");

  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const jsonData = await response.json();

  if (response.ok) {
    return {
      data: jsonData as T,
      ok: true,
    };
  } else {
    return {
      data: null as any,
      error: jsonData.error || "Unknown error",
      ok: false,
    };
  }
};
