import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import {jwt} from "jsonwebtoken";

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    jerseyNo: {
      type: Number,
      max: 3,
    },
    mobileNo: {
      type: Number,
      required: true,
      max: 10,
    },
    password: {
      type: String,
      required: true,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    DOB: {
      type: Date,
    },
    playingRole: {
      type: String,
      enum: [
        "Top-order batter",
        "Middle-order batter",
        "Wicket-keeper batter",
        "Wicket-keeper",
        "Bowler",
        "All-rounder",
        "Lower-order batter",
        "Opening-batter",
        "None",
      ],
      default: "None",
    },
    battingStyle: {
      type: String,
      enum: ["Left-hand bat", "Right-hand bat"],
    },
    bowlingStyle: {
      type: String,
      enum: [
        "Right-arm fast",
        "Right-arm medium",
        "Left-arm fast",
        "Left-arm medium",
        "Slow left-arm orthodox",
        "Slow left-arm chinaman",
        "Right-arm Off Break",
        "Right-arm Leg Break",
        "None",
      ],
      default: "None",
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Prefer not to say"],
    },
    profilePhoto: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamp: true }
);

userSchema.pre("save",async function(next) {
    this.password = await bcrypt.hash(this.password,10);
    next()
});

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:  process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn:  process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema);
