const asyncHandler = require("express-async-handler");

const { dateFormatter } = require("../middleWare/dateFormatter");

const QRCs = require("../models/qrCodes");

const compareTime = (str1, str2) => {
  if (str1 === str2) {
    return 0;
  }
  let time1 = str1.split(":");
  let time2 = str2.split(":");
  if (eval(time1[0]) > eval(time2[0])) {
    return 1;
  } else if (
    eval(time1[0]) == eval(time2[0]) &&
    eval(time1[1]) > eval(time2[1])
  ) {
    return 1;
  } else {
    return -1;
  }
};
const verifyTokens = asyncHandler(async (validTime, date) => {
  // let hour = currentDate.getHours();

  const dt = new Date();
  dt.setHours(0, 0, 0, 0);
  const dateNow = await dateFormatter(dt);
  let d = new Date();
  let hours = d.getHours();
  let minutes = d.getMinutes();
  // hours = hours % 12;
  // hours = hours ? hours : 12;
  // minutes = minutes < 10 ? '0'+minutes : minutes;
  let strTime = hours + ":" + minutes;
  // console.log(compareTime(validTime.startTime , strTime));
  if ((compareTime(validTime.startTime , strTime)===-1 || compareTime(validTime.startTime , strTime)===0) && (compareTime(strTime,  validTime.endTime)===-1 || compareTime(strTime,  validTime.endTime)===0))
  {
    // console.log("good");
    return true ;
  }
  // else{
  //   console.log("bad");
  // }
  // console.log("time- ", validTime.startTime, strTime, validTime.endTime);
  // console.log("date- ", dateNow, date); 
  // if (dateNow === date && hour >= Number(validTime.startTime) && hour <= Number(validTime.endTime)) {
  //   return true;
  // }
  return false;
});

const updateQR = asyncHandler(async (email, hostelNumber, mealNumber) => {
  const codeNumber = "qrCode" + mealNumber;
  const student = await QRCs.findOne({ email, hostelNumber });
  const len = student.studentQr.length - 1;
  if (mealNumber === 1 && student.studentQr[len].qrCode1.code === null) {
    return false;
  } else if (mealNumber === 2 && student.studentQr[len].qrCode2.code === null) {
    return false;
  } else if (mealNumber === 3 && student.studentQr[len].qrCode3.code === null) {
    return false;
  } else if (mealNumber === 4 && student.studentQr[len].qrCode4.code === null) {
    return false;
  }
  const updation = await QRCs.findOneAndUpdate(
    { email, hostelNumber },
    {
      $set: {
        [`studentQr.$[elem].${codeNumber}`]: {
          code: null,
          status: true,
        },
      },
    },
    {
      arrayFilters: [{ elem: { $exists: true } }],
      new: true,
    }
  );
  if (updation) return true;
  return false;
});

module.exports = { verifyTokens, updateQR };
