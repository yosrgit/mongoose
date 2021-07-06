const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config({ path: './config/.env' });
console.log(app);
//routes
const mongoose = require('mongoose');
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log('database connected'))
  .catch((err) => console.log(err));

  
app.use('/user', require('./routers/userRouter'));
// connect database

//create server
const PORT = process.env.PORT || 5000;
app.listen(PORT, (err) =>
  err ? console.log(err) : console.log('server is running on port', PORT)
);


