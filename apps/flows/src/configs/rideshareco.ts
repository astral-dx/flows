import { FlowsConfig } from '..';

export const config: FlowsConfig = {
  id: 'rideshareco',
  brand: {
    name: 'Rideshare Co.',
    logoUrl: '/logo.svg',
    colors: {
      primary: '#FF1493',
      secondary: '#03ff73',
    },
  },
  flows: [{
    id: 'driver-application',
    name: 'How to submit a Driver Application',
    description: 'Prompt for application information and upload via API.',
    blocks: [
      {
        type: 'markdown',
        value: `# Prompt for Application Data\nTo submit a driver's application you'll need to first ask the user the following information pass along to Shuttleco's API:\n- Driver's License Photo\n- Proof of Insurance Photo\n- Vehicle Make, Model, and Year\n## Base64 Encoding Images\nBoth of the photos the user will need to upload should be base64 encoded before sending. See the code snippet below for an example of how to base64 encode images.`
      },
      {
        type: 'code',
        value: [
          {
            language: 'typescript',
            code: `import fs from 'fs';\n\n// read binary data\nconst bitmap = fs.readFileSync(file);\n\n// convert binary data to base64 encoded string\nconst encoded = new Buffer(bitmap).toString('base64');`
          },
          {
            language: 'java',
            code: `import java.util.Scanner;\n\nclass MyClass {\n\tpublic static void main(String[] args) {\n\t\tScanner myObj = new Scanner(System.in);\n\t\tSystem.out.println("Enter username");\n\n\t\tString userName = myObj.nextLine();\n\t\tSystem.out.println("Username is: " + userName);\n\t}\n}`
          },
        ]
      },
      {
        type: 'markdown',
        value: '## Create Driver Application\nCreates an Driver application for a user given the required information. The application approval can take up to 24 hours. Use the Fetch Driver Application Status call to check the status of a Driver application.'
      },
      {
        type: 'request',
        value: {
          requestId: 'post-driver-application',
          referenceBy: 'postDriverApplication',
          overrides: {
            body: {
              driverLicensePhoto: {
                type: 'constant',
                value: 'abc',
              },
            }
          }
        }
      },
      {
        type: 'request',
        value: {
          requestId: 'get-driver-application',
          referenceBy: 'getDriverApplication',
          overrides: {
            path: {
              id: {
                type: 'jsonata',
                query: '$.responses.postDriverApplication.body.id'
              }
            },
            query: {
              id: {
                type: 'constant',
                value: 123
              },
              name: {
                type: 'faker',
                faker: 'name.firstName'
              }
            }
          }
        }
      },
      {
        type: 'code',
        value: [
          {
            language: 'typescript',
            code: `// Example referencing request data!\n\nconst id = '{{responses.postDriverApplication.body.id}}'`
          },
        ]
      },
      {
        type: 'webhook',
        value: {
          method: 'POST',
          params: {
            body: {
              id: {
                type: 'faker',
                faker: 'datatype.uuid'
              }
            },
            query: {
              test: {
                type: 'constant',
                value: '123'
              }
            }
          }
        }
      },
      {
        type: 'markdown',
        value: '## Driver Application Submitted 🎉\nOnce you\'ve submitted your API request let the user know it\'ll take a few hours for their application to be processed.'
      },
      {
        type: 'connection',
        value: {
          flowId: 'driver-application',
        }
      }
    ]
  }],
  environments: [{
    id: 'generated',
    name: 'Mock API',
    type: 'mock',
    host: 'https://demo-api.rideshareco.com'
  },
  {
    id: 'sandbox',
    name: 'Sandbox API',
    type: 'live',
    host: 'https://sanbox-api.rideshareco.com'
  }],
  constants: [{
    value: 'https://api-spec.rideshareco.io/v1.json',
    referenceBy: 'ridesharecoApiV1'
  }],
  requests: [{
    id: 'post-driver-application',
    path: '/driver-application',
    method: 'POST',
    params: {
      headers: {
        type: 'object',
        properties: {
          'Content-Type': { type: 'string', default: 'application/json' },
        },
        required: ['Content-Type'],
      },
      body: {
        type: 'object',
        properties: {
          driverLicensePhoto: {
            type: 'string',
            faker: 'image.dataUri'
          },
          vehicle: {
            type: 'object',
            properties: {
              make: {
                type: 'string',
                faker: 'vehicle.manufacturer'
              },
              colors: {
                type: 'array',
                minItems: 1,
                maxItems: 3,
                items: { type: 'string' },
              }
            },
            required: ['make', 'colors'],
            additionalProperties: false,
          }
        },
        required: ['driverLicensePhoto', 'vehicle'],
        additionalProperties: false,
      }
    },
    response: {
      body: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            faker: 'datatype.uuid'
          },
        },
        required: ['id'],
        additionalProperties: false,
      }
    },
  },
  {
    id: 'get-driver-application',
    method: 'GET',
    path: '/driver-application/:id',
    params: {
      path: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            faker: 'datatype.uuid',
          }
        },
        required: ['id'],
        additionalProperties: false,
      }
    }
  }]
}