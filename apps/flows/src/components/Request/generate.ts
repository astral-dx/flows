import { faker } from '@faker-js/faker';
import { JSONSchemaFaker, Schema as JsonSchema } from 'json-schema-faker'

JSONSchemaFaker.extend("faker", () => faker)

export const generate = JSONSchemaFaker.generate
export type Schema = JsonSchema;