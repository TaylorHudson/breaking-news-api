import { loginService, generateJwtToken } from "../services/auth.service.js";
import bcrypt from "bcryptjs"

const login = async (req, res) => {
  try {
    const message = "Email or password not found";
    
    const { email, password } = req.body;
    const user = await loginService(email);

    if(!user) return res.status(404).send({message});

    const valid = bcrypt.compareSync(password, user.password);

    if(!valid) return res.status(404).send({message});

    const token = generateJwtToken(user.id);

    res.send({token});

  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export { login };