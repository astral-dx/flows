import { FlowRequest } from "../../..";

export const postAuthLoginRequest: FlowRequest = {
  id: 'login',
  method: 'POST',
  path: '/auth/login',
  params: {
    body: {
      properties: {
        email: { type: 'text', value: { type: 'constant', value: 'you@company.com' } },
        password: { type: 'secret', value: { type: 'constant', value: '***' } }
      },
    },
    headers: {
      properties: {
        'Content-Type': {
          type: 'text', value: { type: 'constant', value: 'application/json' },
        },
        'Accept': {
          type: 'text', value: { type: 'constant', value: 'application/json' },
        },
      },
    }
  },
  response: {
    body: {
      properties: {
        access_token: { type: 'text', value: { type: 'faker', faker: 'datatype.string', fakerArgs: [256] } },
        token_type: { type: 'text', value: { type: 'constant', value: 'bearer' } },
        expires_in: { type: 'text', value: { type: 'constant', value: 7200 } },
      },
    },
    headers: {
      properties: {
        status: { type: 'text', value: { type: 'constant', value: 200 } },
      },
    }
  }
}