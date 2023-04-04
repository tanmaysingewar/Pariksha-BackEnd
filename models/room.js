const mongoose = require('mongoose');
const {Schema} = mongoose

const roomSchema = new Schema({
    roomId : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    roomCapacity : {
        type : Number,
        required : true,
        trim : true,
    }
})

module.exports = mongoose.model('Room',roomSchema)