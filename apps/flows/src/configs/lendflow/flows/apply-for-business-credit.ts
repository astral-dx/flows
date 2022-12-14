import { Flow } from "../../..";
import { lendflow1Image } from "../images/lendflow1";

export const applyForBusinessCreditFlow: Flow = {
  id: 'apply-for-business-credit',
  description: '',
  name: 'Apply for Business Credit',
  blocks: [/*{
    type: 'markdown',
    value: 'This flow is a starting point for '
  },{
    type: 'markdown',
    value: '# Fetch an Access Token\nTo get started, you\'ll need to fetch a Bearer Token for authorization the request below.\n\nThe request body accepts your Lendflow email and password. The response will return an access token that you can use for authorization purposes as well as an expiration timer (in seconds).'
  }, {
    type: 'request',
    value: {
      requestId: 'login',
      referenceBy: 'login',
    }
  },*/{
    type: 'markdown',
    value: '# Apply for Business Credit\nFill the information on the required fields and you make the API call, the response will contain an application_id or UUID which will be useful to track the credit application on the Lendflow dashboard, as well as a path parameter for future API calls for a specific application'
  }, {
    type: 'request',
    value: {
      requestId: 'placeholder',
      referenceBy: 'placeholder',
    }
  }, {
    type: 'markdown',
    value: 'You will also be able to see your application on the Lendflow dashboard:'
  }, {
    type: 'image',
    value: { base64: lendflow1Image },
  }, {
    type: 'markdown',
    value: 'Once the application is started by your client you will receive a webhook notification with the deal UUID. Send a test webhook envent to your system:'
  }, {
    type: 'webhook',
    value: {
      method: 'POST',
      params: {
        body: {
          deal_uuid: { type: 'constant', value: '1a747d30-2df3-4d26-a752-182dccd06c89' },
        }
      }
    }
  }, {
    type: 'markdown',
    value: '## Application Submitted\n\nNext, you can proceed to the Underwriting stage with the application, where you can enrich your deals. The Match services on the underwriting stage provides match services for personal and business information (SSN, DOB, BIN, Address, and more) that can enrich your client\'s current application.'
  }, {
    type: 'connection',
    value: {
      flowId: 'add-products-to-business-credit-application',
      label: 'Add Products to Application',
    }
  }]
}