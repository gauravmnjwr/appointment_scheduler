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
    //For creating Client
    createClient: (state, action) => {
      state.clients.push(action.payload);
    },
    //Reducer Fn for updating Client
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
    //Reducer Fn for deleting Client
    removeClient: (state, action) => {
      const { clientId } = action.payload;
      state.clients = state.clients.filter((client) => client.id !== clientId);
    },

    //Reducer Fn for Creating Appointment
    createAppointment: (state, action) => {
      const { id, appointment } = action.payload;
      const client = state.clients.find((client) => client.id === id);
      if (client) {
        client.appointmentDateTimes.push(appointment);
      }
    },
    //Reducer Fn for Editing Appointment
    updateAppointment: (state, action) => {
      const { clientId, appointmentId, newAppointment } = action.payload;
      const client = state.clients.find((client) => client.id === clientId);
      if (client) {
        client.appointmentDateTimes[appointmentId] = newAppointment;
      }
    },
    //Reducer Fn for Deleting Appointment
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
  },
});

export const {
  updateClient,
  createClient,
  removeClient,
  createAppointment,
  updateAppointment,
  removeAppointment,
} = clientsSlice.actions;

export default clientsSlice.reducer;
