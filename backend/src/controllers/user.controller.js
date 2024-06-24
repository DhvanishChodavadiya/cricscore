import asyncHandler from "../utils/asyncHandler.util.js";
import { apiError } from "../utils/apiError.util.js";
import { apiResponse } from "../utils/apiResponse.util.js";
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.util.js";
import { deleteOnCloudinary } from "../utils/deleteOnCloudinary.util.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async(req,res) => {
    const {email, fullName, mobileNo, password} = req.body;
    if ([email, fullName, mobileNo, password].some((field) => field === "")) {
        throw new apiError(400,"All fields are required.")
    }
    
    const emailExist = await User.findOne({email})
    if (emailExist) {
        throw new apiError(400,"Email already exist, try different email.")
    }
    const mobileNoExist = await User.findOne({mobileNo})
    if (mobileNoExist) {
        throw new apiError(400,"Mobile number already exist, try different mobile number.")
    }

    let profilePhotoLocalPath;
    if (req.files && Array.isArray(req.files.profilePhoto) && req.files.profilePhoto.length > 0) {
        profilePhotoLocalPath = await req.files.profilePhoto[0].path;
    }
    const profilePhoto = await uploadOnCloudinary(profilePhotoLocalPath);
    if (!profilePhoto) {
        throw new apiError(400,"Profile photo is required.")
    }

    // const deleteProfilePhoto = await deleteOnCloudinary(profilePhoto.url)
    // if (!deleteProfilePhoto) {
    //     throw new apiError(500,"Error while deleting on cloudinary.")
    // }

    const user = await User.create({
        email,
        fullName,
        mobileNo,
        password,
        profilePhoto: profilePhoto.url
    })
    if (!user) {
        throw new apiError(500,"User not created.")
    }

    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new apiError(404,"User not found.")
    }

    return res.status(200)
    .json(
        new apiResponse(
            200,
            createdUser,
            "User registered successfully."
        )
    );

});

export { registerUser };