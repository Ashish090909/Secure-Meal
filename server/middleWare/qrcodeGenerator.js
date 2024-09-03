//return only qr code
const qrcode = require("qrcode");
const asyncHandler = require("express-async-handler");
const {dateFormatter} = require("../middleWare/dateFormatter");

const genQRcode = asyncHandler(async (element, validTime, mealNumber) => {
  const dt = new Date();
  dt.setHours(0, 0, 0, 0);
  const date = await dateFormatter(dt);
  data = {
    studentDetails: element,
    validitiy: validTime,
    mealNumber: mealNumber,
    date: date,
  };
  const jsonData = JSON.stringify(data);
  // console.log(jsonData);
  const qrDataUrl = await qrcode.toDataURL(jsonData);

  return qrDataUrl;
});

module.exports = { genQRcode };
