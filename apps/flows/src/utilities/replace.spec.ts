import { describe, expect, it } from 'vitest';
import { FlowGlobalContext } from '../hooks/useFlowData';
import { generateJSONataData, replace, ReplaceData } from './replace';

describe('replace', () => {
  const globalCtx: FlowGlobalContext = {
    constants: {},
    callOne: {
      body: { 
        test: 'testing',
        bool: false
      },
      headers: {}
    },
    callTwo: {
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
  };

  describe('JSONata Replacer', () => {
    it('should use jsonata to get string data from global context', () => {
      const result = generateJSONataData({
        $flowDataType: 'JSONata',
        statement: '$.callOne.body.test'
      }, globalCtx);

      expect(result).toEqual('testing')
    })

    it('should use jsonata to get boolean data from global context', () => {
      const result = generateJSONataData({
        $flowDataType: 'JSONata',
        statement: '$.callOne.body.bool'
      }, globalCtx);

      expect(result).toEqual(false)
    })

    it('should use jsonata to get number data from global context', () => {
      const result = generateJSONataData({
        $flowDataType: 'JSONata',
        statement: '$.callTwo.headers.number'
      }, globalCtx);

      expect(result).toEqual(123)
    })

    it('should use jsonata to get object data from global context', () => {
      const result = generateJSONataData({
        $flowDataType: 'JSONata',
        statement: '$.callTwo.headers.obj'
      }, globalCtx);

      expect(result).toEqual({
        test: 123,
        hello: 'world'
      })
    })
  })

  describe('replace', () => {
    it('should convert a template obj to the correct data', () => {
      const data: ReplaceData = {
        test: {
          $flowDataType: 'Constant',
          value: 'hello world'
        },
        foo: {
          bar: {
            $flowDataType: 'JSONata',
            statement: '$.callTwo.headers.obj.test'
          }
        },
        handlebars: {
          $flowDataType: 'Handlebars',
          statement: 'Hello, {{ callTwo.headers.hello }}'
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