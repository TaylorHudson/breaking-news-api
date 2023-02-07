import jwt  from 'jsonwebtoken';
import { User } from '../models/User.js';

const loginService = (email) => User.findOne({ email: email }).select('+password');

const generateJwtToken = (id) => 
  jwt.sign({ id: id },
     process.env.SECRET_JWT,
    { expiresIn: 10800 });

export { loginService, generateJwtToken };