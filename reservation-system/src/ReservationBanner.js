import React from 'react';

export const ReservationBanner = ({ name, reservations }) =>
  <h4 className="bg-primary text-white text-center p-2">
    Reservation System
    ({reservations.filter(r => !r.reserved).length} slots available)
  </h4>