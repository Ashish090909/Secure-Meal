//assign only qr code
const asyncHandler = require("express-async-handler");
const Student = require("../models/student");
const { genQRcode } = require("../middleWare/qrcodeGenerator");
const QRCs = require("../models/qrCodes");
const {dateFormatter} = require('../middleWare/dateFormatter') ;

const qrAssignor = asyncHandler(async (validTime, mealNumber, hostel) => {

  const allStudent = await Student.find();
  // console.log(allStudent);
  for (let index = 0; index < allStudent.length; index++) {
    const element = await allStudent[index];
    //need to generate the qr code for specific hostel student only
    const studentData = {
      email: element.email,
      name: element.name,
      roll: element.roll,
      hostelNumber: element.hostelNumber
    } ;
    console.log(element.hostelNumber, hostel);
    if(element.hostelNumber !== hostel ) continue ;
    // console.log("raj");
    const qrcode = await genQRcode(studentData, validTime, mealNumber);
    // console.log(qrcode);

    const dt = new Date() ;
    dt.setHours(0, 0, 0, 0);
    const date = await dateFormatter(dt) ;

    const userEmail = element.email;
    const qruser = await QRCs.findOne({ email: userEmail });
    const userId = qruser.id ;
//     console.log(qruser.studentQr[qruser.studentQr.length - 1].date , date);
    if (
      (qruser && qruser.studentQr.length === 0) ||
      (qruser &&
        qruser.studentQr[qruser.studentQr.length - 1].date !== date)
    ) {
      //make
      if(qruser.studentQr.length){
            console.log(qruser.studentQr[qruser.studentQr.length - 1].date);
      }

      let qrCode1 = {
            code: "",
          };
          let qrCode2 = {
            code: "",
          };
          let qrCode3 = {
            code: "",
          };
          let qrCode4 = {
            code: "",
          };
          if (mealNumber === 1) {
            qrCode1.code = qrcode;
          }
          else if(mealNumber === 2){
            qrCode2.code = qrcode;
          }
          else if(mealNumber === 3){
            qrCode3.code = qrcode;
          }
          else{
            qrCode4.code = qrcode;
          }
          const newStudentQr = {
            date: date,
            qrCode1,
            qrCode2,
            qrCode3,
            qrCode4,
          };
      // console.log("make ",mealNumber);
      const updatedStudent = await QRCs.findOneAndUpdate(
        { _id: qruser.id },
        { $push: { studentQr: newStudentQr } },
        { new: true }
      );
      // console.log(updatedStudent);
    } else {
      const studentQrIndex = qruser.studentQr.length - 1;
      const propertyName = 'qrCode'+mealNumber ;
      const updatedStudent = await QRCs.findOneAndUpdate(
        {
          _id: userId, // Match the specific studentQr object using its index
        },
        {
            "$set": {[`studentQr.${studentQrIndex}.${propertyName}.code`]: qrcode} ,
        },
        { new: true }
      );
      // console.log(updatedStudent);
    }
  }
  return 200;
});

module.exports = { qrAssignor };
