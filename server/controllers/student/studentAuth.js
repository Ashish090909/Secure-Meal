const Student = require('../../models/student') ;
const QRCs = require('../../models/qrCodes') ;
const asyncHandler = require('express-async-handler') ;
const jwt = require('jsonwebtoken') ;
const bcrypt = require('bcrypt') ;

// 1. POST
// url = /api/auth/student/register

const studentRegister = asyncHandler( async(req, res)=>{
      console.log("body-> ",req.body);
      const {email, password, name, roll, branch, number, hostelNumber} = req.body ;
      if(!email || !password || !name || !roll || !branch || !number || !hostelNumber){
            res.status(400) ;
            throw new Error("All fields are mandatory!! ") ;
      }
      const existStudent= await Student.findOne({email}) ;
      if(existStudent){
            res.status(400) ;
            throw new Error("User with same details already exist") ;
      }
      const hashPassword = await bcrypt.hash(password, 10) ;

      const newStudent = await Student.create({
            email,
            password: hashPassword,
            name, 
            roll,
            branch,
            phone: number,
            hostelNumber,
      }) ;
      const newQRholder = await QRCs.create({
            email,
            hostelNumber,
      }) ;
      if(newStudent && newQRholder){
            res.status(200).json({_id: newStudent.id, email: newStudent.email, name: newStudent.name,roll: newStudent.roll  , admin:false}) ;
      }
      else{
            res.status(401) ;
            throw new Error("User is not valid") ;
      }
}) ;


// 2. POST
//url = /api/auth/student/login

const studentLogin = asyncHandler( async(req, res) =>{
      const {email, password} = req.body ;
      if(!email || !password) {
            res.status(400) ;
            throw new Error("All fields are mandatory!! ") ;
      }
      const student = await Student.findOne({email: email}) ;
      if(student && (await bcrypt.compare(password, student.password))){
            const accessToken = jwt.sign({
                  student:{
                        id:student.id,
                  }
            },
            process.env.SECRET_ACCESS_TOKEN,
            {expiresIn:"1m"}
            ) ;
            res.status(200).json({token: accessToken, email: email, name: student.name,roll: student.roll, admin:false}) ;
      }
      else{
            res.status(401) ;
            throw new Error("User is not valid") ;
      }
})

module.exports = {studentRegister, studentLogin} ;