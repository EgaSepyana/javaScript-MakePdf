const router = require('express').Router()
const generete = require('../routes/generete.route.js')

router.use('/generete', generete)

module.exports = router