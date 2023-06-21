import React from "react";
import {Link} from "react-router-dom";
import Contcard from "./Contcard";
import './Contactlist.css'

const Contactlist = (props) => {
  console.log(props);

  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };
  const renderContactList =props.contacts.map((contact) => {
    return (
      <Contcard
        contact={contact}
        clickHander={deleteContactHandler}
        key={contact.id}
      />
    );
  });
  return(
    <div class="main">
      <h2 id="head2">
        Contact list
        <Link to="/add">
        <button className="ui button blue right" id="but1">Add Contact</button>
        </Link>
      </h2>
      <div className="ui celled list">{renderContactList}</div>
    </div>
  );
};
export default Contactlist;