import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getDetailUser,
  signIn,
  updateUser,
} from "../controllers/UserController.js";
const router = express.Router();

router.post("/create-user", createUser);
router.post("/sign-in", signIn);
router.get("/get-detail-user", getDetailUser);
router.put("/update-user", updateUser);

// admin
router.get("/get-all-user", getAllUser);
router.post("/delete-user", deleteUser);
export default router;
