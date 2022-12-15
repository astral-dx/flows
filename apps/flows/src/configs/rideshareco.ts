import { FlowsConfig } from '..';

export const config: FlowsConfig = {
  id: 'rideshareco',
  brand: {
    name: 'Rideshare Co.',
    logoUrl: 'data:image/png;base64,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',
    colors: {
      primary: '#000',
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
          params: {
            body: {
              properties: {
                driverLicensePhoto: {
                  type: 'text',
                  value: { type: 'constant', value: 'abc' },
                },
                vehicle: {
                  properties: {
                    make: {
                      type: 'hidden',
                      value: { type: 'constant', value: '' }
                    }
                  }
                }
              }
            }
          }
        }
      },
      {
        type: 'request',
        value: {
          requestId: 'get-driver-application',
          referenceBy: 'getDriverApplication',
          params: {
            path: {
              properties: {
                id: {
                  type: 'text',
                  value: {
                    type: 'jsonata',
                    query: '$.responses.postDriverApplication.body.id',
                  }
                }
              }
            },
            query: {
              properties: {
                id: {
                  type: 'text',
                  value: {
                    type: 'constant',
                    value: 123,
                  }
                },
                name: {
                  type: 'text',
                  value: { 
                    type: 'faker',
                    faker: 'name.firstName',
                  }
                }
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
        properties: {
          'Content-Type': {
            type: 'text', value: { type: 'constant', value: 'application/json' },
          },
        },
      },
      body: {
        properties: {
          driverLicensePhoto: {
            type: 'text',
            value: { type: 'faker', faker: 'image.dataUri' }
          },
          vehicle: {
            properties: {
              make: {
                type: 'text',
                value: { type: 'faker', faker: 'vehicle.manufacturer' }
              },
              colors: {
                items: { type: 'text', value: { type: 'faker', faker: 'color.rgb' } },
              }
            },
          }
        },
      }
    },
    response: {
      body: {
        properties: {
          id: {
            type: 'text',
            value: { type: 'faker', faker: 'datatype.uuid' },
          },
        },
      }
    },
  },
  {
    id: 'get-driver-application',
    method: 'GET',
    path: '/driver-application/:id',
    params: {
      path: {
        properties: {
          id: {
            type: 'text',
            value: { type: 'faker', faker: 'datatype.uuid' },
          }
        },
      }
    }
  }]
}