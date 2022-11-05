import { Schema } from "./components/Request/generate";

export type HTTPMethod = 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE'

export interface Referenceable {
  referenceBy: string;
}

export interface FlowGeneratedData extends Referenceable {
  schema: Schema;
}

export interface FlowGeneratedRequest {
  query?: FlowGeneratedData;
  body?: FlowGeneratedData;
  response?: FlowGeneratedData;
}

export interface FlowHTTPRequest extends FlowGeneratedRequest {
  path: string;
  method: Method;
  headers: Record<string, string>;
}

export interface FlowOpenAPIRequest extends FlowGeneratedRequest {
  specUrl: string;
  requestId: string;
}

export type FlowRequest = FlowHTTPRequest | FlowOpenAPIRequest;

export interface FlowCodeSnippet {
  language: string;
  code: string;
}

export interface FlowMarkdownBlock {
  type: 'markdown';
  value: string;
}

export interface FlowRequestBlock {
  type: 'request';
  value: FlowRequest;
}

export interface FlowCodeBlock {
  type: 'code';
  value: Array<FlowCodeSnippet>;
}

export type FlowBlock = FlowMarkdownBlock | FlowRequestBlock | FlowCodeBlock;

export interface FlowStep {
  name: string;
  blocks: Array<FlowBlock>;
}

export interface Flow {
  name: string;
  steps: Array<FlowStep>;
}

export interface FlowCollection {
  name: string;
  flows: Array<Flow>;
}

export interface FlowEnvironment {
  name: string;
  host: string;
}

export interface FlowConstant extends Referenceable {
  value: string;
}

export interface FlowsConfig {
  collections: Array<FlowCollection>;
  environments: Array<FlowEnvironment>;
  constants: Array<FlowConstant>;
}