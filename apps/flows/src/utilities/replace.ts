import createCompile from 'lodash/template'

export const replace = (str: string, data: Record<string, unknown>) => {
  const compile = createCompile(str, {
    interpolate: /{{([\s\S]+?)}}/g, // mustache syntax
  })

  return compile(data)
}
