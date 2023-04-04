const Subject = require('../models/subject')

exports.createSubject = (req,res) => {
    const subject = new Subject(req.body)
    subject.save()
    .then((subject) => {
        if(!subject){
            return res.status(400).json({
                success : false,
                message : "Subject is not created",
            })
        }
        return res.json({
            success : true,
            message : "Subject is created successfully",
            data : subject
        })
    })
    .catch((err) => {
        return res.status(400).json({
            success : false,
            message : "Subject is not created",
            err: err
        })
    })
}

exports.getSubject = (req,res) => {
    Subject.find()
    .then((subject) => {
        if(!subject){
            return res.status(400).json({
                success : false,
                message : "Subject is not found",
            })
        }
        return res.json({
            success : true,
            message : "Subject is found successfully",
            data : subject
        })
    })
    .catch((err) => {
        return res.status(400).json({
            success : false,
            message : "Subject is not created",
            err: err
        })
    })
}

exports.getSubjectById = (req,res) => {
    Subject.findById(req.query.id)
    .then((subject) => {
        if(!subject){
            return res.status(400).json({
                success : false,
                message : "Subject is not found",
            })
        }
        return res.json({
            success : true,
            message : "Subject is found successfully",
            data : subject
        })
    })
    .catch((err) => {
        return res.status(400).json({
            success : false,
            message : "Subject is not created",
            err: err
        })
    })
}

exports.updateSubject = (req,res) => {
    const {courceCode, courceName, registeredStudent} = req.body;
        Subject.findByIdAndUpdate(req.query.id, {
            courceCode : courceCode,
            courceName : courceName,
            registeredStudent : registeredStudent
        },{new: true})

    .then((subject) => {
        if(!subject){
            return res.status(400).json({
                success : false,
                message : "Subject is not found",
            })
        }
        return res.json({
            success : true,
            message : "Subject is updated successfully",
            data : subject
        })
    })
    .catch((err) => {
        return res.status(400).json({
            success : false,
            message : "Subject is not created",
            err: err
        })
    })
}

exports.deleteSubject = (req,res) => {
    Subject.findByIdAndDelete(req.query.id)
    .then((subject) => {
        if(!subject){
            return res.status(400).json({
                success : false,
                message : "Subject is not found",
            })
        }
        return res.json({
            success : true,
            message : "Subject is deleted successfully",
            data : subject
        })
    })
    .catch((err) => {
        return res.status(400).json({
            success : false,
            message : "Subject is not created",
            err: err
        })
    })
}







