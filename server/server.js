require('dotenv').config() ;
const connectDB = require('./config/dataBaseConnection') ;
const express = require('express') ;
const cors =  require('cors') ;

const studentAuth = require('./routes/student/studentAuthorization') ;
const studentOperate = require('./routes/student/studentOperations') ;
const adminAuth = require('./routes/admin/adminAuthorizaton') ;
const adminOperate = require('./routes/admin/adminOperations') ;

const app = express() ;
app.use(express.json()) ;
connectDB() ;


app.use(cors()) ;
app.use('/api/auth/student', studentAuth) ;
app.use('/api/operation/student', studentOperate) ;
app.use('/api/auth/admin', adminAuth) ;
app.use('/api/operation/admin', adminOperate) ;


const port = process.env.PORT ;
app.listen(port, (req, res)=>{
      console.log('Port is running on port', port);
}) ;