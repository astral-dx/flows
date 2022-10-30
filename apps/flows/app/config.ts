export const config = {
  "categories": [{
    "name": "Drivers",
    "flows": [{
      "name": "Driver Application",
      "steps": [{
        "name": "Submit Application Data",
        "content": [{ 
          "type": "markdown",
          "value": "# Hello World\nThis is some example markdown."
        },
        {
          "type": "snippet",
          "value": [{
            "language": "TypeScript",
            "code": "const x = 10;"
          }, {
            "language": "Java",
            "code": "int x = 10;"
          }]
        },
        {
          "type": "markdown",
          "value": "# Make the request\nSee below."
        },
        {
          "type": "request",
          "value": {
            "path": "/driver-application",
            "method": "post",
            "headers": {},
            "body": {},
            "query": {},
            "response": {},
            "inputs": [{
              "type": "generated",
              "key": "driverLicensePhoto",
              "value": "random.base64"
            }, {
              "type": "static",
              "key": "vehicleMake",
              "value": "Toyota"
            }]
          }
        },
        {
          "type": "request",
          "value": {
            "reference": "ridesharecoApiV1.driverApplication.post",
            "inputs": [{
              "type": "generated",
              "key": "driverLicensePhoto",
              "value": "random.base64"
            }, {
              "type": "static",
              "key": "vehicleMake",
              "value": "Toyota"
            }]
          }
        }]
      }]
    }]
  }],
  "environments": [{
    "name": "production",
    "host": "https://api.rideshareco.com"
  }],
  "resources": [{
    "type": "openapi-spec",
    "value": "https://api-spec.rideshareco.io/v1.json",
    "referenceBy": "ridesharecoApiV1"
  }]
}