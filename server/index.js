require( "dotenv" ).config();
const cors = require( "cors" );
const express = require ( "express");
const dataConnect = require ( "./database");
const Food = require( "./models/foodModel")

const app = express();
const PORT = process.env.PORT || 8000;


// middleware
dataConnect();    // MY MONGODB CONNECTION
app.use(cors());
app.use(express.urlencoded({extended: true }));
app.use(express.json());
app.use("/uplaods", express.static( "uploads" ));


// API ROUTES

app.get( "/api/food", async (req, res) => {
    try{
        const data = await Food.find({});
        res.json( data );
    }
    catch ( error ) {
        res.status( 500 )
        .json({ error: "Error While Ordering Food." });
    }
});


//  SERVER ROUTES

app.get( "/", (req, res) => {
    res.json( "Hello World" );
});

app.get( "*", (req, res) => {
    res.sendStatus( "404" );
});


app.listen(PORT, () => {
    console.log(`Server Is Running On Port ${PORT}`);
});