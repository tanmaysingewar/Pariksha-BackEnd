const mongoose = require('mongoose');
const {Schema} = mongoose

const subjectSchema = new Schema({
    courceCode : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    courceName : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    registeredStudent  :{
        type : Number,
        required : true,
        trim : true
    },
})

module.exports = mongoose.model('Subject',subjectSchema)