import { faker } from '@faker-js/faker';
import { JSONSchemaFaker, Schema as JsonSchema } from 'json-schema-faker'

import { FlowData } from '../components/useFlowData'

JSONSchemaFaker.extend("faker", () => faker)

export const generate = (
  schema: JsonSchema,
  referenceBy: string,
  addFlowData: (record: FlowData) => void,
): Record<string, unknown> => {
  const data = JSONSchemaFaker.generate(schema)
  addFlowData({ [referenceBy]: data })
  return data;
}
export type Schema = JsonSchema;