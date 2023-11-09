import React, { useState } from "react";
import AddClientModal from "./modals/AddClientModal";
import ClientAppointments from "./ClientAppointments";
import { generateRandomId } from "../constants";
import "./styles.css";
import {
  updateClient,
  createClient,
  removeClient,
  createAppointment,
  updateAppointment,
  removeAppointment,
} from "../redux/slices/clientsSlice";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { showToastSuccessMessage } from "../constants";

function ClientList({ clients }) {
  const [open, setOpen] = useState(false);
  const [editedClientId, setEditedClientId] = useState(null);
  const [editedUserDetails, setEditedUserDetails] = useState({
    firstName: "",
    lastName: "",
    location: "",
  });

  const dispatch = useDispatch();

  const onAddClient = (data) => {
    const renderedData = data.userData;
    renderedData.appointmentDateTimes = [
      renderedData.appointmentDateTimes.format("YYYY-MM-DD HH:mm:ss"),
    ];
    renderedData.id = generateRandomId();

    dispatch(createClient(renderedData));
    Swal.fire({
      title: "Success!",
      text: "Client Added Successfully!",
      icon: "success",
    });
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleEditClient = (clientId) => {
    setEditedClientId(clientId);
    const clientToEdit = clients.find((client) => client.id === clientId);
    setEditedUserDetails({
      firstName: clientToEdit.firstName,
      lastName: clientToEdit.lastName,
      location: clientToEdit.location,
    });
  };

  const handleDeleteClient = (clientId) => {
    Swal.fire({
      title: "Are you sure you want to delete this Client?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeClient({ clientId }));

        Swal.fire({
          title: "Deleted!",
          text: "Client has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleSaveClient = () => {
    dispatch(updateClient({ id: editedClientId, data: editedUserDetails }));
    showToastSuccessMessage("Client Details Updated Successfully");

    setEditedUserDetails({
      firstName: "",
      lastName: "",
      location: "",
    });
    setEditedClientId(null);
  };

  const getNewAppointment = (id, appointmentDateTimes) => {
    dispatch(createAppointment({ id, appointment: appointmentDateTimes }));
  };

  const getEditedAppointment = (id, appointmentId, editAppointment) => {
    dispatch(
      updateAppointment({
        clientId: id,
        appointmentId,
        newAppointment: editAppointment,
      })
    );
  };
  const getDeleteAppointment = (clientId, appointmentId) => {
    dispatch(removeAppointment({ clientId, appointmentIndex: appointmentId }));
  };

  return (
    <div>
      <button className="add-client-btn" onClick={() => setOpen(!open)}>
        Add Client
      </button>
      <div>
        <div className="client_list">
          {clients.map((e) => {
            const isEditing = e.id === editedClientId;
            return (
              <div key={e.id} className="client-card">
                <div className="client_userdetails">
                  <div>
                    {isEditing ? (
                      <div className="userdetails_edit">
                        <div>
                          <input
                            type="text"
                            value={editedUserDetails.firstName}
                            onChange={(e) =>
                              setEditedUserDetails({
                                ...editedUserDetails,
                                firstName: e.target.value,
                              })
                            }
                            placeholder="First Name"
                          />
                          <input
                            type="text"
                            value={editedUserDetails.lastName}
                            onChange={(e) =>
                              setEditedUserDetails({
                                ...editedUserDetails,
                                lastName: e.target.value,
                              })
                            }
                            placeholder="Last Name"
                          />
                        </div>
                        <div>
                          <input
                            type="text"
                            value={editedUserDetails.location}
                            onChange={(e) =>
                              setEditedUserDetails({
                                ...editedUserDetails,
                                location: e.target.value,
                              })
                            }
                            placeholder="Location"
                          />
                        </div>
                        <button onClick={handleSaveClient}>Save</button>
                        <button onClick={() => setEditedClientId(null)}>
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="client_basicdetails">
                        <div className="basic">
                          <div className="name">
                            {e.firstName} {e.lastName}
                          </div>
                          <div className="userdetails_edit_images">
                            <img
                              src="./images/edit.png"
                              alt="Edit"
                              onClick={() => handleEditClient(e.id)}
                            />
                            <img
                              src="./images/delete.png"
                              alt="Edit"
                              onClick={() => handleDeleteClient(e.id)}
                            />
                          </div>
                        </div>
                        <div className="loc">{e.location}</div>
                      </div>
                    )}
                  </div>
                </div>
                <ClientAppointments
                  id={e.id}
                  appointments={e.appointmentDateTimes}
                  getNewAppointment={getNewAppointment}
                  getEditedAppointment={getEditedAppointment}
                  getDeleteAppointment={getDeleteAppointment}
                />
              </div>
            );
          })}
        </div>
      </div>

      <AddClientModal open={open} onAddClient={onAddClient} onClose={onClose} />
    </div>
  );
}

export default ClientList;
