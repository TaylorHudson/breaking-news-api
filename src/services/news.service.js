import { News } from '../models/News.js';

const createService = (body) => News.create(body);

const findAllService = (limit, offset) => 
  News
    .find()
    .sort({_id: -1}) //Brings items starting from the last one added
    .skip(offset)
    .limit(limit)
    .populate('user'); //Populates the request with all user data

const countNews = () => News.countDocuments();

export { createService, findAllService, countNews }; 