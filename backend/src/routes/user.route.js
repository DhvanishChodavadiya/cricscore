import { Router } from "express";
import { loginUser, logoutUser, newAccessToken, registerUser, updateProfile } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.single([
    {
      name: "profilePhoto",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

router.route("/logout").post(verifyJWT,logoutUser);

router.route("/newAccessToken").patch(newAccessToken);

router.route("/updateProfile").post(verifyJWT,updateProfile);

export default router;
