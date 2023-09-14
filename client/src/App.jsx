import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/home";
import Food from "./routes/food";
import './index.css';

function App() {

  return (
    <div className="App">
      <Router>
        Header
          <Routes>
            <Route path="/" element={ <Home/>}/>
            <Route path="/food" element={ <Food/>}/>
          </Routes>
        Footer
      </Router>

    </div>
  );
}

export default App;
