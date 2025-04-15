import type { NextApiRequest, NextApiResponse } from "next";
import { ApiSeriesTester } from "../../lib/api-tester";
import { ApiRequest, ApiResponse } from "../../lib/types";
type ResponseData = {
  responses?: ApiResponse[];
  error?: string;
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Only accept POST requests
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    // Get requests from request body
    const { requests } = req.body as { requests: ApiRequest[] };
    if (!requests || !Array.isArray(requests) || requests.length === 0) {
      res.status(400).json({ error: "Invalid or empty requests array" });
      return;
    }

    // Run API tests
    const tester = new ApiSeriesTester(requests);
    const responses = await tester.runSeries();

    // Return results
    res.status(200).json({ responses });
  } catch (error: any) {
    console.error("Error running API tests:", error);
    res.status(500).json({ error: error.message });
  }
}
