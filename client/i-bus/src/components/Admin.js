import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import 'bootstrap/dist/css/bootstrap.min.css';


function Admin() {
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
    marginTop: "95px",
  };

  const cardStyle = {
    borderRadius: "20px",
    backgroundColor: "blue",
    width: "25vw",
    color: "white",
  };

  const cardStyle3 = {
    marginTop: "20px",
    borderRadius: "20px",
    width: "15vw",
    height: "10vh",
    flexWrap: "nowrap",
    backgroundColor: "blue",
    color: "white",
  };

  const chartContainerStyle = {
    marginTop: "50px",
  };
  const miniStyle={
    backgroundColor:"#57A0D2"
  }

  return (
    <div className="mini" style={miniStyle}>
    <div className="container" style={containerStyle}>
      <div className="row">
        <div className="col-md-12">
          <h1>Admin Dashboard</h1>
        </div>
      </div>
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
          <div className="card">
            <div className="card-body">
              <h2>Company Comparison</h2>
              <PieChart width={300} height={300}>
                <Pie
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
          <div className="card">
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
  );
}

export default Admin;
