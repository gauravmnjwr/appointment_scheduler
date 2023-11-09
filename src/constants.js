import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function generateRandomId() {
  const timestamp = new Date().getTime(); // Get a unique timestamp
  const random = Math.random().toString(36).substr(2, 9); // Generate a random string
  const randomId = timestamp + random; // Combine timestamp and random string

  return randomId;
}

export function formatDateTime(dateTimeString) {
  const dateTime = new Date(dateTimeString);

  const year = dateTime.getFullYear();
  const month = String(dateTime.getMonth() + 1).padStart(2, "0"); // Zero-padding for months
  const day = String(dateTime.getDate()).padStart(2, "0"); // Zero-padding for days

  const hours = String(dateTime.getHours()).padStart(2, "0"); // Zero-padding for hours
  const minutes = String(dateTime.getMinutes()).padStart(2, "0"); // Zero-padding for minutes

  const formattedDate = `${day}/${month}/${year}`;
  const formattedTime = `${hours}:${minutes}`;

  return { date: formattedDate, time: formattedTime };
}

export const showToastSuccessMessage = (message) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const showToastDangerMessage = (message) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

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
