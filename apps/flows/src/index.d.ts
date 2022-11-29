import { Schema } from "./utilities/generate";
import { ReplaceData } from "./utilities/replace";

export type HTTPMethod = 'CONNECT' | 'DELETE' | 'GET' | 'HEAD' | 'OPTIONS' | 'PATCH' | 'POST' | 'PUT' | 'TRACE'
export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

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
    headers?: ReplaceData;
    query?: ReplaceData;
    body?: ReplaceData;
    path?: ReplaceData;
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
 * Flow Block - Image
 */

export interface FlowImageBlock {
  type: 'image';
  base64: string;
  alt?: string;
  blockStyles?: Record<string, string | number>;
  imageStyles?: Record<string, string | number>;
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

export type FlowBlock = FlowMarkdownBlock | FlowRequestBlock | FlowCodeBlock | FlowConnectionBlock | FlowImageBlock;

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
  id: string;
  name: string;
  host: string;
  mockEnvironment?: boolean;
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
