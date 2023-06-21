import React from "react";
import user from "../images/user.jpg";
import { Link, useParams } from "react-router-dom";
import './Contactdetails.css'

const Contactdetails = (props) => {
  const { id } = useParams();
  const contact = props.contacts.find((c) => c.id === id);

  if (!contact) {
    return <div>Contact not found</div>;
  }

  const { name, email } = contact;

  return (
    <div className="main" id="first">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="center-div">
        <Link to="/">
          <button className="ui button blue center">Back to Contact List</button>
        </Link>
      </div>
    </div>
  );
};

export default Contactdetails;
