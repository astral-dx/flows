var fs = require('fs')
var path = require('path')

function main() {
    var bitmap = fs.readFileSync('./images/lendflow-goldapi19.png')
    console.log(Buffer.from(bitmap).toString('base64'))
}

main()