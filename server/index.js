require( "dotenv" ).config();
const cors = require( "cors" );
const express = require ( "express");
const dataConnect = require ( "./database");
const Food = require( "./models/foodModel")
const multer = require ("multer");

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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'asset/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
  

app.post( "/api/food", upload.single("imageUrl"), async (req, res) => {
    try{
        console.log(req.body);

        const newFood = new Food({

            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            imageUrl: req.file.imageUrl,
            category: req.body.category,
        });

        await Food.create({ newFood});
        res.json( "HI THERE" );
    }
    catch ( error ) {
        res.status( 500 )
        .json({ error: "Error While Ordering Food." });
    }
});

app.put( "/api/food", upload.single("imageUrl"), async (req, res) => {
    try{
        const foodId = req.body.foodId;
      
        const updateFood = {

            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            imageUrl: req.file.imageUrl,
            category: req.body.category,
        };
        if (req.file) {
            updateFood.imageUrl = req.file.filename;
        }

        await Food.findByIdAndUpdate(foodId, updateFood);
        res.json( "HI THERE" );
    }
    catch ( error ) {
        res.status( 500 )
        .json({ error: "Error While Ordering Food." });
    }
});

app.delete("/api/food/:id", async(req, res) => {
    const foodId = req.params.id;

    try {
        await Food.deleteOne( {_id: FoodId });
        res.json( "Nooo!" + req.body.foodId);
    }
    catch (error) {
        res.json(error);
    }
})



app.get( "/", (req, res) => {
    res.json( "Hello World" );
});

app.get( "*", (req, res) => {
    res.sendStatus( 404 );
});


app.listen(PORT, () => {
    console.log(`Server Is Running On Port ${PORT}`);
});
