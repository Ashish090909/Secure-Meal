const asyncHandler = require('express-async-handler') ;
function padTo2Digits(num) {
      return num.toString().padStart(2, '0');
    }
const dateFormatter = asyncHandler( async(date) => {
      return [
            date.getFullYear(),
            await padTo2Digits(date.getMonth() + 1),
            await padTo2Digits(date.getDate()),
          ].join('-');
}) ;

module.exports = {dateFormatter} ;