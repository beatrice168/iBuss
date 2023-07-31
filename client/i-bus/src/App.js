import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Routes, Route } from "react-router-dom";
import Booking from './components/Booking'
import Signup from './components/signup';
import Customer from './components/Customer';



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
        <Route path="/Booking" element={<Booking />}/>
      </Routes>
      <Routes>
        <Route path='signup' element={<Signup/>}/>
      </Routes>
      <Routes>
        <Route path='Customer' element={<Customer/>}/>
      </Routes>
    </div>
    </>
  );
}
export default App;
