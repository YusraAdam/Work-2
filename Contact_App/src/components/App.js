import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css";
import Header from "./Header";
import Addcon from "./Addcon";
import Contactlist from "./Contactlist";
import Contactdetails from "./Contactdetails";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(
    JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) ?? []
  );
// Adding contacts
  const Addconhandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };
// Removing contacts
  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  // useEffect(() => {
    //retrieving from local storage so that after refresh content remains there
  //   const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (retriveContacts) setContacts(retriveContacts);
  // }, []);

  useEffect(() => {
    //Storing in local storage->inspect->application
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          <Route 
          path="/" 
          exact 
          element={(
          <Contactlist
            contacts={contacts}
            getContactId={removeContactHandler}
            />
        )}
          />
          <Route 
          path="/add" 
          element={
            <Addcon Addconhandler={Addconhandler} />
          }
          />
          <Route path="/contact/:id" element={<Contactdetails contacts={contacts} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;