
// Tools imports
import { Route, HashRouter as Router, Link, Redirect } from 'react-router-dom';
import React from 'react';
import axios from 'axios';
// import { Switch } from "react-router";

// CSS imports
import '../App.css';
import '../css/first_row_info.css'
import '../css/shows.css'
import '../css/chat.css'
import '../css/posts.css'
import '../css/search.css'
import '../css/newchatform.css'
import '../css/login_signup.css'
import 'bootstrap/dist/css/bootstrap.min.css';

// Components imports
import ChatroomShow from './ChatroomShow';
import CurrentUserInfo from './CurrentUserInfo';
import Icons from './Icons';
import SearchForm from './SearchForm';
import AllChatRooms from './AllChatRooms';
import ChatroomCreate from './ChatroomCreate';
import Login from './Login';
import Posts from './Posts';
import SignUpMain from './SignUpMain';
import SearchResults from './SearchResults';
import FriendsList from './FriendsList';
import Comments from "./Comments";
import UserLocation from './UserLocation';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {RAILS_BASE_URL,REACT_BASE_URL} from './baseurl' 


class Homepage extends React.Component {

  state = {
    currentUser: null,
    queryResults: null,
    error: null,
    room: null,
    allRooms: [],
    currentRoom: {
      chatroom: {},
      users: [],
      messages: []
    },
    showSearchResults:false,
    query:null,
    chatroomVisibility: 'visible',
    friendsVisibility: 'visible',
    updateList:false,
    showSignup: false,
    
  }

  getCurrentUser = (userInfo) => {
    // get the current info.(from CurrentUserInfo component) 
    // we can use this function to share current user info

    this.setState({
      currentUser: userInfo,
      loading: false
    })
    console.log(userInfo.id);
  }

  getQueryResults = (resutls,query) => {
    // get the query words from search form
    this.setState({
      queryResults: resutls,
      showSearchResults:true,
      query:query
    })
    console.log('Query from Search Form: ', resutls);

  }

  getChatRoom = (room) => {
    // get the chat room id from 'all chat rooms' list
    //room here is an object
    this.getRoomData(room.id)  
    this.setState({
      room: room

    })

    console.log('clicked room:', room);


  }

  componentDidMount() {
    console.log('PATH: ',RAILS_BASE_URL);
    console.log(this.state.currentUser);

    // want to check if the user is logged in when we visit
    this.setCurrentUser();
  }


  getRoomData = (id) => {


    fetch(`${RAILS_BASE_URL}/chatrooms/${id}.json`)
      .then(response => response.json())
      .then(result => {
        console.log('The response from the chatroom fetch was ', result)
        this.setState({
          currentRoom: {
            chatroom: result,
            users: result.users,
            messages: result.messages
          }
        })
      })

    

  } //end getRoomData

  

  updateAppStateRoom = (newroom) => { //newroom is an object we get back from the ChatroomWebSocket after a message has been posted.
    
    this.setState({

      currentRoom: {
        chatroom: newroom.chatroom.data,
        users: newroom.users,
        messages: newroom.messages
      }

    })
  }

  // This is a function to get the current user from your database if there is one.
  // a token which holds a json web token 'jwt' from your local storage. (set this on the login page and signup main component)
  // pass through this token as an auth header which will let our server validate us
  setCurrentUser = () => {
    const jwt = localStorage.getItem("jwt"); // "jwt" comes from login component or signupmain component

    if (jwt === null) {
      return; //early return when user not log in
    }

    let token = "Bearer " + jwt;
    axios.defaults.headers.common['Authorization'] = token;
    axios.get(`${RAILS_BASE_URL}/users/current`)
      .then(res => {
        this.setState({ currentUser: res.data })
        //   console.log('LoginMain', res.data) // for test
      })
      .catch(err => console.warn(err))
  }

  toggleChat = () => {
      
      if(this.state.chatroomVisibility === 'visible'){
        this.setState({
          chatroomVisibility: 'invisible'
        })
      } else{
      
        this.setState({
          chatroomVisibility: 'visible'
        });
      }
  }

  //Hide and show the Followers/ Following panel
  toggleFriends = () => {
      
    if(this.state.friendsVisibility === 'visible'){
      this.setState({
        friendsVisibility: 'invisible'
      })
    } else{
    
      this.setState({
        friendsVisibility: 'visible'
      });
    }
}


// sign up and login form
  handleShow = () => {
    this.setState({showSignup: true})
  }

  handleNotShow =() => {
    this.setState({showSignup: false})
  }


  render() {
    return (


      <div className="App">
        {/* This is the template layout */}

        <Router>
          <div className='container outter_container'>
            {/* flex container */}
            <nav>
              {/* all a_tags here */}

              <Link to="#">{Icons.settings}</Link>
              <Link to="/">{Icons.home}</Link>
              <Link to="#" onClick={() => {this.toggleFriends()}}>{Icons.account}</Link>
              <Link to="#" onClick={() => {this.toggleChat()}}>{Icons.chat}</Link>
              <Link to="#" onClick={() => {this.toggleChat()}}>{Icons.groupChat}</Link>
              <Link to="#">{Icons.weather}</Link>
              <Link to="#">{Icons.calendar}</Link>

            </nav>

            <main>
              {/* all Components here */}


              <div className='first_row_info'>

                <strong>Dashboard</strong>

                <SearchForm classNames={'search_form'} results={this.getQueryResults} />

                {this.state.currentUser
                  &&
                  <CurrentUserInfo classNames={'user_info'} user={this.state.currentUser} />
                }
                {/* 
                  1. 'last_user' is for testing only, when app ready we can change to user.id. 
                  2. user's info got in this component and back to here by this.getCurrentUser, therefore, we can use this to share the current user info to other compoenet
                  3. classNames is a customized props used to set css
                */}
              </div>
              {/* end for first row info */}



              <SearchResults currentUser={this.state.currentUser} query={this.state.query} show={this.state.showSearchResults} results={this.state.queryResults} classNames={'search_results'} close={() => {
                this.setState({
                  queryResults: null,
                  query:null,
                  showSearchResults:false
                  // close the search results
                })
                }}

              phoneUpdate={
                ()=>{
                  this.setState({
                    updateList:true
                  })
                }
              }

                
               />

              {/* For search results show */}



              <div className="container">
              
                <div className='user_form'>

                  {this.state.currentUser === null
                    &&
                    <div style={this.state.showSignup ? {display: 'none'} : {}} className='login_form'>
                    <Login setCurrentUserLogin={this.setCurrentUser} />
                    <br />
                    Don't have an account? 
                    <br />
                    You are welcome to
                    <br />
                    <Button variant="primary" size="sm" onClick={this.handleShow}>Sign Up</Button>

                    <br />
                    </div>
                  }
                  <br />


                  {this.state.currentUser === null
                    &&
                    <div style={this.state.showSignup ? {} : { display: 'none' }} className='signup_form'>
                      <SignUpMain setCurrentUserSignup={this.setCurrentUser} />
                    <br />
                    Already have an account? You can
                    <br />
                    <Button variant="outline-primary" size="sm" onClick={this.handleNotShow}>Back to Login</Button>
                    <br /><br />
                    </div>
                  }

                </div>





                {this.state.currentUser
                  &&
                  <div className="friendsList">

                  </div>

                }

                {this.state.currentUser //ensure got the user info first
                  &&
                  <div className="chat_container">
                     <div className={this.state.chatroomVisibility}>
                      <AllChatRooms classNames={'all_chat_rooms'} currentUser_id={this.state.currentUser.id} clickedRoom={this.getChatRoom} />
                      </div>
                      <div className={this.state.friendsVisibility}>
                      <FriendsList currentUser={this.state.currentUser} update={this.state.updateList} resetUpdate={()=>{
                      this.setState({
                        updateList:false
                      })
                    }} />
                      </div>

                   


                    {this.state.room //ensure got the room id first
                      &&
                      // <ChatRoom classNames={'chatroom'} currentUser_id={this.state.currentUser.id} room={this.state.room} />
                      // <Route exact path ={`/chatrooms/${this.state.room}`} render={ (props) => {return this.state.currentUser ? 
                      // (
                      <ChatroomShow
                        //  
                        cableApp={this.props.cableApp}
                        updateApp={this.updateAppStateRoom}
                        getRoomData={this.getRoomData}
                        roomData={this.state.currentRoom}
                        currentUser={this.state.currentUser}
                        currentRoom={this.state.room}
                      />
                      
                 



                    }

                   
                    < UserLocation />

                  </div>



                }






                {this.state.currentUser
                  &&
                  <div className="post_container">
                    {/* <Switch> */}
                    {/* <Posts classNames={'posts'} currentUser={this.state.currentUser} />
                     */}

                    <Route exact path="/" render={() => <Posts classNames={'posts'} currentUser={this.state.currentUser} />} />

                    <Route exact path="/comments/:postId" render={(props) => <Comments currentUser={this.state.currentUser} {...props} />} />

                    <Route exact path="/newroom">
                      <ChatroomCreate currentUser={this.state.currentUser} />
                    </Route>



                    {/* </Switch> */}
                  </div>
                }

              </div>


              {/* components */}


            </main>
          </div>
          {/* flex container end */}

        </Router>

        <footer className='center'>
          {/* footer info here */}
          &copy; Blandbook @ 2022
        </footer>

      </div>
    );
  }
}

export default Homepage;
