const Room = require('../models/room');

exports.createRoom = (req,res) => {
    const room = new Room(req.body);
    room.save()
    .then((room) => {
        if(!room){
            return res.status(400).json({
                success : false,
                message : "Room is not created",
            })
        }
        return res.json({
            success : true,
            message : "Room is created successfully",
            data : room
        })
    })
    .catch((err) => {
        return res.status(400).json({
            success : false,
            message : "Room is not created",
            err: err
        })
    })
}

exports.getRoom = (req,res) => {
    Room.find()
    .then((room) => {
        if(!room){
            return res.status(400).json({
                success : false,
                message : "Room is not found",
            })
        }
        return res.json({
            success : true,
            message : "Room is found successfully",
            data : room
        })
    })
    .catch((err) => {
        return res.status(400).json({
            success : false,
            message : "Room is not created",
            err: err
        })
    })
}   

exports.getRoomById = (req,res) => {
    Room.findById(req.query.id)
    .then((room) => {
        if(!room){
            return res.status(400).json({
                success : false,
                message : "Room is not found",
            })
        }
        return res.json({
            success : true,
            message : "Room is found successfully",
            data : room
        })
    })
    .catch((err) => {
        return res.status(400).json({
            success : false,
            message : "Room is not created",
            err: err
        })
    })
}

exports.updateRoom = (req,res) => {
    Room.findByIdAndUpdate(req.query.id, {
        roomNumber : req.body.roomNumber,
        roomCapacity : req.body.roomCapacity
    },{new: true})
    .then((room) => {
        if(!room){
            return res.status(400).json({
                success : false,
                message : "Room is not found",
            })
        }
        return res.json({
            success : true,
            message : "Room is updated successfully",
            data : room
        })
    })
    .catch((err) => {
        return res.status(400).json({
            success : false,
            message : "Room is not created",
            err: err
        })
    })
}

exports.deleteRoom = (req,res) => {
    Room.findByIdAndDelete(req.query.id)
    .then((room) => {
        if(!room){
            return res.status(400).json({
                success : false,
                message : "Room is not found",
            })
        }
        return res.json({
            success : true,
            message : "Room is deleted successfully",
            data : room
        })
    })
    .catch((err) => {
        return res.status(400).json({
            success : false,
            message : "Room is not created",
            err: err
        })
    })
}