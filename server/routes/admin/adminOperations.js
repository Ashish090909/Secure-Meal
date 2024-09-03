const express = require('express') ;
const { adminSetqr, adminCheckqr, updateMenu, getMenu, check } = require('../../controllers/admin/adminOps');
const router = express.Router()

router.route('/get-details/:email').get(check) ;
router.route('/set-time/:email').post(adminSetqr) ;
router.route('/verify-student/:email').post(adminCheckqr)
router.route('/update-hostel-menu/:email').post(updateMenu) ;
router.route('/get-meal-timetable/:email').get(getMenu) ;


module.exports = router ;