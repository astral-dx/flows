import { FlowRequest } from "../../..";

export const postAuthLoginRequest: FlowRequest = {
  id: 'login',
  method: 'POST',
  path: '/auth/login',
  params: {
    body: {
      type: 'object',
      properties: {
        email: { type: 'string' },
        password: { type: 'string' }
      },
      required: ['email', 'password'],
    },
    headers: {
      type: 'object',
      properties: {
        'Content-Type': { type: 'string', const: 'application/json' },
        Accept: { type: 'string', const: 'application/json' },
      },
      required: ['Content-Type', 'Accept'],
    }
  },
  response: {
    body: {
      type: 'object',
      properties: {
        access_token: { type: 'string' },
        token_type: { type: 'string', const: 'bearer' },
        expires_in: { type: 'number', const: 7200 },
      },
      required: ['access_token', 'token_type', 'expires_in'],
    },
    headers: {
      type: 'object',
      properties: {
        status: { type: 'number', const: 200 },
      },
      required: ['status']
    }
  }
}