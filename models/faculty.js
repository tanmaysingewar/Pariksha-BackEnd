const mongoose = require('mongoose');
const {Schema} = mongoose
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const facultySchema = new Schema({
    faculty_id :{
        type : String,
        required : true,
        trim : true,
        default : 'ID'
    },
    name :{
        type : String,
        required : true,
        trim : true
    },
    email :{
        type : String,
        required : true,
        trim : true
    },
    contact_no :{
        type : String,
        required : true,
        trim : true
    },
    invigilator :{
        type : Boolean,
        default : false,
        required : true,
        trim : true
    },
    ency_password : {
        type : String,
        required : true
    },
    salt : {
        type: String,
        required :true,
        unique : true
    }
})

facultySchema.virtual('password')
    .set(function(password){
        this._password = password
        this.salt = uuidv4()
        this.ency_password = this.securePassward(password)
    })
    .get(function(){
        return this._password
    })

facultySchema.methods = {
    authincate: function (plainPassowed){
        return this.securePassward(plainPassowed) == this.ency_password
    },
    securePassward : function (password){
        if(!password){
            return ''
        }
        try{
            return crypto.createHash('sha256', this.salt)
            .update(password)
            .digest("hex")
        }catch(e){
            return ''
        }
    }
}

module.exports = mongoose.model('Faculty',facultySchema)