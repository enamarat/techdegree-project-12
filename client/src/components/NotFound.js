import React from 'react';
import Photo from "../images/baboo.jpg";


const NotFound = () => {

    return(
      <div className="container" id="not-found">
        <div className="row">
          <div className="col col-12 col-md my-auto" id="not-found-header">
            <h3> Error 404: page not found</h3>
            <p>The route you requested doesn't exist.</p>
          </div>
          <div className="col" id="picture">
            <img src={Photo} alt="baboo" id="baboo"/>
          </div>
        </div>
      </div>
    );
}

export default NotFound;
