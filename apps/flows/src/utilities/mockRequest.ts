import { Json, ReplaceData } from "..";
import { FlowGlobalContext } from "../hooks/useFlowData";
import { replace } from "./replace";

interface MockRequestResponse {
  body: Record<string, Json>;
  headers: Record<string, Json>;
}

export const mockRequest = (bodyTemplate: ReplaceData, headerTemplate: ReplaceData, ctx: FlowGlobalContext, key?: string) => {
  return new Promise<MockRequestResponse>((resolve) => {
    setTimeout(() => {
      resolve({
        body: replace(bodyTemplate, ctx, key) as Record<string, Json>,
        headers: replace(headerTemplate, ctx, key) as Record<string, Json>,
      });
    }, Math.random() * (800 - 50) + 50)
  });
}