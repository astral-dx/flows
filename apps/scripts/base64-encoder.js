var fs = require('fs')
var path = require('path')

function main() {
    var bitmap = fs.readFileSync('./images/cacheflow-1.png')
    console.log('data:image/png;base64,' + Buffer.from(bitmap).toString('base64'))
}

main()