import { generate, Schema } from './generate'

const objectSchema: Schema = {
  type: "object",
  properties: {
    driverLicensePhoto: {
      type: "string",
      faker: "image.dataUri"
    },
    vehicleMake: {
      type: "string",
      faker: "vehicle.manufacturer"
    }
  },
  required: ['driverLicensePhoto', 'vehicleMake'],
  additionalProperties: false,
}

const Request = () => {
  const obj = generate(objectSchema);

  return (
    <pre>{ JSON.stringify(obj, null, 2) }</pre>
  )
}

export default Request