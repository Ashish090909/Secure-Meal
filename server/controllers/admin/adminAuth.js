const Admin = require('../../models/admin') ;
const asyncHandler = require('express-async-handler') ;
const jwt = require('jsonwebtoken') ;
const bcrypt = require('bcrypt') ;

// 1. POST
// url = /api/auth/admin/register

const adminRegister = asyncHandler( async(req, res)=>{
      const {email, password, name, instituteId, number} = req.body ;
      console.log(req.body);
      if(!email || !password || !name || !instituteId || !number){
            res.status(401) ;
            throw new Error("All fields are mandatory!! ") ;
      }
      const existAdmin= await Admin.findOne({email}) ;
      if(existAdmin){
            res.status(401) ;
            throw new Error("User with same details already exist") ;
      }
      const hashPassword = await bcrypt.hash(password, 10) ;

      const newAdmin = await Admin.create({
            email,
            password: hashPassword,
            name,
            instituteId,
            number,
      }) ;
      if(newAdmin){
            res.status(200).json({_id: newAdmin.id, email: newAdmin.email, name:newAdmin.name, admin:true}) ;
      }
      else{
            res.status(401) ;
            throw new Error("User is not valid") ;
      }
}) ;


// 2. POST
//url = /api/auth/admin/login

const adminLogin = asyncHandler( async(req, res) =>{
      const {email, password} = req.body ;
      if(!email || !password) {
            res.status(400) ;
            throw new Error("All fields are mandatory!! ") ;
      }
      const admin = await Admin.findOne({email}) ;
      if(admin && (await bcrypt.compare(password, admin.password))){
            const accessToken = jwt.sign({
                  admin:{
                        id:admin.id,
                  }
            },
            process.env.SECRET_ACCESS_TOKEN,
            {expiresIn:"1m"}
            ) ;
            res.status(200).json({token: accessToken, email: email, name: admin.name, admin:true}) ;
      }
      else{
            res.status(401) ;
            throw new Error("User is not valid") ;
      }
})

module.exports = {adminRegister, adminLogin} ;