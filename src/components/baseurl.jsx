import React from "react";

let RAILS_BASE_URL;
if( process.env.NODE_ENV === 'development'){

  RAILS_BASE_URL = 'http://localhost:3000';
} else {
  RAILS_BASE_URL = 'https://blandbook-server.herokuapp.com';
}

export default RAILS_BASE_URL