import { generate, Schema } from './generate'

const firstNameSchema: Schema = {
  type: 'string',
  faker: 'name.firstName',
}

const cashSchema: Schema = {
  type: 'string',
  faker: {
    'finance.amount': [100, 10000, 2, '$']
  },
}

const Request = () => {
  const firstName = generate(firstNameSchema)
  const cash = generate(cashSchema);

  return (
    <pre>{ JSON.stringify({ firstName, cash }, null, 2) }</pre>
  )
}

export default Request