// appointmentsSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  clients: [
    {
      id: 149218409121909,
      firstName: "John",
      lastName: "Doe",
      location: "Gold's Gym, AUS TX",
      appointmentDateTimes: ["2023-12-01T14:00", "2023-11-07 06:30:00"],
    },
    {
      id: 932842093509325,
      firstName: "Alice",
      lastName: "Smith",
      location: "Gold's Gym, AUS TX",
      appointmentDateTimes: ["2023-12-03T15:30", "2023-12-05T11:00"],
    },
  ],
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    createClient: (state, action) => {
      state.clients.push(action.payload);
    },
    updateClient: (state, action) => {
      const { id, data } = action.payload;
      const { firstName, lastName, location } = data;
      const clientIndex = state.clients.findIndex((client) => client.id === id);
      if (clientIndex !== -1) {
        const updatedClient = {
          ...state.clients[clientIndex],
          firstName,
          lastName,
          location,
        };
        state.clients[clientIndex] = updatedClient;
      }
    },
    removeClient: (state, action) => {
      const { clientId } = action.payload;
      state.clients = state.clients.filter((client) => client.id !== clientId);
    },
    createAppointment: (state, action) => {
      const { id, appointment } = action.payload;
      const client = state.clients.find((client) => client.id === id);
      if (client) {
        client.appointmentDateTimes.push(appointment);
      }
    },
    updateAppointment: (state, action) => {
      const { clientId, appointmentId, newAppointment } = action.payload;
      const client = state.clients.find((client) => client.id === clientId);
      if (client) {
        client.appointmentDateTimes[appointmentId] = newAppointment;
      }
    },
    removeAppointment: (state, action) => {
      const { clientId, appointmentIndex } = action.payload;
      const client = state.clients.find((client) => client.id === clientId);
      if (client) {
        if (
          appointmentIndex >= 0 &&
          appointmentIndex < client.appointmentDateTimes.length
        ) {
          client.appointmentDateTimes.splice(appointmentIndex, 1);
        }
      }
    },
    abcd: (state, action) => {
      console.log(action.payload);
    },
  },
});

export const {
  updateClient,
  createClient,
  removeClient,
  createAppointment,
  updateAppointment,
  removeAppointment,
  abcd,
} = clientsSlice.actions;

export default clientsSlice.reducer;
