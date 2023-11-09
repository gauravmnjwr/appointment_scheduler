import React, { useState } from "react";
import { formatDateTime, showToastSuccessMessage } from "../constants";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Swal from "sweetalert2";

function ClientAppointments({
  appointments,
  id,
  getNewAppointment,
  getEditedAppointment,
  getDeleteAppointment,
}) {
  const [editIndex, setEditIndex] = useState(null);
  const [isAdding, setAdding] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(dayjs(new Date()));

  const handleAppointmentAction = (action, index) => {
    if (action === "Add") {
      getNewAppointment(id, selectedDateTime);
      showToastSuccessMessage("Appointment Added Successfully");
    } else if (action === "Edit") {
      getEditedAppointment(id, index, selectedDateTime);
      showToastSuccessMessage("Appointment Updated Successfully");
    } else if (action === "Delete") {
      handleDeleteAppointment(index);
    }
    setEditIndex(null);
    setAdding(false);
    setSelectedDateTime(dayjs(new Date()));
  };

  const handleDeleteAppointment = (index) => {
    Swal.fire({
      title: "Are you sure you want to delete this appointment?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        getDeleteAppointment(id, index);

        Swal.fire({
          title: "Deleted!",
          text: "Appointment has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
      <div>
        <div className="appointment-main">
          <div>Upcoming Appointments</div>
          <div>
            <Chip
              label={`${isAdding ? "CLOSE" : "ADD"}`}
              color="primary"
              onClick={() => setAdding(!isAdding)}
            />
          </div>
        </div>
        {appointments.map((k, i) => (
          <div key={k.id} className="appointment-container">
            {editIndex === i ? (
              <div className="appointment-add-datetimepicker">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileDateTimePicker
                    defaultValue={dayjs(k)}
                    onChange={(e) => setSelectedDateTime(e)}
                    sx={{
                      svg: { color: "white" },
                      input: { color: "white" },
                      label: { color: "white" },
                      border: "1px solid white",
                      borderRadius: "8px",
                      margin: "10px",
                    }}
                    format="DD/MM/YYYY hh:MM:ss"
                  />
                </LocalizationProvider>
                <button onClick={() => handleAppointmentAction("Edit", i)}>
                  Add
                </button>
                <button onClick={() => setEditIndex(null)}>Cancel</button>
              </div>
            ) : (
              <div>
                <Stack direction="row" spacing={1} margin={1}>
                  <Chip
                    label={formatDateTime(k).date}
                    variant="outlined"
                    color="warning"
                  />
                  <Chip
                    label={formatDateTime(k).time}
                    variant="outlined"
                    color="warning"
                  />
                  <div className="appointment-edit-img">
                    <img
                      src="./images/edit.png"
                      alt="Edit"
                      onClick={() => setEditIndex(i)}
                    />
                    <img
                      src="./images/delete.png"
                      alt="Edit"
                      onClick={() => handleAppointmentAction("Delete", i)}
                    />
                  </div>
                </Stack>
              </div>
            )}
          </div>
        ))}
        {isAdding && (
          <div className="appointment-add-datetimepicker">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker
                defaultValue={selectedDateTime}
                onChange={(e) => setSelectedDateTime(e)}
                sx={{
                  svg: { color: "white" },
                  input: { color: "white" },
                  label: { color: "white" },
                  border: "1px solid white",
                  borderRadius: "8px",
                  margin: "10px",
                }}
                format="DD/MM/YYYY hh:MM:ss"
              />
            </LocalizationProvider>
            <button onClick={() => handleAppointmentAction("Add")}>Add</button>
            <button onClick={() => handleAppointmentAction("Cancel")}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientAppointments;
