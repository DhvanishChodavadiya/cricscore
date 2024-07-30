import asyncHandler from "../utils/asyncHandler.util.js";
import { apiError } from "../utils/apiError.util.js";
import { apiResponse } from "../utils/apiResponse.util.js";
import { uploadOnCloudinary } from "../utils/uploadOnCloudinary.util.js";
import { deleteOnCloudinary } from "../utils/deleteOnCloudinary.util.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

const generateAccessTokenAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new apiError(500, "Something went wrong.");
  }
};

const registerUser = asyncHandler(async (req, res, next) => {
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
  if (mobileNo.trim().length != 10) {
    throw new apiError(400, "Mobile number should be 10 digits.");
  }

  if (password.trim().length < 8 || password.trim().length > 16) {
    throw new apiError(400, "Password must be between 8 and 16 characters.");
  }

  // const  profilePhotoURL = profilePhoto.url;
  // const arrayOfImageURL = profilePhotoURL.split("/");
  // const imageFullName = arrayOfImageURL[arrayOfImageURL.length - 1];
  // const arrayOfimageName = imageFullName.split(".");
  // const imageName = arrayOfimageName[0];
  // await deleteOnCloudinary(imageName);

  const user = await User.create({
    email,
    fullName,
    mobileNo,
    password,
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

const loginUser = asyncHandler(async (req, res) => {
  const { email, mobileNo, password } = req.body;
  if (!email && !mobileNo) {
    throw new apiError(400, "All fields are required.");
  }
  if (!password) {
    throw new apiError(400, "All fields are required.");
  }

  const user = await User.findOne({
    $or: [{ email }, { mobileNo }],
  });
  if (!user) {
    throw new apiError(404, "User is not found with this email.");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new apiError(400, "Invalid password.");
  }

  const { accessToken, refreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new apiResponse(
        200,
        {
          loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged in successfully."
      )
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      refreshToken: 1,
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new apiResponse(200, {}, "User logged out successfully."));
});

const updateProfile = asyncHandler(async (req, res) => {
  // console.log(req.files);
  // const profilePhoto = req.files.path;
  const {
    fullName,
    jerseyNo,
    city,
    state,
    DOB,
    playingRole,
    battingStyle,
    bowlingStyle,
    gender,
    profilePhoto,
  } = req.body;

  // let profilePhotoLocalPath;
  // if (
  //   req.files &&
  //   Array.isArray(req.files.profilePhoto) &&
  //   req.files.profilePhoto.length > 0
  // ) {
  // profilePhotoLocalPath = await req.file.profilePhoto[0].path;
  // }
  // const upload = await uploadOnCloudinary(profilePhoto);
  // console.log(upload.url);
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        fullName,
        jerseyNo,
        city,
        state,
        DOB,
        playingRole,
        battingStyle,
        bowlingStyle,
        gender,
        profilePhoto,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new apiResponse(200, user, "User profile updated successfully."));
});

const newAccessToken = asyncHandler(async (req, res) => {
  const inComingRefreshToken = req.cookies.refreshToken;
  if (!inComingRefreshToken) {
    throw new apiError(400, "Unauthorized request.");
  }

  const decodedToken = jwt.verify(
    inComingRefreshToken,
    process.env.REFRESH_TOKEN_SECRET
  );

  const user = await User.findById(decodedToken._id);
  if (inComingRefreshToken !== user?.refreshToken) {
    throw new apiError(400, "Unauthorized request.");
  }

  const { accessToken, newRefreshToken } =
    await generateAccessTokenAndRefreshToken(user._id);

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", newRefreshToken, options)
    .json(
      new apiResponse(
        200,
        {
          accessToken,
          refreshToken: newRefreshToken,
        },
        "Access refreshed successfully."
      )
    );
});

const uploadProfilePhoto = asyncHandler(async (req, res) => {
  const localPath = req.file?.path;
  console.log(localPath);
  const avatar = await uploadOnCloudinary(localPath);
  const user = await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        profilePhoto: avatar.url,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new apiResponse(200, user, "profile picture updated successfully."));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  newAccessToken,
  updateProfile,
  uploadProfilePhoto,
};
