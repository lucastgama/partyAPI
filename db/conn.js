const mongoose = require("mongoose");

async function main() {
  try {
    // mongoose.set("strictQuery", true);

    await mongoose.connect(
      "mongodb+srv://lucasparaty789:@cluster0.nvdlcn5.mongodb.net/?retryWrites=true&w=majority"
    );

    console.log("connectado");
    
  } catch (error) {
    console.log(error);
  }
}

module.exports = main;
