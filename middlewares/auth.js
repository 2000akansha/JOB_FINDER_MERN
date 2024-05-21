// import { Emp } from "../models/employerSchema.js";
// import { catchAsyncErrors } from "./catchAsyncerror.js";
// import ErrorHandler from "./error.js";
// import jwt from "jsonwebtoken";

// export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
//   try {
//     const { token } = req.cookies;
//     if (!token) {
//       throw new ErrorHandler("User Not Authorized: Token Missing", 401);
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

//     // Check if the decoded ID exists in the database
//     const user = await Emp.findById(decoded.id);
//     // if (!user) {
//     //   throw new ErrorHandler("User Not Authorized: Invalid Token", 401);
//     // }

//     req.user = user;
//     next();
//   } catch (error) {
//     next(error); // Pass any caught errors to the error handling middleware
//   }
// });




import { Emp } from "../models/employerSchema.js";
import { JobSeeker } from "../models/jobseekerSchema.js";
import { catchAsyncErrors } from "./catchAsyncerror.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new ErrorHandler("User Not Authorized: Token Missing", 401);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    let user;

    // Check if the decoded ID exists in the database for employer
    user = await Emp.findById(decoded.id);
    if (user) {
      req.user = user;
      return next();
    }

    // Check if the decoded ID exists in the database for job seeker
    user = await JobSeeker.findById(decoded.id);
    if (user) {
      req.user = user;
      return next();
    }

    // If user is neither employer nor job seeker, throw an error
    throw new ErrorHandler("User Not Authorized: Invalid Token", 401);
  } catch (error) {
    next(error); // Pass any caught errors to the error handling middleware
  }
});
