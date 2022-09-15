import usersController from "../controllers/usersController.js";
import express from 'express';
const router = express.Router();

router.post("/register", usersController.register);
router.post("/login", usersController.login);
router.post("/setAvatar/:id", usersController.setAvatar);
router.get("/allUsers/:id", usersController.getAllUsers);
router.get("/logout/:id", usersController.logOut);

export default router;
