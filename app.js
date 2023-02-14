const express = require('express')
const swagerDoc = require('swagger-jsdoc')
const swaggerUi = require('swagger-ui-express')

const app = express()
const { testModel } = require('./src/models/test.model.js')
const routes = require('./src/routes')

app.use(express.json())

const swaggerDefinition = {
    info: {
      title: 'API REST',
      description: ''
    },
    servers: ['http://localhost:5000'],
    components: {
      TestModel: testModel
    }
  }

const swaggerOptions = {
    swaggerDefinition,
    apis: ['./src/routes/*.js']
}

app.use('/', routes)
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swagerDoc(swaggerOptions))
)

//Global error Handling

app.use(function(err , _req, res){
    console.log(err.stack)
    res.status(500).json({
        status: 500,
        Massage: "Insernal Server Error"
    })
})

app.listen(5000, () =>{
    console.log("server is run on http://localhost:5000")
    console.log("Api Docs is run on http://localhost:5000/api-docs")
})