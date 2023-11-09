import React, { useState } from "react";
import { formatDateTime, showToastSuccessMessage } from "../constants";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import Swal from "sweetalert2";
import {
  createAppointment,
  updateAppointment,
  removeAppointment,
} from "../redux/slices/clientsSlice";
import { useDispatch } from "react-redux";
import "./styles.css";

function ClientAppointments({ appointments, id }) {
  const [editAppointment, setEditAppointment] = useState(dayjs(new Date()));
  const [editedAppointmentIndex, setEditedAppointmentIndex] = useState(null);
  const [addAppointment, setAddAppointment] = useState(false);
  const [appointment, setAppointment] = useState(dayjs(new Date()));

  const dispatch = useDispatch();

  //handle appointment index when changed
  const handleAppointmentChange = (appointmentIndex) => {
    setEditAppointment(dayjs(appointments[appointmentIndex]));
    setEditedAppointmentIndex(appointmentIndex);
  };

  //Appointment Add Function
  const handleAppointmentAdd = (call) => {
    if (call === "Add") {
      dispatch(createAppointment({ id, appointment: appointment }));
      showToastSuccessMessage("Appointment Added Successfully");
    }
    setAddAppointment(false);
    setAppointment(dayjs(new Date()));
  };

  //Appointment Edit Function
  const handleAppointmentEdit = (appointmentId) => {
    if (editAppointment) {
      dispatch(
        updateAppointment({
          clientId: id,
          appointmentId,
          newAppointment: editAppointment,
        })
      );
    }
    setEditedAppointmentIndex(null);
    showToastSuccessMessage("Appointment Updated Successfully");
  };

  //Appointment Delete FUnction
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
        dispatch(
          removeAppointment({ clientId: id, appointmentIndex: appointmentId })
        );
        Swal.fire({
          title: "Deleted!",
          text: "Appointment has been deleted.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="appointment_container">
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
            <div key={i} className="appointment-container">
              {editedAppointmentIndex === i ? (
                <div className="appointment-add-datetimepicker">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDateTimePicker
                      defaultValue={editAppointment}
                      onChange={(e) => {
                        setEditAppointment(e);
                      }}
                      sx={{
                        svg: { color: "white" },
                        input: { color: "white" },
                        label: { color: "white" },
                        border: "1px solid white",
                        borderRadius: "8px",
                        margin: "10px",
                      }}
                      format="DD/MM/YYYY hh:mm:ss"
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
                  svg: { color: "white" },
                  input: { color: "white" },
                  label: { color: "white" },
                  border: "1px solid white",
                  borderRadius: "8px",
                  margin: "10px",
                }}
                format="DD/MM/YYYY hh:mm:ss"
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
