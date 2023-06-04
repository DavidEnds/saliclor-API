const mongoose = require('mongoose')
const Schema = mongoose.Schema

const saliclorData = Schema({
    modeloSaliclor: String,
    saliclorId: String,
    alias: String,
    numeroSerie: String,
    fecha: Date, 
    horasOn: Number,
    sal: Number,
    tempAgua: Number,
    flujo: Number,
    phReal: Number,
    redoxReal: Number,
    cloroReal: Number,
    vidaElectrodo: Number,

    avisos:{
        esperaProd: Boolean,
        segundosEspera: Number,
        flujo: Boolean,
        apoyoCloro: Boolean
    },

    alarmas: {
        bajoSal: Boolean,
        errorConex: Boolean,
        averia: Boolean,
        averiaProd: Boolean
    },
  
})

module.exports = mongoose.model('Data', saliclorData)

//TODO: Como se hace referencia en el post a la alarma ya que esta dentro de otro array?