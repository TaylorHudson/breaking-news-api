import userService from "../services/user.service.js";

const findById = (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) { return res.status(500).send({ message: err.message }); }
}

const findAll = async (req, res) => {
  try {
    const users = await userService.findAllService();
    res.send(users);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

const create = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    let valid = true;
    const users = await userService.findAllService();
    users.map((user) => {
      if (user.name === name) valid = false;
    });

    if (!valid) return res.status(400).send({ message: "Volunteer with that email already exists" });
    
    else {

      if (!name && !username && !email && !password && !avatar && !background) {
        return res.status(400).send({ message: "Submit all fields to create" });
      }

      await userService.createService({
        name, username, email, password, avatar, background
      });
      res.status(201).send({
        message: 'User created successfuly',
        user: { name, username, email, avatar, background }
      });

    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

const update = async (req, res) => {
  try {
    const { name, username, email, password, avatar, background } = req.body;

    if (!name && !username && !email && !password && !avatar && !background) {
      return res.status(400).send({ message: "Submit at least onde field to create" });
    }

    const id = req.id;

    await userService.updateService(id, name, username, email, password, avatar, background);
    res.status(201).send({ message: 'User updated successfuly' });

  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export default { create, findAll, findById, update };