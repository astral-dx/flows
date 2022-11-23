import { FlowsConfig } from '..';

export const config: FlowsConfig = {
  id: 'rideshareco',
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
              driverLicensePhoto: 'abc',
            }
          }
        }
      },
      {
        type: 'code',
        value: [
          {
            language: 'typescript',
            code: `// Example referencing request data!\n\nconst id = '{{response.id}}'`
          },
        ]
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
    name: 'sandbox',
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
          vehicleMake: {
            type: 'string',
            faker: 'vehicle.manufacturer'
          }
        },
        required: ['driverLicensePhoto', 'vehicleMake'],
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
      }
    },
  }]
}