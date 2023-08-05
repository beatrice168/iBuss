import React, { useState } from "react";

const AddBusForm = ({ onAddBus }) => {
  const [newBusData, setNewBusData] = useState({
    name: "",
    seats: 0,
    route: "",
    availability: "",
    departure: "",
    cost: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBusData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddBusSubmit = (e) => {
    e.preventDefault();
    onAddBus(newBusData);
    setNewBusData({
      name: "",
      seats: 0,
      route: "",
      availability: "",
      departure: "",
      cost: 0,
    });
  };

  return (
    <div>
      <h2>Add New Bus</h2>
      <form onSubmit={handleAddBusSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={newBusData.name}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Seats</label>
          <input
            type="number"
            name="seats"
            value={newBusData.seats}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Route</label>
          <input
            type="text"
            name="route"
            value={newBusData.route}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Availability</label>
          <input
            type="text"
            name="availability"
            value={newBusData.availability}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Departure</label>
          <input
            type="text"
            name="departure"
            value={newBusData.departure}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Cost</label>
          <input
            type="number"
            name="cost"
            value={newBusData.cost}
            onChange={handleInputChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Bus
        </button>
      </form>
    </div>
  );
};

export default AddBusForm;
