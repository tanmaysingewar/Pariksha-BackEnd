const express = require('express')
const { getRoom, createRoom, getRoomById, updateRoom, deleteRoom } = require('../controller/room')
const router = express.Router()

// Room Routes

router.get('/room/show/all',getRoom)

router.post('/room/create',createRoom)

router.delete('/room/delete',deleteRoom)

router.put('/room/update',updateRoom)

router.get('/room',getRoomById)

module.exports = router;  