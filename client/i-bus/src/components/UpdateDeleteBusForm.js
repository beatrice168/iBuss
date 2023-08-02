import React, { useState } from "react";

const UpdateDeleteBusForm = ({ buses, onUpdateBus, onDeleteBus }) => {
  const [selectedBusId, setSelectedBusId] = useState(null);
  const [updatedBusData, setUpdatedBusData] = useState({
    name: "",
    seats: 0,
    route: "",
    availability: "",
    departure: "",
    cost: 0,
  });

  const handleBusSelection = (id) => {
    setSelectedBusId(id);
    // Populate the update form with the selected bus's data
    const selectedBus = buses.find((bus) => bus.id === id);
    if (selectedBus) {
      setUpdatedBusData(selectedBus);
    }
  };

  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBusData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdateBusSubmit = (e) => {
    e.preventDefault();
    if (selectedBusId) {
      onUpdateBus(selectedBusId, updatedBusData);
      setSelectedBusId(null);
      setUpdatedBusData({
        name: "",
        seats: 0,
        route: "",
        availability: "",
        departure: "",
        cost: 0,
      });
    }
  };

  const handleDeleteBus = () => {
    if (selectedBusId) {
      onDeleteBus(selectedBusId);
      setSelectedBusId(null);
    }
  };

  return (
    <div>
      <h2>Update/Delete Bus</h2>
      <ul className="list-group">
        {buses.map((bus) => (
          <li
            key={bus.id}
            className={
              selectedBusId === bus.id ? "list-group-item active" : "list-group-item"
            }
            onClick={() => handleBusSelection(bus.id)}
          >
            {bus.name}
          </li>
        ))}
      </ul>
      <form onSubmit={handleUpdateBusSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={updatedBusData.name}
            onChange={handleUpdateInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Seats</label>
          <input
            type="number"
            name="seats"
            value={updatedBusData.seats}
            onChange={handleUpdateInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Route</label>
          <input
            type="text"
            name="route"
            value={updatedBusData.route}
            onChange={handleUpdateInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Availability</label>
          <input
            type="text"
            name="availability"
            value={updatedBusData.availability}
            onChange={handleUpdateInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Departure</label>
          <input
            type="text"
            name="departure"
            value={updatedBusData.departure}
            onChange={handleUpdateInputChange}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Cost</label>
          <input
            type="number"
            name="cost"
            value={updatedBusData.cost}
            onChange={handleUpdateInputChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={!selectedBusId}>
          Update Bus
        </button>
        <button
          type="button"
          className="btn btn-danger ml-2"
          onClick={handleDeleteBus}
          disabled={!selectedBusId}
        >
          Delete Bus
        </button>
      </form>
    </div>
  );
};

export default UpdateDeleteBusForm;
