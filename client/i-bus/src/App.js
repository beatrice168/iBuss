import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Routes, Route } from "react-router-dom";
import Booking from './components/Booking'
import Signup from './components/Signup'


function App() {
  return (
    <>
    <div className="App">
      
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home />}/>
      </Routes>
      <Routes>
        <Route exact path="/components/Home" element={<Home />}/>
      </Routes>
      <Routes>
        <Route path="/components/Booking" element={<Booking />}/>
      </Routes>
      <Routes>
        <Route path="/components/Signup" element={<Signup />}/>
      </Routes>
    </div>
    </>
  );
}

export default App;
