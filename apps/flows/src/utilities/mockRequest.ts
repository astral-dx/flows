import { Json } from "..";
import { generate, Schema } from "./generate";

interface MockResquestResponse {
  body: Record<string, Json>;
  headers: Record<string, Json>;
}

export const mockRequest = (bodySchema: Schema | undefined, headerSchema: Schema | undefined) => {
  return new Promise<MockResquestResponse>((resolve) => {
    setTimeout(() => {
      resolve({
        body: generate(bodySchema ?? {}),
        headers: generate(headerSchema ?? {})
      });
    }, Math.random() * (800 - 50) + 50)
  });
}