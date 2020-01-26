const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys');


app.use(express.static('public'));

//Body parser to parse request bodies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Mongoose connection. You may only connect to the DB if your IP is on the whitelist.
mongoose.promise = global.Promise;
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB Connected"))
.catch( err => console.log(`Error: ${err}`));


app.get("/test", (req, res) => {
  res.send("App");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Express Server started on port ${PORT}`));