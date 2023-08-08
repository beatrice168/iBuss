import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Routes, Route } from "react-router-dom";
import Booking from './components/Booking'; 
import Signup from './components/signup';
import Customer from './components/Customer';
import Signin from './components/Signin'

import Payment from "./components/Payment";


import Book from './components/Book';
import Admin from './components/Admin';
import Contact from './components/Contact'


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
        
        <Route path="/Payment" element={<Payment />}/>


      </Routes>
      <Routes>
        <Route path='signin' element={<Signin/>}/>
      </Routes>
      <Routes>
        <Route path='Customer' element={<Customer/>}/>
      </Routes>
      <Routes>
        <Route path="/admin" element={<Admin />}/>
      </Routes>
      <Routes>
        <Route  path="Contact" element={<Contact/>}/>
        
        </Routes>
    </div>
    </>
  );
}
export default App;
