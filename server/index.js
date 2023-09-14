require( "dotenv" ).config();
const cors = require( "cors" );
const express = require ( "express");
const dataConnect = require( "./database" );
const Food = require( "./models/foodModel")

const app = express();
const PORT = process.env.PORT || 6000;


// middleware

app.use(cors());
app.use(express.urlencoded( {extend: true }));
app.use(express.json());


// server

app.get( "/", (req, res) => {
    res.json( "Hello World" );
});

app.get( "*", (req, res) => {
    res.sendStatus( "404" );
});


app.listen(PORT, () => {
    console.log(`Server Is Running On Port ${PORT}`);
});