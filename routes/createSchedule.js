const express = require('express')
const { getSchedule, deleteSchedule, updateSchedule, getScheduleById, createScheduleControler, getAllFacultyList, getAllRoomList, getAllCourceList, getFacultyList, getScheduleListByFacultyId, getRoomList } = require('../controller/createSchedule')
const router = express.Router()

// Create Schedule Routes

router.get('/courceCode/all',getAllCourceList)

router.get('/schedule/faculty',getFacultyList)

router.get('/schedule/room',getRoomList)

router.post('/schedule/update',updateSchedule)

router.delete('/schedule/delete',deleteSchedule)

router.get('/schedule',getScheduleById)

router.post('/schedule/create',createScheduleControler)

// View Schedule Routes

router.get('/schedule/view/all',getSchedule)

router.get('/schedule/selected/faculty',getScheduleListByFacultyId)

module.exports = router;  