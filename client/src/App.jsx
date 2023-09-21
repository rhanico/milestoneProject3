import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/home";
import Fridge from "./routes/fridge";
import FoodView from "./routes/food";
import AddFood from "./routes/food/addFood";
import Kitchen from "./routes/kitchen";
import Share from "./routes/share";
import Header from "./components/header";
import Footer from "./components/footer";
import EditFood from "./routes/food/editFood";
import './index.css';


function App() {

  return (
    <div className="App">
      <Router>
        <Header/>
          <Routes>
            <Route path="/" element={ <Home/>}/>
            <Route path="/kitchen" element={<Kitchen/>}/>
            <Route path="/fridge" element={ <Fridge/>}/>
            <Route path="/food/:_id" element={<FoodView />} />
            <Route path="/addFood" element={ <AddFood/>}/>
            <Route path="/editFood/:_id" element={ <EditFood/>}/>
            <Route path="/share" element={ <Share/>}/>
          </Routes>
        <Footer/>
      </Router>

    </div>
  );
}

export default App;
