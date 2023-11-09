import React, { useState } from "react";
import { formatDateTime, showToastSuccessMessage } from "../constants";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "./styles.css";
import Swal from "sweetalert2";

function ClientAppointments({
  appointments,
  id,
  getNewAppointment,
  getEditedAppointment,
  getDeleteAppointment,
}) {
  const [editAppointment, setEditAppointment] = useState("");
  const [editedAppointmentIndex, setEditedAppointmentIndex] = useState(null);
  const [addAppointment, setAddAppointment] = useState(false);
  const [appointment, setAppointment] = useState(dayjs(new Date()));

  const handleAppointmentChange = (appointmentIndex) => {
    setEditedAppointmentIndex(appointmentIndex);
  };
  const color = "white";

  const handleAppointmentAdd = (call) => {
    if (call === "Add") {
      getNewAppointment(id, appointment);
      showToastSuccessMessage("Appointment Added Successfully");
    }
    setAddAppointment(false);
    setAppointment(dayjs(new Date()));
  };

  const handleAppointmentEdit = (appointmentId) => {
    if (editAppointment) {
      getEditedAppointment(id, appointmentId, editAppointment);
    }
    setEditedAppointmentIndex(null);
    showToastSuccessMessage("Appointment Updated Successfully");
  };

  const handleAppointmentDelete = (appointmentId) => {
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
        getDeleteAppointment(id, appointmentId);

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
              label={`${addAppointment ? "CLOSE" : "ADD"}`}
              color="primary"
              onClick={() => setAddAppointment(!addAppointment)}
            />
          </div>
        </div>
        {appointments.map((k, i) => {
          return (
            <div key={k.id} className="appointment-container">
              {editedAppointmentIndex === i ? (
                <div className="appointment-add-datetimepicker">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDateTimePicker
                      defaultValue={dayjs(k)}
                      onChange={(e) => {
                        setEditAppointment(e);
                      }}
                      sx={{
                        svg: { color },
                        input: { color },
                        label: { color },
                        border: "1px solid white",
                        borderRadius: "8px",
                        margin: "10px",
                      }}
                    />
                  </LocalizationProvider>
                  <button onClick={() => handleAppointmentEdit(i)}>Add</button>
                  <button onClick={() => setEditedAppointmentIndex(null)}>
                    Cancel
                  </button>
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
                        onClick={() => handleAppointmentChange(i)}
                      />
                      <img
                        src="./images/delete.png"
                        alt="Edit"
                        onClick={() => handleAppointmentDelete(i)}
                      />
                    </div>
                  </Stack>
                </div>
              )}
            </div>
          );
        })}
        {addAppointment && (
          <div className="appointment-add-datetimepicker">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <MobileDateTimePicker
                defaultValue={appointment}
                onChange={(e) => {
                  setAppointment(e);
                }}
                sx={{
                  svg: { color },
                  input: { color },
                  label: { color },
                  border: "1px solid white",
                  borderRadius: "8px",
                  margin: "10px",
                }}
                format="DD/MM/YYYY hh:MM:ss"
              />
            </LocalizationProvider>
            <button onClick={() => handleAppointmentAdd("Add")}>Add</button>
            <button onClick={() => handleAppointmentAdd("Cancel")}>
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ClientAppointments;
