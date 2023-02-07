import userService from "../services/user.service.js";
import jwt from 'jsonwebtoken';

export const authentication = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) return res.status(401).send({ message: 'Unauthorized' });

    const parts = authorization.split(' ');
    const [bearer, token] = parts;

    if (parts.length !== 2 || bearer !== 'Bearer')
      return res.status(401).send({ message: 'Unauthorized' });

    jwt.verify(
      token,
      process.env.SECRET_JWT,
      async (err, decoded) => {
        if (err) return res.status(401).send({ message: 'Token Invalid' });

        const { id } = decoded;

        const user = await userService.findByIdService(id);
        if (!user && !user.id) return res.status(401).send({ message: 'Unauthorized' });

        req.id = user.id;

        return next();
      });
  } catch (err) {
    return res.status(500).send({ message: err.message })
  }
}