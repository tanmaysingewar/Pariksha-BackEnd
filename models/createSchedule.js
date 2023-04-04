const mongoose = require('mongoose');
const {Schema} = mongoose

const ScheduleSchema = new Schema({
    courceCode : {
        type : String,
        required : true,
        trim : true
    },
    courceName : {
        type : String,
        required : true,
        trim : true
    },
    date : {
        type : String,
        required : true,
        trim : true
    },
    time : {
        type : String,
        required : true
    },
    faculties : [{
        facultyId : {
            type : String,
            trim : true
        },
        facultyName : {
            type : String,
            trim : true,
        }
    }],
    rooms : [{
        roomId : {
            type : String,
            trim : true
        },
        givenRoomId : {
            type : String,
            trim : true
        }
    }]
})

module.exports = mongoose.model('Schedule',ScheduleSchema)