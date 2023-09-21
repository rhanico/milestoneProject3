require("dotenv").config();
const cors = require("cors");
const express = require("express");
const dataConnect = require("./database");
const Food = require("./models/foodModel");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
dataConnect(); // MY MONGODB CONNECTION
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/asset", express.static("asset"));

// API ROUTES

app.get("/api/food", async (req, res) => {
  try {
    const category = req.query.category;
    console.log("You have selected", category);

    const filter = {};
    if (category) {
      filter.category = category;
    }

    console.log("Filter Object:", filter);

    const data = await Food.find(filter);
    res.json(data);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: "Error while retrieving food data", details: error.message });

  }
});

app.get("/api/food/:_id", async (req, res) => {
  try {
    const idParam = req.params._id;
    console.log(idParam);

    const data = await Food.findOne({ _id: idParam });
    if (!data) {
      return res.status(404).json({ error: "Food not found." });
    }
    res.json(data);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: "Error while retrieving food data", details: error.message });

  }
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'asset/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix) 
  }
})

const upload = multer({ storage: storage })

app.post("/api/food", upload.single("imageUrl"), async (req, res) => {
  try {
    console.log(req.body);

    const newFood = new Food({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imageUrl: req.file.filename, 
      category: req.body.category,
    });

    await newFood.save(); 
    res.json("Food created successfully.");
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: "Error while retrieving food data", details: error.message });

  }
});

app.put("/api/food/:id", upload.single("imageUrl"), async (req, res) => {
  try {
    const foodId = req.params.id;

    const updateFood = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
    };
    if (req.file) {
      updateFood.imageUrl = req.file.filename;
    }

    await Food.findByIdAndUpdate(foodId, updateFood);
    res.json("Food updated successfully.");
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: "Error while retrieving food data", details: error.message });

  }
});

app.delete("/api/food/:id", async (req, res) => {
  const foodId = req.params.id;

  try {
    await Food.findByIdAndDelete(foodId); 
    res.json("Food deleted successfully.");
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: "Error while retrieving food data", details: error.message });

  }
});

app.get("/", (req, res) => {
  res.json("Hello World");
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server Is Running On Port ${PORT}`);
});
