import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { ApiRequest, ApiResponse } from "./types";
import { get, set } from "lodash";
export class ApiSeriesTester {
  private requests: ApiRequest[] = [];
  private responses: ApiResponse[] = [];
  constructor(requests?: ApiRequest[]) {
    if (requests) {
      this.requests = requests;
    }
  }
  public async runSeries(): Promise<ApiResponse[]> {
    this.responses = [];
    for (const request of this.requests) {
      const response = await this.executeRequest(request);
      this.responses.push(response);
    }

    return this.responses;
  }
  private async executeRequest(request: ApiRequest): Promise<ApiResponse> {
    const startTime = Date.now();
    const timestamp = new Date().toISOString();
    try {
      const config: AxiosRequestConfig = {
        url: request.url,
        method: request.method,
        headers: request.headers || {},
        timeout: request.timeout || 30000,
      };

      if (request.body && ["POST", "PUT", "PATCH"].includes(request.method)) {
        try {
          config.data = JSON.parse(request.body);
        } catch (e) {
          config.data = request.body;
        }
      }

      // Process dependencies
      if (request.dependsOn && request.dependsOn.length > 0) {
        for (const dependency of request.dependsOn) {
          const dependencyResponse = this.responses.find(
            (r) => r.id === dependency.requestId
          );

          if (!dependencyResponse) {
            throw new Error(
              `Dependency request with ID "${dependency.requestId}" not found in responses`
            );
          }

          const extractedValue = get(
            dependencyResponse.data,
            dependency.extractPath
          );

          if (extractedValue === undefined) {
            throw new Error(
              `Could not extract value from path "${dependency.extractPath}" in response with ID "${dependency.requestId}"`
            );
          }

          // Inject the value based on target
          switch (dependency.injectInto) {
            case "url":
              config.url = config.url?.replace(
                `{${dependency.requestId}}`,
                String(extractedValue)
              );
              break;
            case "headers":
              if (dependency.targetPath) {
                set(
                  config.headers as object,
                  dependency.targetPath,
                  extractedValue
                );
              }
              break;
            case "body":
              if (dependency.targetPath && config.data) {
                set(config.data, dependency.targetPath, extractedValue);
              }
              break;
          }
        }
      }

      const response: AxiosResponse = await axios(config);
      const duration = Date.now() - startTime;

      return {
        id: request.id,
        name: request.name,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers as Record<string, string>,
        data: response.data,
        duration,
        timestamp,
      };
    } catch (error: any) {
      const duration = Date.now() - startTime;
      const errorResponse: ApiResponse = {
        id: request.id,
        name: request.name,
        status: error.response?.status || 0,
        statusText: error.response?.statusText || error.message,
        headers: error.response?.headers || {},
        data: error.response?.data || {},
        duration,
        timestamp,
        error: error.message,
      };

      return errorResponse;
    }
  }
}
