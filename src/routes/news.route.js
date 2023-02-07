import { Router } from "express";
import { create, findAll } from "../controllers/news.controller.js";
import { authentication } from "../middlewares/auth.middleware.js";

const newsRoute = Router();

newsRoute.post('/', authentication, create);
newsRoute.get('/', findAll);

export default newsRoute;