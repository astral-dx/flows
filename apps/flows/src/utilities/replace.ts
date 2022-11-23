import createCompile from 'lodash/template'
import { unflatten } from 'flat'

export const replace = (str: string, data: Record<string, unknown>) => {
  try {
    const compile = createCompile(str, {
      interpolate: /{{([\s\S]+?)}}/g, // mustache syntax
    })
  
    return compile(unflatten(data))
  } catch (e) {
    return str
  }
}
