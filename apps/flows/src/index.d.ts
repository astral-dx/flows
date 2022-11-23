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

export interface FlowRequest {
  id: string;
  path: string;
  method: HTTPMethod;
  params?: {
    headers?: Schema;
    query?: Schema;
    body?: Schema;
    path?: Schema;
  };
  response?: {
    body?: Schema;
    headers?: Schema;
  }
}

export interface FlowRequestReference extends Referenceable {
  requestId: string;
  overrides?: {
    headers?: Record<string, unknown>;
    query?: Record<string, unknown>;
    body?: string | Record<string, unknown>;
    path?: Record<string, unknown>;
  }
}

export interface FlowRequestBlock {
  type: 'request';
  value: FlowRequestReference;
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

export interface FlowConnection {
  flowId: string;
  label?: string;
}

export interface FlowConnectionBlock {
  type: 'connection';
  value: FlowConnection;
}



/*
 * Flow Components
 */

export type FlowBlock = FlowMarkdownBlock | FlowRequestBlock | FlowCodeBlock | FlowConnectionBlock;

export interface Flow {
  id: string;
  categories?: Array<string>;
  name: string;
  description: string;
  blocks: Array<FlowBlock>;
}

export interface Category {
  id: string;
  name: string;
  description: string;
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
  id: string;
  flows: Array<Flow>;
  environments: Array<FlowEnvironment>;
  constants: Array<FlowConstant>;
  requests: Array<FlowRequest>;
  categories?: Array<Category>;
}
