import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Routes, Route } from "react-router-dom";
import Booking from './components/Booking'
import Signin from './components/Signin'
import Signup from './components/signup'
import Book from './components/Book';


function App() {
  return (
    <>
    <div className="App">
      
    <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home />}/>
      </Routes>
      <Routes>
        <Route path="/Book" element={<Book />}/>
      </Routes>
      <Routes><Route path="/booking/:busId" element={<Booking />} /></Routes>
      <Routes>
        <Route path='signup' element={<Signup/>}/>
      </Routes>
      <Routes>
        <Route path="/Signin" element={<Signin />}/>
      </Routes>
    </div>
    </>
  );
}
export default App;
