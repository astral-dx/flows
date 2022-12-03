import _createCompile from 'lodash/template'
import _get from 'lodash/get'
import jsonata from 'jsonata'
import { Faker, faker as BaseFaker } from '@faker-js/faker'
import { Json } from '..'
import { FlowGlobalContext } from '../hooks/useFlowData'

interface ReplaceableBase {
  type: 'jsonata' | 'constant' | 'handlebars' | 'faker';
}

interface JSONataType extends ReplaceableBase {
  type: 'jsonata';
  query: string;
}

interface ConstantType extends ReplaceableBase {
  type: 'constant';
  value: Json;
}

interface HandlebarsType extends ReplaceableBase {
  type: 'handlebars';
  statement: string;
}

interface FakerType  extends ReplaceableBase {
  type: 'faker';
  faker: string;
}

type Replaceable = JSONataType | ConstantType | HandlebarsType | FakerType;

const isReplaceable = (data: ReplaceData): data is Replaceable  => {
  return data.type &&
  typeof data.type === 'string' &&
  ['jsonata', 'constant', 'handlebars', 'faker'].includes(data.type)
}

interface ReplaceTemplate {
  [x: string]: Replaceable | ReplaceTemplate
}

export type ReplaceData = ReplaceTemplate | Replaceable;

export const generateConstantData = (template: ConstantType) => {
  return template.value;
};

export const generateJSONataData = (template: JSONataType, ctx: FlowGlobalContext | Record<string, Json>) => {
  return jsonata(template.query).evaluate(ctx);
}

export const generateFakerData = (template: FakerType, seed?: number) => {
  const faker = new Faker({ locales: BaseFaker.locales })
  if (seed) {
    faker.seed(seed)
  }
  return _get(faker, template.faker)()
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

// TODO: Would be cool to better type return value to narrow it down based off of data
export const replace = (data: ReplaceData, ctx: FlowGlobalContext | Record<string, Json>, seed?: number): Json => {
  if (isReplaceable(data)) {
    switch (data.type) {
      case 'constant':
        return generateConstantData(data)
      case 'handlebars':
        return generateHandlebarsData(data, ctx)
      case 'jsonata':
        return generateJSONataData(data, ctx)
      case 'faker':
        return generateFakerData(data, seed)
    }
  }

  return Object.keys(data).reduce((acc, cur) => ({
    ...acc,
    [cur]: replace(data[cur], ctx, seed)
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