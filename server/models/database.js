const mongoose = require('mongoose')
const {database} = require('../../config')

const db=mongoose.connect(database);
mongoose.set('strictQuery', false);

// db.on('error', console.error.bind(console,'connection error'))
// db.once(open, function(){
//     console.log('connected')
// })


require('./Category')
require('./Recipe')