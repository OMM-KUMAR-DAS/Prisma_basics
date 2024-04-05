const express= require('express')

const router= express.Router()


const {creatingtodo,gettingtodos,pagination,deleteparticular_todo}= require('../controllers/Todo')


router.post('/newtodo',creatingtodo)

router.get('/listoftodos',gettingtodos)

router.get('/limit_results',pagination)

router.delete('/delete_todo',deleteparticular_todo)

module.exports=router