type NextFetchRequestConfig = {
  revalidate?: number | false;
  tags?: string[];
};

interface FetchAPIOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  authToken?: string;
  body?: Record<string, unknown>;
  next?: NextFetchRequestConfig;
}

export async function fetchAPI(url: string, options: FetchAPIOptions) {
  const { method, authToken, body, next } = options;

  const headers: RequestInit & { next?: NextFetchRequestConfig } = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(authToken && { Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}` }),
    },
    ...(body && { body: JSON.stringify(body) }),
    ...(next && { next }),
  };

  try {
    const response = await fetch(url, headers);
    const contentType = response.headers.get("content-type");

    if (response.ok && contentType?.includes("application/json")) {
      return await response.json();
    } else {
      console.error(`Błąd odpowiedzi serwera: ${response.status} ${response.statusText}`);
      return null; // Zwróć null w przypadku błędów HTTP lub nie-JSON
    }
  } catch (error) {
    console.error(`Błąd podczas ${method} danych z ${url}:`, error);
    return null; // Zwróć null w przypadku błędów sieciowych (np. TypeError: fetch failed)
  }
}