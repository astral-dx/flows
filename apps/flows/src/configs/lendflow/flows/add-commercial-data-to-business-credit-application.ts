import { Flow } from "../../..";
import { lendflow3Image } from "../images/lendflow3";

export const addCommercialDataToBusinessCreditApplicationFlow: Flow = {
  id: 'add-commercial-data-to-business-credit-application',
  name: 'Add Commercial Data to Business Credit Application',
  description: '',
  blocks: [{
    type: 'markdown',
    value: '# Add Commercial Data\nOn the enrichment stage, you can also find different commercial data services for your credit applications, where you can enrich your applications even further with business information. The commercial data services provided are:\n- Know Your Business (KYB)\n- Business Credit\n- Bankruptcies\n- Judgments\n- UCC Filings\n- Liens\n\nIn order to add commercial data to your Business Credit Application, you can use the Enrich Business Credit Application endpoint. Once you identify the product you wish to use you can make the API call using the application_id on your path, and the response will return a true or false value to let you know if the call was successful or not.'
  }, {
    type: 'request',
    value: {
      requestId: 'placeholder',
      referenceBy: 'placeholder',
    }
  }, {
    type: 'markdown',
    value: 'Once a true value is returned, you can verify the changes on the deal dashboard:',
  }, {
    type: 'image',
    value: { base64: lendflow3Image },
  }, {
    type: 'markdown',
    value: '### Verifying Commercial Data\nAdditionally, if you want to verify the commercial data for an application via API you can call the Pull Application Commercial Data endpoint using your application_id on the path. The response contains information about the requested services, their dates, statuses, and responses.'
  }, {
    type: 'request',
    value: {
      requestId: 'placeholder',
      referenceBy: 'placeholder',
    }
  }, {
    type: 'markdown',
    value: 'It is also possible to enrich your applications via Orchestration, which we will explore in the next section.'
  }, {
    type: 'connection',
    value: {
      flowId: 'enrich-business-credit-application-with-orchestration',
      label: 'Enrich with Orchestration'
    }
  }]
}