const mongoose = require("mongoose");

const URL = process.env.DATABASE;

try {
  // Connect to the MongoDB cluster
  mongoose.connect(
    URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );
} catch (e) {
  console.log("could not connect");
}
