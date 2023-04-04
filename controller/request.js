const Request = require('../models/request');
const CreateSchedule = require('../models/createSchedule');

exports.createRequest = (req,res) => {
    const request = new Request(req.body);
    request.save()
    .then((request) => {
        if(!request){
            return res.status(400).json({
                success : false,
                message : "Request is not created",
            })
        }
        return res.json({
            success : true,
            message : "Request is created successfully",
            data : request
        })
    })
    .catch((err) => {
        return res.status(400).json({
            success : false,
            message : "Request is not created",
            data : err
        })
    })
}

exports.getRequest = (req,res) => {
    Request.find()
    .then((request) => {
        if(!request){
            return res.status(400).json({
                success : false,
                message : "Request is not found",
            })
        }
        return res.json({
            success : true,
            message : "Request is found successfully",
            data : request
        })
    })
    .catch((err) => {
        return res.status(400).json({
            success : false,
            message : "Request is not created",
            data : err
        })
    })
}

exports.deleteRequest = (req,res) => {
    Request.findByIdAndDelete(req.query.id)
    .then((request) => {
        if(!request){
            return res.status(400).json({
                success : false,
                message : "Request is not found",
            })
        }
        return res.json({
            success : true,
            message : "Request is deleted successfully",
            data : request
        })
    })
    .catch((err) => {
        return res.status(400).json({
            success : false,
            message : "Request is not created",
            data : err
        })
    })
}

exports.acceptRequest = (req,res) => {
    console.log(req.query.scheduleId)
    console.log(req.body.facultyId)
    console.log(req.body.facultyName)
    // CreateSchedule.findById(req.query.scheduleId)
    // CreateSchedule.updateOne({_id: req.query.scheduleId}, {$set: {"faculties.$.facultyId": req.facultyId, "faculties.$.facultyName": req.facultyName} }, {new: true})
    // CreateSchedule.findByIdAndUpdate(req.query.scheduleId, {$set: {"faculties.$.facultyId": req.body.facultyId, "faculties.$.facultyName": req.body.facultyName} }, {new: true})
    CreateSchedule.updateOne({
        _id: req.query.scheduleId,
        faculties : {
            $elemMatch : {
                facultyId : req.query.facultyId
            }
        }
        // 'faculties.facultyId':{"$elemMatch":{'name':'Math'}}
    }, {
        $set : {
            "faculties.$.facultyId" : req.body.facultyId,
            "faculties.$.facultyName" : req.body.facultyName
        }
    }, {new: true})
    .then((createSchedule) => {
        console.log(createSchedule)
        if(!createSchedule){
            return res.status(400).json({
                success : false,
                message : "Schedule is not edited",
            })
        }else{
            Request.findByIdAndDelete(req.body.request_id)
            .then((request) => {
                if(!request){
                    return res.status(400).json({
                        success : false,
                        message : "Request is not found",
                    })
                }
                return res.json({
                    success : true,
                    message : "Done Edit",
                    data : createSchedule
                })
            }
            )
            .catch((err) => {
                return res.status(400).json({
                    success : false,
                    message : "Request is not created",
                    data : err
                })
            }
            )
        }
        
    }
    )
    .catch((err) => {
        return res.status(400).json({
            success : false,
            message : "Schedule is not found",
            data : err
        })
    }
    )
}

