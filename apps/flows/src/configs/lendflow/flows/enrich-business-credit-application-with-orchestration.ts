import { Flow } from "../../..";
import { lendflow4Image } from "../images/lendflow4";
import { lendflow5Image } from "../images/lendflow5";

export const enrichBusinessCreditApplicationWithOrchestrationFlow: Flow = {
  id: 'enrich-business-credit-application-with-orchestration',
  name: 'Enrich Business Credit Application with Orchestration',
  description: '',
  blocks: [{
    type: 'markdown',
    value: '# Create an Orchestration Template\nTo create an Orchestration workflow via API call, you have to use the Create Data Orchestration Template using the specified path, and the desired template name, description, workflow, content, and triggers on the body. Once a call is made, the response will contain the template ID and its content.'
  }, {
    type: 'request',
    value: {
      requestId: 'placeholder',
      referenceBy: 'placeholder',
    }
  }, {
    type: 'markdown',
    value: 'You can verify your templates on the Lendflow dashboard on your User Profile → Orchestration:',
  }, {
    type: 'image',
    value: { base64: lendflow4Image },
  }, {
    type: 'markdown',
    value: '# Run an Orchestration\nOnce Orchestration templates are set up, you can begin to enrich your application using them. When you want to run an orchestration template on a specific deal you must use the Execute Data Orchestration endpoint, inputting the application id on the path and the desired Orchestration Template id in the body in order to make the call. The response will return a true or false value and the selected template id.',
  }, {
    type: 'request',
    value: {
      requestId: 'placeholder',
      referenceBy: 'placeholder',
    }
  }, {
    type: 'markdown',
    value: 'When the response contains a true value the selected Orchestration Template and the changes will be available on the deal dashboard:'
  }, {
    type: 'image',
    value: { base64: lendflow5Image },
  }, {
    type: 'markdown',
    value: 'To analyze your client\'s finances, you need a client to connect their account via Plaid connection. We will explain linking a Plaid account next'
  }, {
    type: 'connection',
    value: {
      flowId: 'cash-flow-analysis-for-a-business-credit-application',
      label: 'Cash Flow Analysis'
    }
  }],
}