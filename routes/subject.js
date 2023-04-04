const express = require('express')
const createSchedule = require('../models/createSchedule')
const { getSubject, getSubjectById, deleteSubject, updateSubject, createSubject } = require('../controller/subject')
const router = express.Router()

// Subject Routes

router.get('/subject/show/all',getSubject)

router.post('/subject/create',createSubject)

router.delete('/subject/delete',deleteSubject)

router.put('/subject/update',updateSubject)

router.get('/subject',getSubjectById)

module.exports = router;  