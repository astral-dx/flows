import _createCompile from 'lodash/template'
import _get from 'lodash/get'
import jsonata from 'jsonata'
import { Faker, faker as BaseFaker, faker } from '@faker-js/faker'
import { ArrayType, ConstantType, FakerType, FlowRequestProperty, FlowRequestSchema, HandlebarsType, isFlowRequestProperty, isFlowRequestPropertyArray, isFlowRequestPropertyValue, isFlowRequestSchema, isReplaceable, Json, JSONataType, ReplaceData } from '..'
import { FlowGlobalContext } from '../hooks/useFlowData'

export const generateConstantData = (template: ConstantType) => {
  return template.value;
}

export const generateJSONataData = (template: JSONataType, ctx: FlowGlobalContext | Record<string, Json>, i?: number) => {
  return jsonata(template.query.replaceAll('[i]', `[${i}]`)).evaluate(ctx);
}

export const generateFakerData = (template: FakerType, key?: string) => {
  const seed = Array.from(key ?? '').reduce((acc, c) => acc + c.charCodeAt(0), 0)

  const faker = new Faker({ locales: BaseFaker.locales })
  if (key) {
    faker.seed(seed)
  }

  const args = template.fakerArgs ?? [];
  
  return _get(faker, template.faker)(...args);
}

export const generateHandlebarsData = (template: HandlebarsType, ctx: FlowGlobalContext | Record<string, Json>) => {
  try {
    const compile = _createCompile(template.statement, {
      interpolate: /{{([\s\S]+?)}}/g, // mustache syntax
    })

    return compile(ctx);
  } catch {
    return template.statement;
  }
}

export const generateArrayData = (template: ArrayType, ctx: FlowGlobalContext | Record<string, Json>, key?: string) => {  
  const length = faker.datatype.number({
    min: template.min ?? 1,
    max: template.max ?? 2,
  })

  return Array.from({ length }, (_, i) => replace(template.items, ctx, key ? key + i : undefined, i))
}

// TODO: Would be cool to better type return value to narrow it down based off of data
export const replace = (data: ReplaceData, ctx: FlowGlobalContext | Record<string, Json>, key?: string, i?: number): Json => {
  if (isReplaceable(data)) {
    switch (data.type) {
      case 'constant':
        return generateConstantData(data)
      case 'handlebars':
        return generateHandlebarsData(data, ctx)
      case 'jsonata':
        return generateJSONataData(data, ctx, i)
      case 'faker':
        return generateFakerData(data, key)
      case 'array':
        return generateArrayData(data, ctx, key)
    }
  }

  return Object.keys(data).reduce((acc, cur) => ({
    ...acc,
    [cur]: replace(data[cur], ctx, cur + key, i)
  }), {})
}

export const replacePath = (url: string, pathParameters: Record<string, string>) => {
  return Object.entries(pathParameters).reduce((acc, cur) => {
    if (!cur[1]) {
      return acc
    }

    return acc.replaceAll(`:${cur[0]}`, cur[1])
  }, url);
}

export const schemaToReplaceData = (schema: FlowRequestProperty | FlowRequestSchema | undefined, acc?: ReplaceData): ReplaceData | undefined => {
  if (schema === undefined) { return }

  if (isFlowRequestSchema(schema)) {
    return {
      ...(acc ?? {}),
      ...Object.entries(schema.properties).reduce((obj, [key, value]) => {
        const data = schemaToReplaceData(value)
        if (!data) { return obj }
        return { ...obj, [key]: data }
      }, {})
    }
  }
  
  if (isFlowRequestProperty(schema)) {
    if (isFlowRequestPropertyValue(schema) && schema.type !== 'hidden') {
      return schema.value
    } else if (isFlowRequestPropertyArray(schema)) {
      const replaceData = schemaToReplaceData(schema.items)
      
      if (replaceData) {
        return {
          type: 'array',
          items: replaceData,
          min: schema.min,
          max: schema.max,
        }
      }
    }
  }
}