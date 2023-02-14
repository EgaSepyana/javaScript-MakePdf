const router = require('express').Router()
const {failed} = require('../utils/response')
const PdfPrinter = require('pdfmake')
const vfsFonts = require('pdfmake/build/vfs_fonts')
const fs = require('fs')

const fonts = { 
    Roboto : {
        normal: Buffer.from(vfsFonts.pdfMake.vfs['Roboto-Regular.ttf'], 'base64'),
        bold: Buffer.from(vfsFonts.pdfMake.vfs['Roboto-Medium.ttf'], 'base64'),
        italics: Buffer.from(vfsFonts.pdfMake.vfs['Roboto-Italic.ttf'], 'base64'),
        bolditalics: Buffer.from(vfsFonts.pdfMake.vfs['Roboto-MediumItalic.ttf'],'base64'),
  }
}
const Printer = new PdfPrinter(fonts)
/**
 * @swagger
 * /generete/test:
 *  post:
 *     summary: Test Swagger
 *     tags:
 *       - Test
 *     consumes:
 *     parameters:
 *       - in: body
 *         name: test
 *         schema: {$ref: "#/components/TestModel"}
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.post('/test', (req, res) =>{
    try{
        const payload = {
            name: req.body.name,
            address:{
                city: req.body.address.city,
                country : req.body.address.country
            },
            old: req.body.old
        }

        res.json(payload)
    }
    catch(err){
        console.log(err)
        res.status(400).json(
            failed(400, "Someting Wrong")
        )
    }
})

/**
 * @swagger
 * /generete:
 *  get:
 *     summary: Test Swagger
 *     tags:
 *       - Generate
 *     consumes:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */
router.get('/', (req, res) =>{
    try{

        var docDefinition = {
            content: [
                // if you don't need styles, you can use a simple string to define a paragraph
                'This is a standard paragraph, using default style',
            
                // using a { text: '...' } object lets you set styling properties
                { text: 'This paragraph will have a bigger font', fontSize: 15 },
            
                // if you set the value of text to an array instead of a string, you'll be able
                // to style any part individually
                {
                  text: [
                    'This paragraph is defined as an array of elements to make it possible to ',
                    { text: 'restyle part of it and make it bigger ', fontSize: 15 },
                    {text: 'than the rest.', bold:true}
                  ]
                }
              ]
        };

        let options = {}

        let pdfDoc = Printer.createPdfKitDocument(docDefinition, options)
        pdfDoc.pipe(fs.createWriteStream('public/temp/result40.pdf'))
        pdfDoc.end()
        
        setTimeout(() =>{
            res.download('public/temp/result40.pdf')
        }, 1000)
    }
    catch(err){
        console.log(err)
        res.status(400).json(
            failed(400, "Failed Generete")
        )
    }
})


// Export Module
module.exports = router
