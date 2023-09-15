const mongoose = require( "mongoose" );

const dataConnect = async () => {
  try{
    mongoose.set('strictQuery', false);                       /// CONNECTION TO MY DATABASE USING .ENV.MONGODB_URI LINK
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Connected to the Kitchen ${conn.connection.host}`);
  }catch (error) {
    console.log(error);
    process.exit(1);
  }
}

module.exports = dataConnect;