import { Router } from "express";
import userController from "../controllers/user.controller.js";
import { idValid, userValid } from "../middlewares/global.middleware.js";

const userRoute = Router();

userRoute.get('/', userController.findAll);

userRoute.post('/', userController.create);

userRoute.get('/:id', idValid, userValid, userController.findById);

userRoute.patch('/:id', idValid, userValid, userController.update);

export default userRoute;