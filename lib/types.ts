/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiRequest {
  id: string;
  name: string;
  url: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers: Record<string, string>;
  body: string;
  timeout: number;
  dependsOn?: {
    requestId: string;
    extractPath: string;
    injectInto: "url" | "headers" | "body";
    targetPath?: string;
  }[];
}
export interface ApiResponse {
  id: string;
  name: string;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  data: any;
  duration: number;
  timestamp: string;
  error?: string;
}
export interface ApiTestResult {
  responses: ApiResponse[];
  startTime: string;
  endTime: string;
  totalDuration: number;
}
