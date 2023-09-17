require( "dotenv" ).config();
const cors = require( "cors" );
const express = require ( "express");
const dataConnect = require ( "./database");
const Food = require( "./models/foodModel")

const app = express();
const PORT = process.env.PORT || 8000;


                                                            // middleware
dataConnect();                                              // MY MONGODB CONNECTION
app.use(cors());
app.use(express.urlencoded({extended: true }));
app.use(express.json());
app.use("/asset", express.static("asset"));


                                                            // API ROUTES

app.get( "/api/food", async (req, res) => {
    try{
        const category = req.query.category;
        console.log("You have seleted", category);

        const filter = {};
        if( category ) {
            filter.category = category;
        }

        console.log("Filter Object:", filter);
        
        const data = await Food.find(filter);
        res.json( data );
    }
    catch ( error ) {
        res.status( 500 )
        .json({ error: "Error While Ordering Food." });
    }
});

app.get( "/api/food/:_id", async (req, res) => {
    try{
        const idParam = req.params._id;
        console.log(idParam);
     
        const data = await Food.findOne({ _id: idParam});
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
    res.sendStatus( 404 );
});


app.listen(PORT, () => {
    console.log(`Server Is Running On Port ${PORT}`);
});