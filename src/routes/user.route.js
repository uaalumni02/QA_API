import express from "express";
import checkAuth from "../middleware/check-auth";

import userController from "../controllers/user";

const router = express.Router();

router.post("/login", userController.userLogin);

router
  .route("/")
  .get(checkAuth, userController.getAllUsers)
  .post(userController.addUser);

router.route("/:id").get(checkAuth, checkAuth, userController.getUserById);

export default router;
