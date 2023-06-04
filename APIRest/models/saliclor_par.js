const mongoose = require('mongoose')
const Schema = mongoose.Schema

const saliclorPar = Schema({
    saliclorId: String,
    fecha: Date, 
    produccionPar: Number,
    polaridadPar: Number,
    phPar: Number,
    redoxPar: Number,
    cloroPar: Number,
  
})

module.exports = mongoose.model('Param', saliclorPar)