const express= require("express")

const router= express.Router()

const {addingstudent}= require("../controllers/Student")

const {deletingstudent}= require("../controllers/Student")

const {gettingtodos_ofeach_student}= require("../controllers/Student")

const {updating_using_nestedwrites} = require("../controllers/Student")

router.post("/STUDENT",addingstudent);

// /:eventID/participants/boys
router.delete("/student/delete",deletingstudent);

router.get('/todoslist',gettingtodos_ofeach_student)

router.post('/nested_writes',updating_using_nestedwrites)


module.exports= router
