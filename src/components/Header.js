import React from "react";
import './Header.css'

//functional component
const header=()=>{
    return(
        <div className="ui fixed menu">
            <div className="ui container center">
                <h1 id="head1">Contact Manager</h1>
            </div>
        </div>
    );
};
export default header;