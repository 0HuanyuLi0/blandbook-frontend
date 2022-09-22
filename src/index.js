import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import * as serviceWorker from './serviceWorkerRegistration';
import ActionCable from 'action-cable-react-jwt';
import 'bootstrap/dist/css/bootstrap.min.css';
import Homepage from './components/Homepage';


const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(<App cableApp={CableApp}/>);
root.render(<Homepage />);
// root.render(<Homepage cableApp={CableApp}/>);

serviceWorker.unregister()
