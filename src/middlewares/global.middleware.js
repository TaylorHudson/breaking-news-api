import mongoose from "mongoose";
import userService from "../services/user.service.js";

const idValid = (req, res, next) => {
  try {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
       return res.status(400).send({ message: 'Invalid ID' });
    }

    req.id = id;

    next();
  } catch (error) {
    res.status(500).send(error.message);
  }
}

const userValid = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await userService.findByIdService(id);

    if (!user) res.status(400).send({ message: 'User not found' });

    req.id = id;
    req.user = user;

    next();

  } catch (error) {
    res.status(500).send(error.message);
  }
}

export { idValid, userValid };