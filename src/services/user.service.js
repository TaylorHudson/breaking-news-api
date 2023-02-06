import { User } from '../models/User.js';

const findByIdService = (id) => User.findById(id);

const findAllService = () => User.find();

const createService = (body) => User.create(body);

const updateService = (id, name, username, email, password, avatar, background) => {
  return User.findByIdAndUpdate({ _id: id }, {name, username, email, password, avatar, background});
}

export default { createService, findAllService, findByIdService, updateService };