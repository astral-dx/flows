import _createCompile from 'lodash/template'
import _get from 'lodash/get'
import jsonata from 'jsonata'
import { faker } from '@faker-js/faker';
import { Json } from '..';
import { FlowGlobalContext } from '../hooks/useFlowData';

interface JSONataType {
  $flowDataType: 'JSONata';
  statement: string;
}

interface ConstantType {
  $flowDataType: 'Constant'
  value: Json
}

interface HandlebarsType {
  $flowDataType: 'Handlebars'
  statement: string
}

interface FakerType {
  $flowDataType: 'Faker'
  fakerType: string
}

type ReplaceType = JSONataType | ConstantType | HandlebarsType | FakerType;

interface ReplaceTemplate {
  [x: string]: ReplaceType | ReplaceTemplate
}

export type ReplaceData = ReplaceTemplate | ReplaceType;

export const generateConstantData = (template: ConstantType) => {
  return template.value;
};

export const generateJSONataData = (template: JSONataType, ctx: FlowGlobalContext | Record<string, Json>) => {
  return jsonata(template.statement).evaluate(ctx);
}

export const generateFakerData = (template: FakerType) => {
  return _get(faker, template.fakerType)();
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
export const replace = (data: ReplaceData, ctx: FlowGlobalContext | Record<string, Json>): Json => {
  if (data.$flowDataType) {
    switch (data.$flowDataType) {
      case 'Constant':
        return generateConstantData(data)
      case 'Handlebars':
        return generateHandlebarsData(data, ctx)
      case 'JSONata':
        return generateJSONataData(data, ctx)
      case 'Faker':
        return generateFakerData(data)
    }
  }

  return Object.keys(data).reduce((acc, cur) => ({
    ...acc,
    [cur]: replace(data[cur], ctx)
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