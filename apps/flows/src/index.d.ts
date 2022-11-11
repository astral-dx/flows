import { Schema } from "./utilities/generate";

export type HTTPMethod = 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE'

export interface Referenceable {
  referenceBy: string;
}



/*
 * Flow Block - Code Snippet
 */

export interface FlowCodeSnippet {
  language: string;
  code: string;
}

export interface FlowCodeBlock {
  type: 'code';
  value: Array<FlowCodeSnippet>;
}



/*
 * Flow Block - Request
 */

export interface FlowRequestGeneratedData extends Referenceable {
  schema: Schema;
}

export interface FlowGeneratedRequest {
  query?: FlowRequestGeneratedData;
  body?: FlowRequestGeneratedData;
  response?: FlowRequestGeneratedData;
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

export interface FlowRequestBlock {
  type: 'request';
  value: FlowRequest;
}



/*
 * Flow Block - Markdown
 */

export interface FlowMarkdownBlock {
  type: 'markdown';
  value: string;
}



/*
 * Flow Block - Connection
 */

export interface FlowConnectionInternalStep {
  stepId: string;
  label?: string;
}

export interface FlowConnectionExternalStep extends FlowConnectionInternalStep {
  collectionId: string;
  flowId: string;
}

type FlowConnection = FlowConnectionInternalStep | FlowConnectionExternalStep;

export interface FlowConnectionBlock {
  type: 'connection';
  value: FlowConnection;
}



/*
 * Flow Components
 */

export type FlowBlock = FlowMarkdownBlock | FlowRequestBlock | FlowCodeBlock | FlowConnectionBlock;

export interface FlowStep {
  id: string;
  name: string;
  blocks: Array<FlowBlock>;
}

export interface Flow {
  id: string;
  name: string;
  steps: Array<FlowStep>;
}

export interface FlowCollection {
  id: string;
  name: string;
  flows: Array<Flow>;
}



/*
 * Flow Schema
 */

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
