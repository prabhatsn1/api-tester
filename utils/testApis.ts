import { ApiDetails } from "@/types/ApiDetails";

export const testApis = async (apis: ApiDetails[]) => {
  const results = [];

  for (const api of apis) {
    const { url, method, headers, body } = api;
    const options: RequestInit = {
      method,
      headers: headers ? JSON.parse(headers) : {},
      body: body ? JSON.parse(body) : undefined,
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      results.push({ status: response.status, data });
    } catch (error) {
      results.push({ status: "error", data: error.message });
    }
  }

  return results;
};
