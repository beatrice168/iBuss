import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import { Routes, Route } from "react-router-dom";
import Booking from './components/Booking'; 
import Signup from './components/signup';
import Customer from './components/Customer';
import Signin from './components/Signin'
import PaymentWithParams from './components/PaymentWithParams';
import PaymentWithoutParams from './components/PaymentWithoutParams';
import Payment from "./components/Payment";
import AboutUs from './components/AboutUs';


import Book from './components/Book';
import Admin from './components/Admin';
import Contact from './components/Contact'
import Paysuccess from './components/Paysuccess';
function App() {
  return (
    <>
    <div className="App">
    <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home />}/>
        <Route path="/Book" element={<Book />}/>
        <Route path="/booking/:busId" element={<Booking />} />
        <Route path="/booking/:busId/Payment/:paymentAmount" element={<PaymentWithParams />} />
        {/* <Route path="/payment" element={<PaymentWithoutParams />} />      */}
        <Route path='signin' element={<Signin/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/Paysuccess' element={<Paysuccess/>}/>
        <Route path='Customer' element={<Customer/>}/>
        <Route path="/admin" element={<Admin />}/>
        <Route  path="Contact" element={<Contact/>}/>
        <Route  path="AboutUs" element={<AboutUs/>}/>
        </Routes>
        <Routes>
        <Route  path="Signup" element={<Signup/>}/>
        </Routes>
    </div>
    </>
  );
}
export default App;