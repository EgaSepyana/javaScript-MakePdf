const joi = require('joi')
const swagModel = require('joi-to-swagger')

const testSchema = joi.object({
    name: joi.string().required(),
    address: joi.object({
        city: joi.string().required(),
        country: joi.string().required()
    }),
    old: joi.number().required() 
})

const { swagger: testModel } = swagModel(testSchema)

module.exports = {
    testModel
}