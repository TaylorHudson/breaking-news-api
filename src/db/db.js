import mongoose from "mongoose";

const connectDB = () => {

  mongoose.set('strictQuery', false);

  mongoose.connect(process.env.DB_URL, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
  })
    .then(() => console.log("Connected with your database"))
    .catch((err) => console.log(err.message));
}

export {connectDB};