import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/home";
import './index.css';

function App() {

  return (
    <div className="App">
      <Router>
        Header
          <Routes>
            <Route path="/" element={ <Home/>}/>
          </Routes>
        Footer
      </Router>

    </div>
  );
}

export default App;
