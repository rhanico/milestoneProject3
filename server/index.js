require( "dotenv" ).config();
const cors = require( "cors" );
const express = require ( "express");

const app = express();
const PORT = process.env.PORT || 6000;

app.get( "/", (req, res) => {
    res.json( "Hello World" );
});

app.listen(PORT, () => {
    console.log(`Server Is Running O Port ${PORT}`);
});