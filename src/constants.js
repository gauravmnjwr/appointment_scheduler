import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//Generating Random ID for Client
export function generateRandomId() {
  const timestamp = new Date().getTime(); // Get a unique timestamp
  const random = Math.random().toString(36).substr(2, 9); // Generate a random string
  const randomId = timestamp + random; // Combine timestamp and random string

  return randomId;
}

//Get Formatted Date and Time
export function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);

  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, "0");
  const day = String(dateTime.getDate()).padStart(2, "0");

  const hours = String(dateTime.getHours()).padStart(2, "0");
  const minutes = String(dateTime.getMinutes()).padStart(2, "0");

  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}`;

  return { date: formattedDate, time: formattedTime };
}

//Show Success Message
export const showToastSuccessMessage = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

//Show Danger Message
export const showToastDangerMessage = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

//Generate events based on start event and end event for Calender
export const generateEvents = (clients) => {
  let transformedAppointments = [];

  clients.forEach((appointment, index) => {
    appointment.appointmentDateTimes.forEach((startTime) => {
      const start = new Date(startTime);
      const end = new Date(start);
      end.setHours(end.getHours() + 1);

      transformedAppointments.push({
        id: transformedAppointments.length + 1,
        title: `${appointment.firstName} ${appointment.lastName}`,
        start,
        end,
      });
    });
  });

  return transformedAppointments;
};
