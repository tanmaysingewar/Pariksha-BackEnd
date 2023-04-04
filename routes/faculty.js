const express = require('express')
const { createFaculty,test, loginFaculty, getFaculty, makeInvigilator, deleteFaculty, updateFaculty, getFacultyById, getInvigilator, getInvigilatorFalse, makeInvigilatorFalse } = require('../controller/faculty')
const router = express.Router()

// Faculty Routes

router.post('/faculty/create/account',createFaculty)

router.post('/faculty/login',loginFaculty)

// Admin Routes

router.get('/admin/show/faculty/all',getFaculty)

router.get('/admin/add/faculty',makeInvigilator)

router.get('/admin/remove/faculty',makeInvigilatorFalse)

router.delete('/admin/faculty/delete',deleteFaculty)

router.put('/admin/faculty/update',updateFaculty)

router.get('/admin/faculty',getFacultyById)

router.get('/admin/selected/faculty',getInvigilator)

router.get('/admin/unselected/faculty',getInvigilatorFalse)



router.get('/test',test)

module.exports = router;  