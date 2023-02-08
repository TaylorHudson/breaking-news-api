import { createService, findAllService, countNews } from "../services/news.service.js";

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
    let { limit, offset } = req.query;
    limit = Number(limit);
    offset = Number(offset);

    if (!limit) limit = 5;
    if (!offset) offset = 0;

    const total = await countNews();
    const nextOffset = offset + limit;
    const currentURL = req.baseUrl;

    const nextUrl = nextOffset < total ? `${currentURL}?limit=${limit}&offset=${nextOffset}` : null;

    const previous = offset - limit < 0 ? null : offset - limit;
    const previousUrl = previous !== null ? `${currentURL}?limit=${limit}&offset=${previous}` : null;

    const news = await findAllService(limit, offset);
    res.send({
      nextUrl,
      previousUrl,
      limit,
      offset,
      total,
      result: news.map((i) => ({
        id: i._id,
        title: i.title,
        text: i.text,
        banner: i.banner,
        likes: i.likes,
        comments: i.comments,
        user: {
          name: i.user.name,
          username: i.user.username,
          avatar: i.user.avatar
        }
      }))
    });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
}

export { create, findAll };