import { FlowsConfig } from '..';

export const config: FlowsConfig = {
  collections: [{
    id: 'drivers',
    name: 'Drivers',
    flows: [{
      id: 'driver-application',
      name: 'Driver Application',
      steps: [{
        id: 'submit-app-data',
        name: 'Submit Application Data',
        blocks: [{ 
          type: 'markdown',
          value: '# Hello World\nThis is {{ ridesharecoApiV1 }} example markdown.'
        },
        {
          type: 'code',
          value: [{
            language: 'TypeScript',
            code: 'const x = 10;'
          }, {
            language: 'Java',
            code: 'int x = 10;'
          }]
        },
        {
          type: 'markdown',
          value: '# Make the request\nSee below.'
        },
        {
          type: 'request',
          value: {
            path: '/driver-application',
            method: 'post',
            headers: {},
            body: {
              referenceBy: 'requestBody',
              schema: {
                type: 'object',
                properties: {
                  driverLicensePhoto: {
                    type: 'string',
                    faker: 'image.dataUri'
                  },
                  vehicleMake: {
                    type: 'string',
                    faker: 'vehicle.manufacturer'
                  }
                },
                required: ['driverLicensePhoto', 'vehicleMake'],
                additionalProperties: false
              }
            }
          }
        },
        {
          type: 'request',
          value: {
            specUrl: '{{ridesharecoApiV1}}',
            requestId: '...',
            body: {
              referenceBy: 'requestBody',
              schema: {
                type: 'object',
                properties: {
                  driverLicensePhoto: {
                    type: 'string',
                    faker: 'image.dataUri'
                  },
                  vehicleMake: {
                    type: 'string',
                    faker: 'vehicle.manufacturer'
                  }
                },
                required: ['driverLicensePhoto', 'vehicleMake'],
                additionalProperties: false
              }
            }
          }
        }, {
          type: 'connection',
          value: {
            stepId: 'submit-app-data',
          }
        }]
      }]
    }]
  }],
  environments: [{
    name: 'production',
    host: 'https://api.rideshareco.com'
  }],
  constants: [{
    value: 'https://api-spec.rideshareco.io/v1.json',
    referenceBy: 'ridesharecoApiV1'
  }]
}