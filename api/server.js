const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const Param = require('./models/saliclor_par')
const Data = require('./models/saliclor_data')

const app = express()
const port = process.env.PORT || 3001


app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())



app.get('/api/saliclordata/:saliclorId', (req, res) =>{
    let saliclorId = req.params.saliclorId
    console.log(saliclorId)

    Data.find({saliclorId : saliclorId}, (err, data) =>{
        if(err) return res.status(500).send({message: `Error al realizar la petición ${err}`})
        if(!data) return res.status(404).send({message: `El id no ha sido encontrado`})
       

        res.status(200).send({ saliclor: data})
    }).limit(1).sort({'fecha':-1})
    
})

app.get('/api/saliclorparam/:saliclorId', (req, res) =>{
    let saliclorId = req.params.saliclorId
    console.log(saliclorId)

    Param.find({saliclorId : saliclorId}, (err, param) =>{
        if(err) return res.status(500).send({message: `Error al realizar la petición ${err}`})
        if(!param) return res.status(404).send({message: `El id no ha sido encontrado`})
       

        res.status(200).send({ saliclor: param})
    }).limit(1).sort({'fecha':-1})
    
})
/*
app.get('/api/product/:productId', (req, res) =>{
    
}) 

app.post('/api/product/', (req, res) =>{
    console.log('POST /api/product')
    console.log(req.body)

        
    let product = new Product()
    product.name = req.body.name
    product.picture = req.body.picture
    product.price = req.body.price
    product.category = req.body.category
    product.description = req.body.description

    product.save((err, productStored) => {
        if(err)
            res.status(500).send({message: `Error al salvar en la bbdd ${err}`})

        res.status(200).send({product: productStored})
    })
})*/

app.post('/api/saliclorparam/', (req, res) =>{
    console.log('POST /api/saliclorparam')
    console.log(req.body)

    let saliclor = new Param()
    saliclor.saliclorId = req.body.saliclorId
    saliclor.fecha = new Date()
    saliclor.produccionPar = req.body.produccionPar
    saliclor.polaridadPar = req.body.polaridadPar
    saliclor.phPar = req.body.phPar
    saliclor.redoxPar = req.body.redoxPar
    saliclor.cloroPar = req.body.cloroPar

    saliclor.save((err, productStored) => {
        if(err)
            res.status(500).send({message: `Error al salvar en la bbdd ${err}`})

        res.status(200).send({saliclor: productStored})
    })
})

app.post('/api/saliclordata/', (req, res) =>{
    console.log('POST /api/saliclordata')
    console.log(req.body)

    let saliclor = new Data()
    saliclor.modeloSaliclor = req.body.modeloSaliclor
    saliclor.saliclorId = req.body.saliclorId
    saliclor.alias = req.body.alias
    saliclor.numeroSerie = req.body.numeroSerie
    saliclor.fecha = new Date()
    //saliclor.produccionNivel = req.body.produccionNivel
    saliclor.horasOn = req.body.horasOn
    saliclor.sal = req.body.sal
    saliclor.tempAgua = req.body.tempAgua
    saliclor.flujo = req.body.flujo
    saliclor.phReal = req.body.phReal
    saliclor.redoxReal = req.body.redoxReal
    saliclor.cloroReal = req.body.cloroReal
    saliclor.vidaElectrodo = req.body.vidaElectrodo

    saliclor.save((err, productStored) => {
        if(err)
            res.status(500).send({message: `Error al salvar en la bbdd ${err}`})

        res.status(200).send({saliclor: productStored})
    })
})
/*
app.put('/api/product/:productId', (req, res) =>{

})

app.delete('/api/product/:productId', (req, res) =>{

})
*/

const queryParams = "authSource=admin&readPreference=primary&appname=api&directConnection=true&ssl=false";
const sConn = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?${queryParams}`;

console.log(sConn)

mongoose.connect(sConn, (err, res) => {
    if (err) { 
        console.log(err);
    }
    app.listen(port, () => {
        console.log(`API REST corriendo en http://localhost:${port}`)
    })
})
