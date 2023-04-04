const mongoose = require('mongoose');
const {Schema} = mongoose

const headNewsSchema = new Schema({
    scheduleId : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    facultyId :{
        type : String,
        required : true,
        trim : true
    },
    facultyName : {
        type : String,
        required : true,
        trim : true
    },
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
    room :{
        type : String,
        required : true
    }
})

module.exports = mongoose.model('HeadNews', headNewsSchema)