// import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
// import ErrorHandler from "../middlewares/error.js";
// import { Application } from "../models/applicationSchema.js";
// import { Job } from "../models/jobSchema.js";
// import cloudinary from "cloudinary";

// export const postApplication = catchAsyncErrors(async (req, res, next) => {
//   if (!req.user || !req.user.role) {
//     return next(new ErrorHandler("User not authorized.", 401));
//   }
//   const { role } = req.user;
  
//   // Check if the user is an employer
//   if (role !== "Job Seeker") {
//     return next(
//       new ErrorHandler("Only Job Seeker are allowed to apply for jobs.", 403)
//     );
//   }

//   const { resume } = req.files;
//   const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
//   if (!allowedFormats.includes(resume.mimetype)) {
//     return next(
//       new ErrorHandler("Invalid file type. Please upload a PNG file.", 400)
//     );
//   }
//   const cloudinaryResponse = await cloudinary.uploader.upload(
//     resume.tempFilePath
//   );

//   if (!cloudinaryResponse || cloudinaryResponse.error) {
//     console.error(
//       "Cloudinary Error:",
//       cloudinaryResponse.error || "Unknown Cloudinary error"
//     );
//     return next(new ErrorHandler("Failed to upload Resume to Cloudinary", 500));
//   }
//   const { name, email, coverLetter, phone, address, jobId } = req.body;
//   const applicantID = {
//     user: req.user._id,
//     role: "Job Seeker",
//   };
//   if (!jobId) {
//     return next(new ErrorHandler("Job not found!", 404));
//   }
//   const jobDetails = await Job.findById(jobId);
//   if (!jobDetails) {
//     return next(new ErrorHandler("Job not found!", 404));
//   }

//   const employerID = {
//     user: jobDetails.postedBy,
//     role: "Employer",
//   };
//   if (
//     !name ||
//     !email ||
//     !coverLetter ||
//     !phone ||
//     !address ||
//     !applicantID ||
//     !employerID ||
//     !resume
//   ) {
//     return next(new ErrorHandler("Please fill all fields.", 400));
//   }
//   const application = await Application.create({
//     name,
//     email,
//     coverLetter,
//     phone,
//     address,
//     applicantID,
//     employerID,
//     resume: {
//       public_id: cloudinaryResponse.public_id,
//       url: cloudinaryResponse.secure_url,
//     },
//   });
//   res.status(200).json({
//     success: true,
//     message: "Application Submitted!",
//     application,
//   });
// });


import jwt from "jsonwebtoken";
import {Job} from "../models/jobSchema.js"
import {Application} from "../models/applicationSchema.js"
import { JobSeeker } from "../models/jobseekerSchema.js";
import { catchAsyncErrors } from "../middlewares/catchAsyncerror.js";
import ErrorHandler from "../middlewares/error.js";
import cloudinary from "cloudinary";

export const postApplication = catchAsyncErrors(async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new ErrorHandler("User Not Authorized: Token Missing", 401);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await JobSeeker.findById(decoded.id);

    if (!user) {
      throw new ErrorHandler("User Not Authorized: Invalid Token", 401);
    }

    // Check if req.files exists and has the 'resume' property
    if (!req.files || !req.files.resume) {
      throw new ErrorHandler("Resume file is missing.", 400);
    }

    const { resume } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

    if (!allowedFormats.includes(resume.mimetype)) {
      throw new ErrorHandler("Invalid file type. Please upload a PNG file.", 400);
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(resume.tempFilePath);

    if (!cloudinaryResponse || cloudinaryResponse.error) {
      throw new ErrorHandler("Failed to upload Resume to Cloudinary", 500);
    }

    // Continue with the application logic
    const { name, email, coverLetter, phone, address, jobId } = req.body;
    // Check if all required fields are provided
    if (!name || !email || !coverLetter || !phone || !address || !jobId) {
      throw new ErrorHandler("Please fill all fields.", 400);
    }
    // Check if the job exists
    const jobDetails = await Job.findById(jobId);
    if (!jobDetails) {
      throw new ErrorHandler("Job not found!", 404);
    }
    // Create the application
    const application = await Application.create({
      name,
      email,
      coverLetter,
      phone,
      address,
      applicantID: { user: user._id, role: "Job Seeker" },
      employerID: { user: jobDetails.postedBy, role: "Employer" },
      resume: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
    });

    res.status(200).json({
      success: true,
      message: "Application Submitted!",
      application,
    });
  } catch (error) {
    next(error);
  }
});


// export const employerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
//   // Check if user is authenticated
//   if (!req.user) {
//     return next(new ErrorHandler("User not authenticated.", 401));
//   }

//   // Verify user role
//   const { role, _id } = req.user;
//   if (role !== "Employer") {
//     return next(new ErrorHandler("Only employers are allowed to access this resource.", 403));
//   }

//   try {
//     // Fetch applications for the authenticated employer
//     const applications = await Application.find({ "employerID.user": _id });

//     res.status(200).json({
//       success: true,
//       applications,
//     });
//   } catch (error) {
//     // Handle any database or server errors
//     return next(new ErrorHandler("Failed to fetch applications.", 500));
//   }
// });


export const employerGetAllApplications = catchAsyncErrors(async (req, res, next) => {
  // Check if user is authenticated
  if (!req.user) {
    return next(new ErrorHandler("User not authenticated.", 401));
  }

  // Verify user role
  const { role, _id } = req.user;
  if (role !== "Employer") {
    return next(new ErrorHandler("Only employers are allowed to access this resource.", 403));
  }

  try {
    // Fetch applications for the authenticated employer
    const applications = await Application.find({ "employerID.user": _id });

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    // Handle any database or server errors
    return next(new ErrorHandler("Failed to fetch applications.", 500));
  }
});



export const jobseekerGetAllApplications = catchAsyncErrors(
  async (req, res, next) => {
   // Check if user is authenticated
  if (!req.user) {
    return next(new ErrorHandler("User not authenticated.", 401));
  }

  // Verify user role
  const { role, _id } = req.user;
  if (role !== "Job Seeker") {
    return next(new ErrorHandler("Only job seekers are allowed to access this resource.", 403));
  }

  try {
    // Fetch applications for the authenticated employer
    const applications = await Application.find({ "applicantID.user": _id });

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    // Handle any database or server errors
    return next(new ErrorHandler("Failed to fetch applications.", 500));
  }
});
export const jobseekerDeleteApplication = catchAsyncErrors(
  async (req, res, next) => {
    try {
      const application = await Application.findByIdAndDelete(req.params.id);
      if (!application) {
        return next(new ErrorHandler("Application not found", 404));
      }
      res.status(200).json({
        success: true,
        message: "Application deleted successfully",
      });
    } catch (error) {
      return next(new ErrorHandler("Failed to delete application", 500));
    }
  });

