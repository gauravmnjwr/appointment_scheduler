import React, { useState } from "react";
import ClientList from "./components/ClientList";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import CalendarModal from "./components/modals/CalendarModal";
import { generateEvents } from "./constants";
import "./App.css";

function App() {
  const clients = useSelector((state) => state.clients.clients);
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  const events = generateEvents(clients);
  return (
    <div className="app">
      <div>
        <h1>Fitness Trainer Appointment Scheduling</h1>
        <div
          onClick={() => {
            setOpen(true);
          }}
        >
          Calender
        </div>
      </div>
      {}
      <ClientList clients={clients} />
      <CalendarModal open={open} onClose={onClose} events={events} />
    </div>
  );
}

export default App;
