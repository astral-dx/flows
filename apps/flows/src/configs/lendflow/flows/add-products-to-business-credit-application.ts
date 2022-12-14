import { Flow } from "../../..";
import { lendflow2Image } from "../images/lendflow2";

export const addProductsToBusinessCreditApplicationFlow: Flow = {
  id: 'add-products-to-business-credit-application',
  name: 'Add Products to Business Credit Application',
  description: '',
  blocks: [{
    type: 'markdown',
    value: '# Adding Products and Services\nIn order to add products and services you need to enrich your applications, make an API call to the Enrich Business Credit Application endpoint, input the desired application id on the path, and select the services you wish to use. Once you make the call, the response will give you a true or false value if the enrichment has started.'
  }, {
    type: 'request',
    value: {
      requestId: 'placeholder',
      referenceBy: 'placeholder',
    }
  }, {
    type: 'markdown',
    value: 'When a true value is returned, the service will run and you will be able to see the changes on the deal dashboard:'
  }, {
    type: 'image',
    value: { base64: lendflow2Image }
  }, {
    type: 'markdown',
    value: 'Different products and services may require commercial data, next we will enrich our applications with that data.'
  }, {
    type: 'connection',
    value: {
      flowId: 'add-commercial-data-to-business-credit-application',
      label: 'Add Commercial Data',
    }
  }]
}