import { Flow } from "../../..";

export const businessCreditApplicationIntroFlow: Flow = {
  id: 'business-credit-application-intro',
  description: '',
  name: 'Business Credit Application',
  blocks: [{
    type: 'markdown',
    value: '# API Introduction\n\nA Business Credit Application can be created via Widget or API call, this guide will walk you though using API calls. All of our endpoints use headers which act as a source of extra information for each API call you make. The headers we use are the following\n- Authorization: Carries credentials that authenticate a user-agent with a server\n- Content-Type: Indicates the media type of the resource\n- Content-Length: Indicates the size of the data in the body\n- Host: Specifies the host and port number of the server the request is being sent\n- User-Agent: String that lets servers identify the application, operating system, vendor, and/or version of the requesting agent\n- Accept: Indicates the content types the client can understand\n- Accept-Encoding: Indicates the content encoding that the client can understand\n- Connection: Controls whether the network connection stays open after the current transaction finishes\n- Content-Type: Indicates the media type of the resource, setting the MIME type to application/json\n- Accept: Indicates the content types the client can understand, setting the MIME type to application/json'
  }, {
    type: 'markdown',
    value: '# Authentication\n\nThe first step would be to obtain your Bearer Token for authorization using the Get Bearer Token endpoint, using the specified path below, and your Lendflow email and password on the body. The response will return an access token that you can use for authorization purposes as well as an expiration timer (in seconds)'
  }, {
    type: 'request',
    value: {
      requestId: 'login',
      referenceBy: 'login',
      params: {
        body: {
          properties: {
            email: { type: 'text', value: { type: 'constant', value: 'you@company.com' } },
            password: { type: 'text', value: { type: 'constant', value: '***' } },
          }
        }
      }
    }
  }, {
    type: 'markdown',
    value: 'This Bearer Token will be used for authorization on every API call that you make, if you’re using a token that has expired your response will contain an “Unauthenticated.” string. You can input this Bearer Token on the Lendflow API docs collection.'
  }, {
    type: 'connection',
    value: {
      flowId: 'apply-for-business-credit',
    }
  }]
}