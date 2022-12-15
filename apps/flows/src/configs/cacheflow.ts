import { FlowsConfig } from '..';
import { cacheflow1Image } from './cacheflow/images/cacheflow1';

export const config: FlowsConfig = {
  id: 'cacheflow',
  brand: {
    name: 'Cacheflow',
    logoUrl: 'https://assets.website-files.com/6352b2f0411e3dcd848ea17c/6352b2f0411e3decaf8ea18f_white.svg',
    colors: {
      primary: '#224dff',
      secondary: '#000',
    },
  },
  flows: [{
    id: 'update-usage',
    name: 'Update Usage via API',
    description: '',
    blocks: [{
      type: 'markdown',
      value: '# Lookup Subscription ID\nNavigate to the Subscription Detail Page for your customer and copy the Subscription ID from the Subscription section.'
    }, {
      type: 'image',
      value: { base64: cacheflow1Image, imageStyles: { border: '1px solid #eee' } },
    }, {
      type: 'markdown',
      value: '# Fetch Contracts Details via API\nPass the Subscription ID as a path parameter.\nResponse will include an array of billing schedules that represent each cycle of the subscription. For each billing schedule cycle there is a billing item for each product the customer is subscribed to.\n\nThe billing item\'s id is used to update the usage.',
    }, {
      type: 'request',
      value: {
        requestId: 'get-contract-details',
        referenceBy: 'getContractDetails',
      }
    }, {
      type: 'markdown',
      value: '# Create Usage Record\nIn the request body pass the billing item id as well as the usage quantity. This request supports batching multiple records, so you can make a single requests for all your usage updates.'
    }, {
      type: 'request',
      value: {
        requestId: 'post-usage',
        referenceBy: 'postUsage'
      }
    }, {
      type: 'markdown',
      value: 'The final bill calculation is based on the last usage record created up until the net due date (net due date is the due date plus a grace period - 3 days by default). You can always fetch the latest usage quantity, it\'s is available on the billing item record.\n\n#### Reducing Usage\nTo remove or reduce usage, create another usage record with a quantity of 0 or a quantity lower than the current latest usage.'
    }],
  }],
  environments: [{
    id: 'mock',
    name: 'Mock API',
    type: 'mock',
    host: 'https://api.dev.getcacheflow.com/api/latest'
  }, {
    id: 'sandbox',
    name: 'Sandbox API',
    type: 'live',
    host: 'https://api.dev.getcacheflow.com/api/latest'
  }],
  constants: [],
  requests: [{
    id: 'get-contract-details',
    method: 'GET',
    path: '/data/contracts/:id',
    params: {
      path: {
        properties: {
          id: { type: 'text', value: { type: 'faker', faker: 'datatype.uuid' } }
        }
      }
    },
    response: {
      body: {
        properties: {
          billingSchedules: {
            min: 1,
            max: 1,
            items: {
              properties: {
                id: { type: 'text', value: { type: 'faker', faker: 'datatype.uuid' } },
                billingType: { type: 'text', value: { type: 'constant', value: 'product' } },
                cycleIndex: { type: 'text', value: { type: 'constant', value: 0 } },
                cycleName: { type: 'text', value: { type: 'constant', value: '2022-08-31' } },
                amountDue: { type: 'text', value: { type: 'faker', faker: 'datatype.number', fakerArgs: [{ min: 1000, max: 100000 }] } },
                contractItem: {
                  properties: {
                    referenceType: { type: 'text', value: { type: 'constant', value: 'contract' } },
                    product: {
                      properties: {
                        id: { type: 'text', value: { type: 'faker', faker: 'datatype.uuid' } },
                        name: { type: 'text', value: { type: 'constant', value: 'API Calls' } },
                        description: { type: 'text', value: { type: 'constant', value: 'Usage-based, stair-step pricing' } },
                        recurrence: { type: 'text', value: { type: 'constant', value: 'recurring' } },
                        pricing: { type: 'text', value: { type: 'constant', value: 'stairstep' } },
                        consumption: { type: 'text', value: { type: 'constant', value: 'usage_based' } },
                      }
                    }
                  }
                }
              }
            }
          }
        }
      },
      headers: {
        properties: {
          status: { type: 'text', value: { type: 'constant', value: 200 } },
        },
      },
    }
  }, {
    id: 'post-usage',
    method: 'POST',
    path: '/usage',
    params: {
      body: {
        min: 1,
        max: 1,
        items: {
          properties: {
            billingItemId: { type: 'text', value: { type: 'faker', faker: 'datatype.uuid' } },
            quantity: { type: 'text', value: { type: 'faker', faker: 'datatype.number', fakerArgs: [{ min: 1000, max: 100000 }] } },
          }
        }
      }
    },
    response: {
      body: {
        min: 1,
        max: 1,
        items: {
          properties: {
            id: { type: 'text', value: { type: 'faker', faker: 'datatype.uuid' } },
            billingItemId: { type: 'text', value: { type: 'jsonata', query: '$.ref.postUsage.request.body[i].billingItemId' } },
            productId: { type: 'text', value: { type: 'jsonata', query: '$.ref.getContractDetails.response.body.billingSchedules[i].contractItem.product.id' } },
            quantity: { type: 'text', value: { type: 'jsonata', query: '$.ref.postUsage.request.body[i].quantity' } },
            amount: { type: 'text', value: { type: 'faker', faker: 'datatype.number', fakerArgs: [{ min: 1000, max: 100000 }] } },
          }
        }
      },
      headers: {
        properties: {
          status: { type: 'text', value: { type: 'constant', value: 200 } },
        },
      },
    }
  }]
}