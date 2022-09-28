import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './components/Homepage';


const root = ReactDOM.createRoot(document.getElementById('root'));

let RAILS_BASE_URL;
if( process.env.NODE_ENV === 'development'){
  RAILS_BASE_URL = 'http://localhost:3000';
} else {
  RAILS_BASE_URL = 'https://blandbook-server.herokuapp.com';
}

// root.render(<App cableApp={CableApp}/>);
root.render(<Homepage />);
// root.render(<Homepage cableApp={CableApp}/>);


