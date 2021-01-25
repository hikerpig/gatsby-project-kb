const fs = require('fs')
const walkSync = require('walk-sync')

// const names = fs.readdirSync('content')

const names = walkSync('content')

console.log('names', names)
