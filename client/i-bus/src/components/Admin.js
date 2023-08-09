import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import AddBusForm from "./AddBusForm";
import UpdateDeleteBusForm from "./UpdateDeleteBusForm";
import AddBookingForm from "./AddBookingForm";
import UpdateDeleteBookingForm from "./UpdateDeleteBookingForm";
import UploadFile from "./UploadFile";
import './Admin.css'

function Admin() {
  const [buses, setBuses] = useState([]);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBuses();
    fetchBookings();
  }, []);

  const fetchBuses = () => {
    fetch("http://127.0.0.1:5555/buses")
      .then((response) => response.json())
      .then((data) => setBuses(data))
      .catch((error) => console.error("Error fetching buses:", error));
  };

  const fetchBookings = () => {
    fetch("http://127.0.0.1:5555/bookings")
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error("Error fetching bookings:", error));
  };

  const addBus = (newBus) => {
    fetch("http://127.0.0.1:5555/buses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBus),
    })
      .then((response) => response.json())
      .then((data) => {
        setBuses([...buses, data]);
      })
      .catch((error) => console.error("Error adding bus:", error));
  };

  const updateBus = (id, updatedBus) => {
    fetch(`http://127.0.0.1:5555/buses/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBus),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedBuses = buses.map((bus) => (bus.id === id ? data : bus));
        setBuses(updatedBuses);
      })
      .catch((error) => console.error("Error updating bus:", error));
  };

  const deleteBus = (id) => {
    fetch(`http://127.0.0.1:5555/buses/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedBuses = buses.filter((bus) => bus.id !== id);
        setBuses(updatedBuses);
      })
      .catch((error) => console.error("Error deleting bus:", error));
  };

  const addBooking = (newBooking) => {
    fetch("http://127.0.0.1:5555/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBooking),
    })
      .then((response) => response.json())
      .then((data) => {
        setBookings([...bookings, data]);
      })
      .catch((error) => console.error("Error adding booking:", error));
  };

  const updateBooking = (id, updatedBooking) => {
    fetch(`http://127.0.0.1:5555/bookings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBooking),
    })
      .then((response) => response.json())
      .then((data) => {
        const updatedBookings = bookings.map((booking) => (booking.id === id ? data : booking));
        setBookings(updatedBookings);
      })
      .catch((error) => console.error("Error updating booking:", error));
  };

  const deleteBooking = (id) => {
    fetch(`http://127.0.0.1:5555/bookings/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        const updatedBookings = bookings.filter((booking) => booking.id !== id);
        setBookings(updatedBookings);
      })
      .catch((error) => console.error("Error deleting booking:", error));
  };

  const data = [
    { name: "Jan", income: 20000, expenses: 15000 },
    { name: "Feb", income: 18000, expenses: 12000 },
    { name: "Mar", income: 25000, expenses: 18000 },
    { name: "Apr", income: 22000, expenses: 16000 },
    { name: "May", income: 24000, expenses: 17000 },
    { name: "Jun", income: 28000, expenses: 20000 },
  ];

  const companyComparisonData = [
    { name: "Company A", income: 10000 },
    { name: "Company B", income: 12000 },
    { name: "Company C", income: 8000 },
    { name: "Company D", income: 15000 },
    { name: "Company E", income: 9000 },
  ];
  const containerStyle = {
    marginTop: "0px",
  };
  
  const cardStyle = {
    borderRadius: "20px",
    backgroundColor: "blue",
    width: "20vw",
    color: "white",
    paddingLeft: "10px",
    fontSize: "30px",
  };
  
  const cardStyle3 = {
    marginTop: "20px",
    paddingLeft: "10px",
    borderRadius: "20px",
    width: "15vw",
    backgroundColor: "blue",
    color: "white",
    padding: "30px",
    fontSize: "30px",
  };
  
  const chartContainerStyle = {
    marginTop: "50px",
  };
  
  const miniStyle = {
    backgroundColor: "48CAE4",
  };
  
  const adm = {
    fontSize: "50px",
    marginBottom: "50px",
  };
  
  const pi = {
    backgroundColor: "#57A0D2",
  };
  
  // Media queries
  const mediaQueryMedium = '@media (max-width: 768px)';
  
  const containerStyleMobile = {
    marginTop: "20px", // Adjust the marginTop value for mobile devices
  };
  
  const cardStyleMobile = {
    width: "90vw", // Adjust the width for mobile devices
    paddingLeft: "20px", // Adjust the paddingLeft for mobile devices
  };
  
  const cardStyle3Mobile = {
    width: "30vw", 
    padding: "10px", 
  };
  
  const admMobile = {
    fontSize: "40px", // Adjust the font size for mobile devices
    marginBottom: "30px", // Adjust the marginBottom for mobile devices
  };
  
  // Apply media query styles
  if (window.innerWidth <= 768) {
    Object.assign(containerStyle, containerStyleMobile);
    Object.assign(cardStyle, cardStyleMobile);
    Object.assign(cardStyle3, cardStyle3Mobile);
    Object.assign(adm, admMobile);
  }
  
  

  return (
    <div className="mini" style={miniStyle}>
      <div className="container" style={containerStyle}>
        <div className="row">
          <div className="col-md-12">
            <h1 style={adm}>Admin Dashboard </h1>
            <div className="row">
        <div className="col-md-6">
          <h2>Admin Statistics</h2>
          <div className="card" style={cardStyle}>
            <div className="card-body">
              <h3>Total Income</h3>
              <p className="nums">ksh 30,000</p>
            </div>
          </div>
          <div className="card" style={cardStyle}>
            <div className="card-body">
              <h3>Total Expenses</h3>
              <p className="nums">ksh 30,000</p>
            </div>
          </div>
          <div className="card" style={{backgroundColor:"#57A0D2"}}>
            <div className="card-body">
              <h2>Company Comparison</h2>
              <PieChart width={600} height={300}>
                <Pie
                 style={pi}
                  dataKey="income"
                  data={companyComparisonData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  label
                >
                  {companyComparisonData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`#${index + 8}42ca9d`} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
              </div>
              </div>
            </div>
            <div className="col-md-6">
              <div className="card3" style={cardStyle3}>
                <div className="card-body">
                  <h3>Total Customers</h3>
                  <p className="nums">500</p>
                </div>
              </div>
              <div className="card3" style={cardStyle3}>
                <div className="card-body">
                  <h3>Total Buses</h3>
                  <p className="nums">50</p>
                </div>
              </div>
              <div className="card3" style={cardStyle3}>
                <div className="card-body">
                  <h3>Total Bookings</h3>
                  <p className="nums">300</p>
                </div>
              </div>
              <div className="card3" style={cardStyle3}>
                <div className="card-body">
                  <h3>Total Routes</h3>
                  <p className="nums">30</p>
                </div>
              </div>
              <div className="card">
                <div className="card-body">
                  {/* <table className="table"> */}
                    {/* Table content here */}
                  {/* </table> */}
                </div>
              </div>
            </div>
          </div>
          <div className="row" style={chartContainerStyle}>
            <div className="col-md-12">
              <div className="card" style={{ backgroundColor: "#cccccc" }}>
                <div className="card-body">
                  <h2>Analysis Chart</h2>
                  <LineChart width={600} height={400} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="income" name="Income" stroke="#8884d8" />
                    <Line type="monotone" dataKey="expenses" name="Expenses" stroke="#82ca9d" />
                  </LineChart>
                </div>
              </div>
            </div>
          </div>     
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <AddBusForm onAddBus={addBus} />
            <br></br>
            <UploadFile />
          </div>
          
          <div className="col-md-6">
            <UpdateDeleteBusForm
              buses={buses}
              onUpdateBus={updateBus}
              onDeleteBus={deleteBus}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <AddBookingForm onAddBooking={addBooking} />
          </div>
          <div className="col-md-6">
            <UpdateDeleteBookingForm
              bookings={bookings}
              onUpdateBooking={updateBooking}
              onDeleteBooking={deleteBooking}
            />
          </div>
        </div>
        </div>
        </div>

      );
    }
    
    export default Admin;