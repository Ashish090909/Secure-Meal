const express = require('express') ;
const { studentRegister, studentLogin } = require('../../controllers/student/studentAuth');
const router = express.Router() ;

router.route('/register').post(studentRegister) ;
router.route('/login').post(studentLogin) ;

module.exports = router ;
