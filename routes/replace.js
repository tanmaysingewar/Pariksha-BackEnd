const express = require('express')
const { createRequest, getRequest, deleteRequest, acceptRequest } = require('../controller/request')
const router = express.Router()

// Replace Faculty Routes
router.post('/replace/request',createRequest)

router.get('/replace/show/all',getRequest)

router.delete('/replace/delete',deleteRequest) // Deletes the request

router.post('/replace/accept',acceptRequest) // Accepts the request and changes the faculty

module.exports = router;  