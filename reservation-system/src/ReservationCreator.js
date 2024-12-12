import React, { useState } from 'react';

export const ReservationCreator = ({ callback }) => {
  const [newArea, setNewArea] = useState("");
  const [newTime, setNewTime] = useState("");

  const createReservation = () => {
    callback(newArea, newTime);
    setNewArea("");
    setNewTime("");
  };

  return (
    <div className="my-1">
      <input 
        className="form-control"
        placeholder="Area"
        value={newArea}
        onChange={(e) => setNewArea(e.target.value)} 
      />
      <input 
        className="form-control mt-1"
        placeholder="Time Slot"
        value={newTime}
        onChange={(e) => setNewTime(e.target.value)} 
      />
      <button 
        className="btn btn-primary mt-1"
        onClick={createReservation}
      >
        Add Reservation
      </button>
    </div>
  );
};