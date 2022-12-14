import { Flow } from "../../..";

export const cashFlowAnalysisForABusinessCreditApplication: Flow = {
  id: 'cash-flow-analysis-for-a-business-credit-application',
  name: 'Cash Flow Analysis for a Business Credit Application',
  description: '',
  blocks: [{
    type: 'markdown',
    value: '# Linking Plaid Account\nWhen you need a client to connect their account via Plaid connection, in order to analyze their finances, you need to send them the Plaid Widget which can be created by calling the Generate Plaid and Docusign links endpoint, there is no body required but you need to input the application id on the path. Once the call is made, the response will contain the links for each service that you can share with your clients as needed.'
  }, {
    type: 'request',
    value: {
      requestId: 'placeholder',
      referenceBy: 'placeholder',
    }
  }, {
    type: 'markdown',
    value: '# Cash Flow Analysis (CFA)\nOnce a plaid connection is made, a Cash Flow Analysis (CFA) of your clients\' finances can be run, you can do this via the Enrich Business Credit Application endpoint with your application id on the path, and ocrolus_cfa as the requested product on the body. Once the call returns a true value, the CFA will begin and the dashboard will update once it\'s completed.'
  }, {
    type: 'request',
    value: {
      requestId: 'placeholder',
      referenceBy: 'placeholder',
    }
  }, {
    type: 'markdown',
    value: 'The CFA will complete the enrichment (underwriting) stage of the application and will be ready to be moved into the Score Cards stage. Scorecards are a systematic way to match funders with deals, decisioning on issuing credit, or make any other decision on a deal that requires the input of multiple data attributes.'
  }, {
    type: 'connection',
    value: {
      flowId: 'run-a-score-card-on-a-business-credit-application',
      label: 'Run a Score Card',
    }
  }],
}