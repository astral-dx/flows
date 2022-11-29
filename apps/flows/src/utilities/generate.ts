import { faker } from '@faker-js/faker';
import { JSONSchemaFaker, Schema as JsonSchema } from 'json-schema-faker'
import { Json } from '..';

JSONSchemaFaker.extend("faker", () => faker)

export const generate = (
  schema: JsonSchema
): Record<string, Json> => {
  return JSONSchemaFaker.generate(schema)
}
export type Schema = JsonSchema;