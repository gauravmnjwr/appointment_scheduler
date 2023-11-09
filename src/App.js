import React, { useState } from "react";
import ClientList from "./components/ClientList";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import CalendarModal from "./components/modals/CalendarModal";
import { generateEvents } from "./constants";
import "./App.css";

function App() {
  //fetching state from redux
  const clients = useSelector((state) => state.clients.clients);
  const [open, setOpen] = useState(false);

  //To close calender modal
  const onClose = () => {
    setOpen(false);
  };

  //Generating Events as starting to ending for Calender
  const events = generateEvents(clients);
  return (
    <div className="app">
      <div className="app-heading">
        <h1>Fitness Trainer Appointment Scheduling</h1>
        <button
          onClick={() => {
            setOpen(true);
          }}
        >
          {open ? "Close" : "Show"} Calendar
          <img src="./images/calender.png" alt="" />
        </button>
      </div>
      <ClientList clients={clients} />
      <CalendarModal open={open} onClose={onClose} events={events} />
    </div>
  );
}

export default App;
