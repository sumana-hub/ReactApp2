import React, { useState, useEffect } from 'react';
import { ReservationBanner } from "./ReservationBanner";
import { ReservationCreator } from "./ReservationCreator";
import { SlotRow } from "./SlotRow";
import { VisibilityControl } from "./VisibilityControl";

export default function App() {
  const [userName, setUserName] = useState("Guest");
  const [reservationItems, setReservationItems] = useState([
    { area: "Forest Park", time: "9:00 AM - 12:00 PM", reserved: false },
    { area: "Mountain View", time: "12:00 PM - 3:00 PM", reserved: true },
    { area: "Lake Side", time: "3:00 PM - 6:00 PM", reserved: false },
    { area: "Green Valley", time: "9:00 AM - 12:00 PM", reserved: false }
  ]);
  const [showReserved, setShowReserved] = useState(true);

  useEffect(() => {
    let data = localStorage.getItem("reservations");
    
    if (data != null) {
      let savedState = JSON.parse(data);
      setUserName(savedState.userName);
      setReservationItems(savedState.reservationItems);
      setShowReserved(savedState.showReserved);
    }
  }, []);

  const createNewReservation = (area, time) => {
    if (!reservationItems.find(item => item.area === area && item.time === time)) {
      const newReservationItems = [
        ...reservationItems, 
        { area, time, reserved: false }
      ];
      setReservationItems(newReservationItems);
      localStorage.setItem("reservations", JSON.stringify({
        userName,
        reservationItems: newReservationItems,
        showReserved
      }));
    }
  };

  const toggleReservation = (reservation) => {
    const newReservationItems = reservationItems.map(item => 
      item.area === reservation.area && item.time === reservation.time
        ? { ...item, reserved: !item.reserved }
        : item
    );
    setReservationItems(newReservationItems);
    localStorage.setItem("reservations", JSON.stringify({
      userName,
      reservationItems: newReservationItems,
      showReserved
    }));
  };

  const reservationTableRows = (reservedValue) => 
    reservationItems
      .filter(item => item.reserved === reservedValue)
      .map(item => (
        <SlotRow 
          key={`${item.area}-${item.time}`} 
          item={item} 
          callback={toggleReservation} 
        />
      ));

  return (
    <div>
      <ReservationBanner name={userName} reservations={reservationItems} />
      <div className="container-fluid">
        <ReservationCreator callback={createNewReservation} />
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Area</th>
              <th>Time</th>
              <th>Reserved</th>
            </tr>
          </thead>
          <tbody>
            {reservationTableRows(false)}
          </tbody>
        </table>
        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl 
            description="Reserved Slots"
            isChecked={showReserved}
            callback={setShowReserved} 
          />
        </div>
        {showReserved && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Area</th>
                <th>Time</th>
                <th>Reserved</th>
              </tr>
            </thead>
            <tbody>
              {reservationTableRows(true)}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}