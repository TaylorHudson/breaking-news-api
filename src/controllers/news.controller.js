import { createService, findAllService } from "../services/news.service.js";

const create = async (req, res) => {
  try {
    const { title, banner, text } = req.body;

    if (!title || !banner || !text)
      return res.status(400).send({ message: 'Submit all fields to create' });
 
    await createService({
      title,
      banner,
      text,
      user: req.id
    });

    res.status(201).send('Created');
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

const findAll = async (req, res) => {
  try {
    const news = await findAllService();
    res.send(news);
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export { create, findAll };