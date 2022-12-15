import { describe, expect, it } from 'vitest';
import { ReplaceData } from '..';
import { FlowGlobalContext } from '../hooks/useFlowData';
import { generateFakerData, generateJSONataData, replace } from './replace';

describe('replace', () => {
  const globalCtx: FlowGlobalContext = {
    constants: {},
    ref: {
      callOne: {
        response: {
          body: { 
            test: 'testing',
            bool: false
          },
          headers: {}
        }
      },
      callTwo: {
        response: {
          body: {},
          headers: {
            hello: 'world',
            number: 123,
            obj: {
              test: 123,
              hello: 'world'
            }
          }
        }
      }
    }
  };

  describe('JSONata Replacer', () => {
    it('should use jsonata to get string data from global context', () => {
      const result = generateJSONataData({
        type: 'jsonata',
        query: '$.responses.callOne.body.test'
      }, globalCtx);

      expect(result).toEqual('testing')
    })

    it('should use jsonata to get boolean data from global context', () => {
      const result = generateJSONataData({
        type: 'jsonata',
        query: '$.responses.callOne.body.bool'
      }, globalCtx);

      expect(result).toEqual(false)
    })

    it('should use jsonata to get number data from global context', () => {
      const result = generateJSONataData({
        type: 'jsonata',
        query: '$.responses.callTwo.headers.number'
      }, globalCtx);

      expect(result).toEqual(123)
    })

    it('should use jsonata to get object data from global context', () => {
      const result = generateJSONataData({
        type: 'jsonata',
        query: '$.responses.callTwo.headers.obj'
      }, globalCtx);

      expect(result).toEqual({
        test: 123,
        hello: 'world'
      })
    })
  })

  describe('faker data', () => {
    it('should correctly pass args to faker', () => {
      const result = generateFakerData({
        type: 'faker',
        faker: 'datatype.number',
        fakerArgs: [
          {
            max: 10,
            min: 8
          }
        ]
      });

      expect(result).toBeLessThanOrEqual(10);
      expect(result).toBeGreaterThanOrEqual(8);
    })
  })

  describe('replace', () => {
    it('should convert a template obj to the correct data', () => {
      const data: ReplaceData = {
        test: {
          type: 'constant',
          value: 'hello world'
        },
        foo: {
          bar: {
            type: 'jsonata',
            query: '$.responses.callTwo.headers.obj.test'
          }
        },
        handlebars: {
          type: 'handlebars',
          statement: 'Hello, {{ responses.callTwo.headers.hello }}'
        }
      };

      const result = replace(data, globalCtx);

      expect(result).toEqual({
        test: 'hello world',
        foo: {
          bar: 123
        },
        handlebars: "Hello, world"
      })
    })
  })
})