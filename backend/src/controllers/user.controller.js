import asyncHandler from "../utils/asyncHandler.util.js";
import { apiError } from "../utils/apiError.util.js";
import { apiResponse } from "../utils/apiResponse.util.js";
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.util.js";
import { deleteOnCloudinary } from "../utils/deleteOnCloudinary.util.js";
import { User } from "../models/user.model.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, fullName, mobileNo, password } = req.body;
  if ([email, fullName, mobileNo, password].some((field) => field === "")) {
    throw new apiError(400, "All fields are required.");
  }

  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new apiError(400, "Email already exist, try different email.");
  }
  const mobileNoExist = await User.findOne({ mobileNo });
  if (mobileNoExist) {
    throw new apiError(
      400,
      "Mobile number already exist, try different mobile number."
    );
  }

  let profilePhotoLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.profilePhoto) &&
    req.files.profilePhoto.length > 0
  ) {
    profilePhotoLocalPath = await req.files.profilePhoto[0].path;
  }
  const profilePhoto = await uploadOnCloudinary(profilePhotoLocalPath);
  if (!profilePhoto) {
    throw new apiError(400, "Profile photo is required.");
  }

  const  profilePhotoURL = profilePhoto.url;
  const arrayOfImageURL = profilePhotoURL.split("/");
  const imageFullName = arrayOfImageURL[arrayOfImageURL.length - 1];
  const arrayOfimageName = imageFullName.split(".");
  const imageName = arrayOfimageName[0];
  await deleteOnCloudinary(imageName);

  const user = await User.create({
    email,
    fullName,
    mobileNo,
    password,
    profilePhoto: profilePhoto.url,
  });
  if (!user) {
    throw new apiError(500, "User not created.");
  }

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser) {
    throw new apiError(404, "User not found.");
  }

  return res
    .status(200)
    .json(new apiResponse(200, createdUser, "User registered successfully."));
});

const loginUser = asyncHandler(async(req,res) => {
    const {email, mobileNo, password} = req.body;
    if (!email && !mobileNo) {
        throw new apiError(400,"Email or mobile number is required for login.")
    }
    if (!password) {
        throw new apiError(400,"Password is required.")
    }

    const user = await User.findOne({
        $or: [{email},{mobileNo}]
    })
    if (!user) {
        throw new apiError(404,"User is not available with this email or mobile number.")
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new apiError(400,"Invalid password.")
    }

    // try {
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false})
    // } catch (error) {
    //     console.log("Error while generating access and refresh token: ",error);
    // }

    const loggedInUser = User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    // .json(
    //     new apiResponse(
    //         200,
    //         {
    //             loggedInUser,
    //             accessToken,
    //             refreshToken
    //         },
    //         "User logged in successfully."
    //     )
    // )
})

export { registerUser,loginUser };
