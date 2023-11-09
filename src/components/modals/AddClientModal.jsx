import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { MobileDateTimePicker } from "@mui/x-date-pickers/MobileDateTimePicker";
import dayjs from "dayjs";
import { DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { showToastDangerMessage } from "../../constants";
import "../styles.css";

const AddClientModal = ({ open, onClose, onAddClient }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    location: "",
    appointmentDateTimes: dayjs(new Date()),
  });
  const handleAddClient = () => {
    if (
      userData.firstName === "" ||
      userData.lastName === "" ||
      userData.location === ""
    ) {
      showToastDangerMessage("Please Fill all the required Fields");
      return;
    }
    onAddClient({
      userData,
    });

    setUserData({
      firstName: "",
      lastName: "",
      location: "",
      appointmentDateTimes: dayjs(new Date()),
    });
    onClose();
  };

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
          width: 300,
          bgcolor: "#1D1E22",
          border: "2px solid gray",
          boxShadow: 24,
          color: "white",
          p: 2,
          borderRadius: "10px",
        }}
      >
        <Typography id="add-client-modal-title" variant="h6" component="h2">
          Add Client
        </Typography>
        <TextField
          label="First Name"
          value={userData.firstName}
          onChange={(e) =>
            setUserData({ ...userData, firstName: e.target.value })
          }
          InputProps={{
            style: {
              color: "white",
              border: "1px solid white",
            },
          }}
          fullWidth
          margin="normal"
          InputLabelProps={{
            style: {
              color: "gray",
            },
          }}
        />
        <TextField
          label="Last Name"
          value={userData.lastName}
          onChange={(e) =>
            setUserData({ ...userData, lastName: e.target.value })
          }
          fullWidth
          margin="normal"
          InputProps={{
            style: {
              color: "white",
              border: "1px solid white",
            },
          }}
          InputLabelProps={{
            style: {
              color: "gray",
            },
          }}
        />
        <TextField
          label="Location"
          value={userData.location}
          onChange={(e) =>
            setUserData({ ...userData, location: e.target.value })
          }
          fullWidth
          margin="normal"
          InputProps={{
            style: {
              color: "white",
              border: "1px solid white",
            },
          }}
          InputLabelProps={{
            style: {
              color: "gray",
            },
          }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoItem label="Select Appointment Date">
            <MobileDateTimePicker
              defaultValue={dayjs(new Date())}
              value={userData.appointmentDateTimes}
              minDate={dayjs(new Date())}
              onChange={(e) =>
                setUserData({ ...userData, appointmentDateTimes: e })
              }
              sx={{
                svg: { color: "white" },
                input: { color: "white" },
                label: { color: "gray" },
                borderRadius: "8px",
                border: "1px solid white",
              }}
              format="DD/MM/YYYY hh:mm:ss"
            />
          </DemoItem>
        </LocalizationProvider>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddClient}
          fullWidth
          className="addClient-btn"
        >
          Add Client
        </Button>
      </Box>
    </Modal>
  );
};

export default AddClientModal;
