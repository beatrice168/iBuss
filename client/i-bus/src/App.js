import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
    <div className="App">
      <Navbar/>
      <Routes>
              <Route path="/components/Home" element={<Home />}/>
            </Routes>
     
    </div>
    </>
  );
}

export default App;
