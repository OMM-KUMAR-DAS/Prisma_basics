const express= require('express')

const router= express.Router()

const {adding_participant,getting_p,deleting_boys}= require('../controllers/Participate')

router.post('/participate',adding_participant)

router.get('/boys/participates',getting_p)

router.post('/boys/delete',deleting_boys)


module.exports=router