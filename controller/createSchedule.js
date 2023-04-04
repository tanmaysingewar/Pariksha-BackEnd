const CreateSchedule = require('../models/createSchedule');
const Faculty = require('../models/faculty');
const Room = require('../models/room');
const Subject = require('../models/subject');

exports.createScheduleControler = (req,res) => {
    const createSchedule = new CreateSchedule(req.body);

    const {courceCode, courceName, date, time, faculties, rooms} = req.body;

    console.log(req.body)

    if(!courceCode || !courceName || !date || !time || !faculties[0] || !rooms[0]){
        return res.status(422).json({
            success : false,
            message : "Some fileds are missing",
            err : "Bad Request, server understands the content but it was unable to process the contained instructions."
        })
    }

    console.log(req.body)
    createSchedule.save()
    .then((createSchedule) => {
        if(!createSchedule){
            return res.status(400).json({
                success : false,
                message : "Schedule is not created",
            })
        }
        return res.json({
            success : true,
            message : "Schedule is created successfully",
            data : createSchedule
        })
    })
    .catch((err) => {
        return res.status(400).json({
            success : false,
            message : "Schedule is not created",
            data : err
        })
    }
    )
}

exports.getSchedule = (req,res) => {
    CreateSchedule.find()
    .then((createSchedule) => {
        if(!createSchedule){
            return res.status(400).json({
                success : false,
                message : "Schedule is not found",
            })
        }
        return res.json({
            success : true,
            message : "Schedule is found successfully",
            data : createSchedule
        })
    })
}

// Get schedule by id

exports.getScheduleById = (req,res) => {
    CreateSchedule.findById(req.query.id)
    .then((createSchedule) => {
        if(!createSchedule){
            return res.status(400).json({
                success : false,
                message : "Schedule is not found",
            })
        }
        return res.json({
            success : true,
            message : "Schedule is found successfully",
            data : createSchedule
        })
    })
    .catch((err) => {
        return res.status(400).json({
            success : false,
            message : "Schedule is not found",
            err : err
        })
    })
}

// Update schedule
exports.updateSchedule = (req,res) => {
    CreateSchedule.findByIdAndUpdate(req.query.id, {
        courceCode : req.body.courceCode,
        courceName : req.body.courceName,
        date : req.body.date,
        time : req.body.time,
        faculties : req.body.faculties,
        rooms : req.body.rooms
    },{new: true})
    .then((createSchedule) => {
        if(!createSchedule){
            return res.status(400).json({
                success : false,
                message : "Schedule is not updated",
            })
        }
        return res.json({
            success : true,
            message : "Schedule is updated successfully",
            data : createSchedule
        })
    })
    .catch((err) => {
        return res.json({
            success : true,
            message : "Schedule is deleted successfully",
            err : err
        })
    })
}

// Delete schedule
exports.deleteSchedule = (req,res) => {
    CreateSchedule.findByIdAndDelete(req.query.id)
    .then((createSchedule) => {
        if(!createSchedule){
            return res.status(400).json({
                success : false,
                message : "Schedule is not found",
            })
        }
        return res.json({
            success : true,
            message : "Schedule is deleted successfully",
            data : createSchedule
        })
    })
    .catch((err) => {
        return res.json({
            success : true,
            message : "Schedule is deleted successfully",
            err : err
        })
    })
}

//  Get the faculty list who are not assigned to a schedule at a given time and date

exports.getFacultyList = (req,res) => {
    //  Get the faculty list who are not assigned to a schedule at a given time and date
    console.log(req.query.date, req.query.time)
    CreateSchedule.find({time: new RegExp('^'+req.query.time+'$', "i"), date: new RegExp('^'+req.query.date+'$', "i")})
    .then((createSchedule) => {
        console.log(createSchedule) 
        if(!createSchedule){
            return res.status(400).json({
                success : false,
                message : "Schedule is not found",
            })
        }
        // Remove the faculty are in createSchedule.faculties array from the all faculty list
        Faculty.find()
        .then((faculty) => {
            if(!faculty){
                return res.status(400).json({
                    success : false,
                    message : "Faculty is not found",
                })
            }
            let facultyList = [];
            faculty.forEach((fac) => {
                let flag = 0;
                createSchedule.forEach((sch) => {
                    console.log(sch.faculties)
                    // sch.faculties is arrey
                    sch.faculties.forEach((facu) => {
                        if(fac._id == facu.facultyId){
                            flag = 1;
                        }
                    }
                    )
                })
                if(flag == 0){
                    facultyList.push(fac);
                }
            })
            return res.json({
                success : true,
                message : "Faculty list is found successfully",
                data : facultyList
            })
        })
        .catch((err) => {
            return res.json({
                success : true,
                message : "Schedule is deleted successfully",
                err : err
            })
        })
    })
}

// Get the room list which are not assigned to a schedule at a given time and date

exports.getRoomList = (req,res) => {
    //  Get the faculty list who are not assigned to a schedule at a given time and date
    console.log(req.query.date, req.query.time)
    CreateSchedule.find({time: new RegExp('^'+req.query.time+'$', "i"), date: new RegExp('^'+req.query.date+'$', "i")})
    .then((createSchedule) => {
        console.log(createSchedule)
        if(!createSchedule){
            return res.status(400).json({
                success : false,
                message : "Schedule is not found",
            })
        }
        // Remove the faculty are in createSchedule.faculties array from the all faculty list
        Room.find()
        .then((room) => {
            if(!room){
                return res.status(400).json({
                    success : false,
                    message : "Room is not found",
                })
            }
            let roomList = [];

            room.forEach((rom) => {
                let flag = 0;
                createSchedule.forEach((sch) => {
                    console.log(sch.rooms)
                    // sch.faculties is arrey
                    sch.rooms.forEach((roo) => {
                        if(rom._id == roo.roomId){
                            flag = 1;
                        }
                    }
                    )
                })
                if(flag == 0){
                    roomList.push(rom);
                }
            })
            return res.json({
                success : true,
                message : "Room list is found successfully",
                data : roomList
            })
        })
        .catch((err) => {
            return res.json({
                success : true,
                message : "Schedule is deleted successfully",
                err : err
            })
        })
    })
}



// Give me all Cources name and Cource code 

exports.getCourceList = (req,res) => {
    Subject.find()
    .then((subject) => {
        if(!subject){
            return res.status(400).json({
                success : false,
                message : "Subject is not found",
            })
        }
        let courceList = [];
        subject.forEach((sub) => {
            let cource = {
                courceCode : sub.courceCode,
                courceName : sub.courceName
            }
            courceList.push(cource);
        })
        return res.json({
            success : true,
            message : "Cource list is found successfully",
            data : courceList
        })
    })
    .catch((err) => {
        return res.json({
            success : true,
            message : "Schedule is deleted successfully",
            err : err
        })
    })
}


// Write a function to get all faculty with projection on id and name

exports.getAllFacultyList = (req,res) => {
    Faculty.find({}, {name : 1, _id : 1})
    .then((faculty) => {
        if(!faculty){
            return res.status(400).json({
                success : false,
                message : "Faculty is not found",
            })
        }
        return res.json({
            success : true,
            message : "Faculty list is found successfully",
            data : faculty
        })
    })
    .catch((err) => {
        return res.json({
            success : true,
            message : "Schedule is deleted successfully",
            err : err
        })
    })
}

// Write a function to get all room with projection on id ,roomId and roomCapacity

exports.getAllRoomList = (req,res) => {
    Room.find({}, {roomId : 1, roomCapacity : 1, _id : 1})
    .then((room) => {
        if(!room){
            return res.status(400).json({
                success : false,
                message : "Room is not found",
            })
        }
        return res.json({
            success : true,
            message : "Room list is found successfully",
            data : room
        })
    })
    .catch((err) => {
        return res.json({
            success : true,
            message : "Schedule is deleted successfully",
            err : err
        })
    })
}

// get list of all courses with projection on id and courceName

exports.getAllCourceList = (req,res) => {
    Subject.find({})
    .then((subject) => {
        if(!subject){
            return res.status(400).json({
                success : false,
                message : "Subject is not found",
            })
        }
        return res.json({
            success : true,
            message : "Cource list is found successfully",
            data : subject
        })
    })
    .catch((err) => {
        return res.json({
            success : true,
            message : "Schedule is deleted successfully",
            err : err
        })
    })
}


// Get schedule list by faculty id

exports.getScheduleListByFacultyId = (req,res) => {
    console.log(req.query.facultyId)
    CreateSchedule.find({faculties : {"$elemMatch":{'facultyId': req.query.facultyId}}})
    .then((createSchedule) => {
        if(!createSchedule){
            return res.status(400).json({
                success : false,
                message : "Schedule is not found",
            })
        }
        return res.json({
            success : true,
            message : "Schedule list is found successfully",
            data : createSchedule
        })
    }
    );
}