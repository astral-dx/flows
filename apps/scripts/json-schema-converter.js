var toJsonSchema = require("@openapi-contrib/openapi-schema-to-json-schema")
var axios = require('axios')
const yaml = require('js-yaml')
const fs = require('fs')

const main = async () => {
  const name = 'lendflow'
  const url = 'https://api.lendflow.com/docs.openapi'

  const { data } = await axios.get(url)
  const json = yaml.load(data)

  fs.writeFileSync('./output/' + name + '.json', JSON.stringify(json, null, 2))

  console.log(toJsonSchema(json))
}


main()