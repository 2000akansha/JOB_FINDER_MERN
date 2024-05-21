export const sendToken = (user, statusCode, res, message) => {
    const token = user.getJWTToken();
    const options = {
        maxAge: parseInt(process.env.COOKIE_EXPIRE_SECONDS) * 1000, // Convert seconds to milliseconds
        httpOnly: true, // Set httpOnly to true
    };
  
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        message,
        token,
    });
};


