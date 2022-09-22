// import logo from './logo.svg';

import './App.css';
import { Route, HashRouter as Router, Link } from 'react-router-dom';

import LoginMain from './components/LoginMain';


function App() {


  const homeIcon = <span class="material-symbols-outlined">home_app_logo</span>
  const settingIcon = <span class="material-symbols-outlined">settings</span>
  const accountIcon = <span class="material-symbols-outlined">account_circle</span>
  const chatIcon = <span class="material-symbols-outlined">chat</span>
  const groupChatIcon = <span class="material-symbols-outlined">forum</span>
  const weatherIcon = <span class="material-symbols-outlined">nest_farsight_weather</span>
  const calendarIcon = <span class="material-symbols-outlined">calendar_month</span>

  // const locationIcon = <span class="material-symbols-outlined">location_on</span>

  return (
    <div className="App">
      {/* This is the template layout */}

      <Router>
        <div className='container'>
          {/* flex container */}
          <nav>
            {/* all a_tags here */}
            <Link to="#">{settingIcon}</Link>
            <Link to="#">{homeIcon}</Link>  
            <Link to="#">{accountIcon}</Link>
            <Link to="#">{chatIcon}</Link>
            <Link to="#">{groupChatIcon}</Link>
            <Link to="#">{weatherIcon}</Link>
            <Link to="#">{calendarIcon}</Link>
          </nav>

          <main>
            {/* all Components here */}

            <LoginMain />
            <div className='test'>DIV test</div>
          </main>

        </div>
        {/* flex container end */}


        <footer className='center'>
          {/* footer info here */}
          &copy; Blandbook @ 2022
        </footer>


       

      </Router>
    </div>
  );
}

export default App;
