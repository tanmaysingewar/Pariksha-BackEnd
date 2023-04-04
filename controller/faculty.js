const Faculty = require('../models/faculty');
const jwt = require('jsonwebtoken'); //setting jwt token 

exports.createFaculty = (req,res) => {
    const {name, email, contact_no, password} = req.body;
    if(!name || !email ||!contact_no || !password){
        return res.status(422).json({
            success : false,
            message : "Some fileds are missing",
            err : "Bad Request, server understands the content but it was unable to process the contained instructions."
        })
    }

    const faculty = new Faculty({
        name,
        email,
        contact_no,
        password // Hashing will be handled by mongoose in modals --- check modals to see Hashing method !!
    });
 
   faculty.save()
   .then(function (models) {
        console.log(models);
        return res.json({
            success : true,
            message : "Faculty is created successfully",
            data : models
         })
    })
    .catch(function (err) {
        console.log(err);
        return res.status(400).json({
                success : false,
                message : 'Not able to save in DB'
            })
    });
}

exports.loginFaculty = (req,res) => {
    const {id, password} = req.body;
    if(!id || !password){
        return res.status(422).json({
            success : false,
            message : "Some fileds are missing",
            err : "Bad Request, server understands the content but it was unable to process the contained instructions."
        })
    }

    Faculty.findOne({email:id})
    .then((faculty) => {
        if(!faculty){
            return res.status(400).json({
                success : false,
                message : "Faculty is not found",
            })
        }

        if(!faculty.authincate(password)){
            return res.status(400).json({
                success : false,
                message : "Email and password do not match"
            })
        }

        const token = jwt.sign({_id:faculty._id},"new",{expiresIn:'1h'})
        const {_id,name,email,contact_no} = faculty;
        return res.json({
            success : true,
            message : "Faculty is logged in successfully",
            token,
            faculty : {_id,name,email,contact_no}
        })
    })
    .catch((err) => {
        console.log(err);
    }
    )
}

exports.getFaculty = (req,res) => {
    Faculty.find()
    .then((faculty) => {
        if(!faculty){
            return res.status(400).json({
                success : false,
                message : "Faculty is not found",
            })
        }
        return res.json({
            success : true,
            message : "Faculty is found successfully",
            data : faculty
        })
    })
    .catch((err) => {
        console.log(err);
    }
    )
}

exports.getFacultyById = (req,res) => {
    console.log(req.query._id);
    Faculty.findById(req.query._id)
    .then((faculty) => {
        if(!faculty){
            return res.status(400).json({
                success : false,
                message : "Faculty is not found",
            })
        }
        return res.json({
            success : true,
            message : "Faculty is found successfully",
            data : faculty
        })
    })
    .catch((err) => {
        console.log(err);
    }
    )
}

exports.updateFaculty = (req,res) => {
    const {name, email, contact_no} = req.body;
    if(!name || !email ||!contact_no ){
        return res.status(422).json({
            success : false,
            message : "Some fileds are missing",
            err : "Bad Request, server understands the content but it was unable to process the contained instructions."
        })
    }

    Faculty.findByIdAndUpdate(req.query._id, {
        name,
        email,
        contact_no
    },{new: true})
    .then((faculty) => {
        if(!faculty){
            return res.status(400).json({
                success : false,
                message : "Faculty is not found",
            })
        }
        return res.json({
            success : true,
            message : "Faculty is updated successfully",
            data : faculty
        })
    })
    .catch((err) => {
        console.log(err);
    }
    )
}

exports.deleteFaculty = (req,res) => {
    console.log(req.query)
    Faculty.findByIdAndDelete(req.query.id)
    .then((faculty) => {
        if(!faculty){
            return res.status(400).json({
                success : false,
                message : "Faculty is not found",
            })
        }
        return res.json({
            success : true,
            message : "Faculty is deleted successfully",
            data : faculty
        })
    })
    .catch((err) => {
        console.log(err);
    })
}

// Make invigilator true

exports.makeInvigilator = (req,res) => {
    console.log(req.query)
    Faculty.findByIdAndUpdate(req.query.id, {
        invigilator : true
    })
    .then((faculty) => {
        if(!faculty){
            return res.status(400).json({
                success : false,
                message : "Faculty is not found",
            })
        }
        return res.json({
            success : true,
            message : "Faculty is updated successfully",
            data : faculty
        })
    })
    .catch((err) => {
        console.log(err);
    })
}

// Make invigilator false
exports.makeInvigilatorFalse = (req,res) => {
    Faculty.findByIdAndUpdate(req.query.id, {
        invigilator : false
    })
    .then((faculty) => {
        if(!faculty){
            return res.status(400).json({
                success : false,
                message : "Faculty is not found",
            })
        }
        return res.json({
            success : true,
            message : "Faculty is updated successfully",
            data : faculty
        })
    })
    .catch((err) => {
        console.log(err);
    })
}

// Get factulty by invigilator true
exports.getInvigilator = (req,res) => {
    Faculty.find({invigilator:true})
    .then((faculty) => {
        if(!faculty){
            return res.status(400).json({
                success : false,
                message : "Faculty is not found",
            })
        }
        return res.json({
            success : true,
            message : "Faculty is found successfully",
            data : faculty
        })
    })
    .catch((err) => {
        console.log(err);
    })
}

// Get factulty by invigilator false
exports.getInvigilatorFalse = (req,res) => {
    Faculty.find({invigilator:false})
    .then((faculty) => {
        if(!faculty){
            return res.status(400).json({
                success : false,
                message : "Faculty is not found",
            })
        }
        return res.json({
            success : true,
            message : "Faculty is found successfully",
            data : faculty
        })
    })
    .catch((err) => {
        console.log(err);
    })
}





exports.test = (req,res) => {
    res.send('Hello World!')
}