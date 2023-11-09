import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const CalendarModal = ({ open, onClose, events }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-client-modal-title"
      aria-describedby="add-client-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "75%",
          bgcolor: "white",
          border: "2px solid gray",
          boxShadow: 24,
          color: "white",
          p: 2,
          borderRadius: "10px",
        }}
      >
        <div className="calender-modal-close-btn">
          <button onClick={() => onClose()}>Close</button>
        </div>
        <div style={{ height: 500 }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{
              background: "white",
              color: "black",
            }}
            eventPropGetter={(event, start, end, isSelected) => ({
              style: {
                backgroundColor: "#ED6C02",
                color: "white",
              },
            })}
            step={30}
          />
        </div>
      </Box>
    </Modal>
  );
};

export default CalendarModal;
