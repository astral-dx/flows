import flatten, { unflatten } from 'flat'
import { Json } from '..'

export const mergeFlattened = (...records: Array<Record<string, Json>>): Record<string, Json> => {
  return unflatten<Record<string, Json>, Record<string, Json>>(
    records.reduce((acc, cur) => ({ ...acc, ...flatten(cur) }), {})
  )
}