import { FlowsConfig } from '..';
import { businessCreditApplicationIntroFlow } from './lendflow/flows/business-credit-application-intro';
import { applyForBusinessCreditFlow } from './lendflow/flows/apply-for-business-credit';
import { addProductsToBusinessCreditApplicationFlow } from './lendflow/flows/add-products-to-business-credit-application';
import { enrichBusinessCreditApplicationWithOrchestrationFlow } from './lendflow/flows/enrich-business-credit-application-with-orchestration';
import { addCommercialDataToBusinessCreditApplicationFlow } from './lendflow/flows/add-commercial-data-to-business-credit-application';
import { cashFlowAnalysisForABusinessCreditApplication } from './lendflow/flows/cash-flow-analysis-for-a-business-credit-application';
import { runAScoreCardOnABusinessCreditApplication } from './lendflow/flows/run-a-score-card-on-a-business-credit-application';
import { postAuthLoginRequest } from './lendflow/requests/post-auth-login';

export const config: FlowsConfig = {
  id: 'lendflow',
  brand: {
    name: 'Lendflow',
    logoUrl: 'https://assets-global.website-files.com/60e7289f994248612b0ddecf/60e7289f9942482bb60ddee6_Lendflow-logo.svg',
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
    {
      id: 'placeholder',
      method: 'POST',
      path: '/placeholder',
      params: {
        body: {
          properties: {
            example: { type: 'text', value: { type: 'constant', value: 'this request will be updated soon!' } },
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
            example: { type: 'text', value: { type: 'constant', value: 'this request will be updated soon!' } },
          },
        },
        headers: {
          properties: {
            example: { type: 'text', value: { type: 'constant', value: 200 } },
          },
        }
      }
    }
  ]
}