import { Schema } from "./utilities/generate";

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

export interface ReplaceableBase {
  type: 'jsonata' | 'constant' | 'handlebars' | 'faker' | 'array';
}

export interface JSONataType extends ReplaceableBase {
  type: 'jsonata';
  query: string;
}

export interface ConstantType extends ReplaceableBase {
  type: 'constant';
  value: Json;
}

export interface HandlebarsType extends ReplaceableBase {
  type: 'handlebars';
  statement: string;
}

export interface FakerType extends ReplaceableBase {
  type: 'faker';
  faker: string;
  fakerArgs?: Json[];
}

export interface ArrayType extends ReplaceableBase {
  type: 'array';
  items: ReplaceData;
  min?: number,
  max?: number,
}

export type Replaceable = JSONataType | ConstantType | HandlebarsType | FakerType | ArrayType;

export const isReplaceable = (data: ReplaceData): data is Replaceable  => {
  return data.type &&
  typeof data.type === 'string' &&
  ['jsonata', 'constant', 'handlebars', 'faker', 'array'].includes(data.type)
}

interface ReplaceTemplate {
  [x: string]: Replaceable | ReplaceTemplate
}

export type ReplaceData = Replaceable | ReplaceTemplate

export type FlowRequestPropertyType = 'text' | 'secret' | 'hidden'

export interface FlowRequestPropertyArray {
  items: FlowRequestProperty | FlowRequestSchema
  min?: number;
  max?: number;
}

export interface FlowRequestPropertyValue {
  type: FlowRequestPropertyType,
  value: ReplaceData,
}

export type FlowRequestProperty = FlowRequestPropertyArray | FlowRequestPropertyValue

export const isFlowRequestPropertyArray = (property: FlowRequestProperty): property is FlowRequestPropertyArray  => {
  return 'items' in property
}

export const isFlowRequestPropertyValue = (property: FlowRequestProperty): property is FlowRequestPropertyValue  => {
  return 'value' in property
}

export interface FlowRequestSchema {
  properties: {
    [x: string]: FlowRequestProperty | FlowRequestSchema,
  }
}

export const isFlowRequestProperty = (propertyOrSchema: FlowRequestProperty | FlowRequestSchema): propertyOrSchema is FlowRequestProperty  => {
  return 'items' in propertyOrSchema || 'value' in propertyOrSchema
}

export const isFlowRequestSchema = (propertyOrSchema: FlowRequestProperty | FlowRequestSchema): propertyOrSchema is FlowRequestSchema  => {
  return 'properties' in propertyOrSchema
}

export interface FlowRequest {
  id: string;
  path: string;
  method: HTTPMethod;
  params?: {
    headers?: FlowRequestSchema;
    query?: FlowRequestSchema;
    body?: FlowRequestProperty | FlowRequestSchema;
    path?: FlowRequestSchema;
  };
  response?: {
    body?: FlowRequestProperty | FlowRequestSchema;
    headers?: FlowRequestSchema;
  }
}

export interface FlowRequestReference extends Referenceable {
  requestId: string;
  params?: {
    headers?: FlowRequestSchema;
    query?: FlowRequestSchema;
    body?: FlowRequestProperty | FlowRequestSchema;
    path?: FlowRequestSchema;
  };
  response?: {
    body?: FlowRequestProperty | FlowRequestSchema;
    headers?: FlowRequestSchema;
  }
}

export interface FlowRequestBlock {
  type: 'request';
  value: FlowRequestReference;
}


export interface FlowWebhook {
  method: HTTPMethod;
  params?: {
    body?: ReplaceData;
    query?: ReplaceData;
  }
}

/**
 * Flow Block - Webhook
 */
export interface FlowWebhookBlock {
  type: 'webhook';
  value: FlowWebhook;
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

export interface FlowImage {
  base64: string;
  alt?: string;
  blockStyles?: Record<string, string | number>;
  imageStyles?: Record<string, string | number>;
}

export interface FlowImageBlock {
  type: 'image';
  value: FlowImage;
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

export type FlowBlock = 
  FlowMarkdownBlock 
  | FlowRequestBlock 
  | FlowCodeBlock 
  | FlowConnectionBlock 
  | FlowImageBlock 
  | FlowWebhookBlock;

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

export interface FlowBrand {
  name: string;
  logoUrl: string;
  colors: {
    primary: string;
    secondary: string;
  }
}

export interface FlowEnvironment {
  id: string;
  name: string;
  host: string;
  type: 'live' | 'mock';
}

export interface FlowConstant extends Referenceable {
  value: string;
}

export interface FlowsConfig {
  id: string;
  brand: FlowBrand;
  flows: Array<Flow>;
  environments: Array<FlowEnvironment>;
  constants: Array<FlowConstant>;
  requests: Array<FlowRequest>;
  categories?: Array<Category>;
}
