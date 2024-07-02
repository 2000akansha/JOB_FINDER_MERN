import { catchAsyncErrors } from "../middlewares/catchAsyncerror.js";
// import { Emp } from "../models/employerSchema.js";
import { JobSeeker } from "../models/jobseekerSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, workStatus} = req.body;
  if (!name || !email || !phone || !password || !workStatus) {
    return next(new ErrorHandler("Please fill full form!"));
  }
  const isEmail = await JobSeeker.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }
  const user2 = await JobSeeker.create({
    name,
    email,
    phone,
    password,
    workStatus,
  
  });
  const token = user2.getJWTToken();
  console.log(token)
  sendToken(user2, 201, res, "Job Seeker Registered!",token);
});

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
      return next(new ErrorHandler("Please provide email and password.", 400));
  }
  const user2 = await JobSeeker.findOne({ email }).select("+password");
  if (!user2) {
      return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  const isPasswordMatched = await user2.comparePassword(password);
  if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  sendToken(user2, 201, res, "Job Seeker Logged In!"); // Updated variable name from user to user2
});
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Job Seeker Logged Out Successfully.",
    });
});


export const getUser2 = catchAsyncErrors((req, res, next) => {
  const user = req.user2;
  res.status(200).json({
    success: true,
    user,
  });
});
