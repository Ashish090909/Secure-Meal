const asyncHandler = require("express-async-handler");

const { qrAssignor } = require("../../middleWare/qrAssignor");
const { setSomeValue } = require("../../config/globalVariables");

const meal = require("../../models/meal");
const Student = require("../../models/student");
const Admin = require("../../models/admin");
const Review = require("../../models/review");

const { verifyTokens, updateQR } = require("../../middleWare/verifyToken");
const admin = require("../../models/admin");


//0
// GET - api/operation/student/get-details/:gmail
const check = asyncHandler(async (req, res) => {
  const email = req.params.email;
  const admin = await Admin.findOne({email}) ;
  if(admin) res.status(200).json(admin) ;
  else{
    res.status(401) ;
    throw new Error("Not a valid user");
  }
});
// 1. POST
// Desc -> it set qr code for each student of particular hostel
// Input -> time of all the meal
// url -> /api/operation/admin/set-time/:email

const adminSetqr = asyncHandler(async (req, res) => {
  const email = req.params.email;
  const hostel = Number(email.substring(0, 2));
  const {
    mealOneS,
    mealOneE,
    mealTwoS,
    mealTwoE,
    mealThreeS,
    mealThreeE,
    mealFourS,
    mealFourE,
  } = req.body;

  const mealTime = {
    mealOneS,
    mealOneE,
    mealTwoS,
    mealTwoE,
    mealThreeS,
    mealThreeE,
    mealFourS,
    mealFourE,
  };
  setSomeValue(mealTime);
  //set time 15 min before
  if (mealOneS && mealOneE) {
    const validTime = {
      startTime: mealOneS,
      endTime: mealOneE,
    };
    const status = await qrAssignor(validTime, 1, hostel);
    // console.log(status);
  }
  if (mealTwoS && mealTwoE) {
    const validTime = {
      startTime: mealTwoS,
      endTime: mealTwoE,
    };
    const status = await qrAssignor(validTime, 2, hostel);
  }
  if (mealThreeS && mealThreeE) {
    const validTime = {
      startTime: mealThreeS,
      endTime: mealThreeE,
    };
    const status = await qrAssignor(validTime, 3, hostel);
  }
  if (mealFourS && mealFourE) {
    const validTime = {
      startTime: mealFourS,
      endTime: mealFourE,
    };
    const status = await qrAssignor(validTime, 4, hostel);
  }
  res.status(401);
  throw new Error("Qr not generated")
});
// 1. POST
// url -> /api/operation/admin/verify-student/:email
const adminCheckqr = asyncHandler(async (req, res) => {
  const data = req.body;
  // console.log(data);
  const email = data.studentDetails.email;
  const hostelNumber = data.studentDetails.hostelNumber;
  const validTime = data.validitiy;
  const mealNumber = data.mealNumber;
  const date = data.date;

  const student = await Student.findOne({ email });
  if (!student) {
    res.status(401);
    throw new Error("Not a valid user");
  }
  if (mealNumber === 1) {
    const result = await verifyTokens(validTime, date);
    if (result) {
      //change in qrschema
      const updation = await updateQR(email, hostelNumber, 1);
      if (updation) {
        res.status(200).json({ message: "correct user" });
      } else {
        res.status(401);
        throw new Error("Not a valid user");
      }
    } else {
      res.status(401);
      throw new Error("Not a valid user");
    }
  } else if (mealNumber === 2) {
    const result = await verifyTokens(validTime, date);
    if (result) {
      const updation = await updateQR(email, hostelNumber, 2);
      if (updation) {
        res.status(200).json({ message: "correct user" });
      } else {
        // console.log("rigiktktk");
        res.status(401);
        throw new Error("Not a valid user");
      }
    } else {
      // res.status(401);
      // throw new Error("Not a valid qr code!!");
      res.status(401);
      throw new Error("Not a valid user");
    }
  } else if (mealNumber === 3) {
    const result = await verifyTokens(validTime, date);
    if (result) {
      const updation = await updateQR(email, hostelNumber, 3);
      if (updation) {
        res.status(200).json({ message: "correct user" });
      } else {
        res.status(401);
        throw new Error("Not a valid user");
      }
    } else {
      res.status(401);
      throw new Error("Not a valid user");
    }
  } else if (mealNumber === 4) {
    const result = await verifyTokens(validTime, date);
    if (result) {
      const updation = await updateQR(email, hostelNumber, 4);
      if (updation) {
        res.status(200).json({ message: "correct user" });
      } else {
        res.status(401);
        throw new Error("Not a valid user");
      }
    } else {
      res.status(401);
      throw new Error("Not a valid user");
    }
  } else {
    // console.log("bading");
    res.status(401);
    throw new Error("Not a valid qr code!!");
  }
});

//2. POST
// url -> /api/operation/admin/update-hostel-menu/:email
const updateMenu = asyncHandler(async (req, res) => {
  const email = req.params.email;
  const hostel = await meal.findOne({ email });
  const menu = req.body;
  if (hostel) {
    const updatedMeal = await meal.findOneAndUpdate(
      { email },
      { routine: menu }
    );
    if (updateMenu) {
      res.status(200).json({ message: "updated" });
    } else {
      res.status(401);
      throw new Error("some internal error");
    }
    console.log("present");
  } else {
    console.log("not present");
    const hostel = Number(email.substring(0, 2));
    const newMeal = await meal.create({
      email,
      hostelNumber: hostel,
      routine: menu,
    });
    if (newMeal) {
      res.status(200).json({ message: "successfully created for new hostel" });
    } else {
      res.status(401);
      throw new Error("some internal error");
    }
  }
});

//3. get menu
// GET - api/operation/admin/get-meal-timetable/:email
const getMenu = asyncHandler(async (req, res) => {
  const email = req.params.email;
  let hostelNumber = 0;
  const admin = await Admin.findOne({ email });
  // console.log(admin);
  if (admin) hostelNumber = admin.hostelNumber;
  const timetable = await meal.findOne({ email: email });
  if (timetable) {
    res.status(200).json(timetable.routine);
  } else {
    res
      .status(404)
      .json({ message: "time table is not present or not generated" });
  }
  res.status(404);
  throw new Error("User is not valid");
});

//4. get review
// GET - api/operation/admin/get-review

const getReview = asyncHandler(async (req, res) => {
  const review = await Review.find({});
  if (review) res.status(200).json({ message: "review send" });
  else {
    res.status(401);
    throw new Error("Not found");
  }
});

module.exports = { check, adminSetqr, adminCheckqr, updateMenu, getMenu };
