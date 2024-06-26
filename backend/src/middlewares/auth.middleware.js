import asyncHandler from "../utils/asyncHandler.util.js";
import { apiError } from "../utils/apiError.util.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyJWT = asyncHandler(async(req, _,next) => {
    try {
        const token = req.cookies?.accessToken || req.headers("Authorization")?.replace("Bearer","");
        if (!token) {
            throw new apiError(400,"Unauthorized request.")
        }
    
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET);
    
        const user = await User.findById(decodedToken._id).select("-password -refreshToken")
        if (!user) {
            throw new apiError(404,"User not found.")
        }
    
        req.user = user;
        next();
    } catch (error) {
        throw new apiError(500,error?.message || "verification error.")
    }
})

export { verifyJWT }