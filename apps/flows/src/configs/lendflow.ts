import { FlowsConfig } from '..';
import { businessCreditApplicationIntroFlow } from './lendflow/flows/business-credit-application-intro';
import { applyForBusinessCreditFlow } from './lendflow/flows/apply-for-business-credit';
import { addProductsToBusinessCreditApplicationFlow } from './lendflow/flows/add-products-to-business-credit-application';
import { enrichBusinessCreditApplicationWithOrchestrationFlow } from './lendflow/flows/enrich-business-credit-application-with-orchestration';
import { addCommercialDataToBusinessCreditApplicationFlow } from './lendflow/flows/add-commercial-data-to-business-credit-application';
import { cashFlowAnalysisForABusinessCreditApplication } from './lendflow/flows/cash-flow-analysis-for-a-business-credit-application';
import { runAScoreCardOnABusinessCreditApplication } from './lendflow/flows/run-a-score-card-on-a-business-credit-application';
import { postAuthLoginRequest } from './lendflow/requests/post-auth-login';
import { postBusinessCreditApplicationRequest } from './lendflow/requests/post-business-credit-application';

export const config: FlowsConfig = {
  id: 'lendflow',
  brand: {
    name: 'Lendflow',
    colors: {
      primary: '#282a40',
      secondary: '#03ff73',
    },
  },
  flows: [
    businessCreditApplicationIntroFlow,
    applyForBusinessCreditFlow,
    addProductsToBusinessCreditApplicationFlow,
    addCommercialDataToBusinessCreditApplicationFlow,
    enrichBusinessCreditApplicationWithOrchestrationFlow,
    cashFlowAnalysisForABusinessCreditApplication,
    runAScoreCardOnABusinessCreditApplication,
  ],
  environments: [{
    id: 'mock',
    name: 'Mock API',
    type: 'mock',
    host: 'https://api.lendflow.com/api/v1'
  }, {
    id: 'production',
    name: 'Production API',
    type: 'live',
    host: 'https://api.lendflow.com/api/v1'
  }],
  constants: [],
  requests: [
    postAuthLoginRequest,
    postBusinessCreditApplicationRequest,
    {
      id: 'placeholder',
      method: 'POST',
      path: '/placeholder',
      params: {
        body: {
          type: 'object',
          properties: {
            example: { type: 'string', const: 'this request will be updated soon!' },
          },
          required: ['example'],
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
            foo: { type: 'string' },
            bar: { type: 'string' },
          },
          required: ['foo', 'bar'],
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
  ]
}