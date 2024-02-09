//require("dotenv").config();
const mongoose = require("mongoose");

const dbConnection = async () => {
    try { 
      
      await mongoose.connect("mongodb://127.0.0.1:27017/registrousuarios");
      console.log("Base de datos conectada"); 
    } catch (error) { 
      throw new Error("Error a la hora de iniciar la base de datos"); 
    }
  };

  module.exports = { dbConnection };