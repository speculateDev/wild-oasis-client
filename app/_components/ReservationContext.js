"use client";

import { createContext, useState, useContext } from "react";

const initialState = {
  from: undefined,
  to: undefined,
};

const ReservationContext = createContext();

function ReservationProvider({ children }) {
  const [range, setRange] = useState(initialState);

  const resetRange = () => setRange(initialState);

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

function useReservation() {
  const context = useContext(ReservationContext);
  if (!context) throw new Error("Context was used outside provider");
  return context;
}

export { useReservation, ReservationProvider };
