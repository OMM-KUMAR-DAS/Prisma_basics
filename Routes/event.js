const express= require('express')

const router= express.Router()

const {adding_event}= require('../controllers/Event')


router.post('/addevent',adding_event)



module.exports=router