
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

const BASE_URL = 'http://localhost:3000'

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
    this.getRoomData(room.id)  //I'm not sure if this is needed
    this.setState({
      room: room

    })

    console.log('clicked room:', room);


  }

  componentDidMount() {

    console.log(this.state.currentUser);

    // want to check if the user is logged in when we visit
    this.setCurrentUser();
  }


  getRoomData = (id) => {


    fetch(`http://localhost:3000/chatrooms/${id}.json`)
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

    // const res = await axios.get(`http://localhost:3000/chatrooms/${id}.json}`)
    // console.log(res);
    // this.setState({
    //   currentRoom: {
    //     chatroom: res.data,
    //     users: res.data.users,
    //     messages: res.data.messages
    //   } //end currentRoom
    // })



  } //end getRoomData

  

  updateAppStateRoom = (newroom) => { //newroom is an object we get back from the ChatroomWebSocket after a message has been posted.
    console.log('The new room recieved by udpateAppStateRoom is', newroom);

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
    axios.get(`${BASE_URL}/users/current`)
      .then(res => {
        this.setState({ currentUser: res.data })
        //   console.log('LoginMain', res.data) // for test
      })
      .catch(err => console.warn(err))
  }



  render() {
    return (


      <div className="App">
        {/* This is the template layout */}

        <Router>
          <div className='container'>
            {/* flex container */}
            <nav>
              {/* all a_tags here */}

              <Link to="#">{Icons.settings}</Link>
              <Link to="/">{Icons.home}</Link>
              <Link to="#">{Icons.account}</Link>
              <Link to="#">{Icons.chat}</Link>
              <Link to="#">{Icons.groupChat}</Link>
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
              }} />

              {/* For search results show */}



              <div className="container">

                {this.state.currentUser === null
                  &&
                  <Login setCurrentUserLogin={this.setCurrentUser} />
                }
                <br />

                {this.state.currentUser === null
                  &&
                  <SignUpMain setCurrentUserSignup={this.setCurrentUser} />
                }

                {this.state.currentUser
                  &&
                  <div className="friendsList">

                  </div>

                }

                {this.state.currentUser //ensure got the user info first
                  &&
                  <div className="chat_container">
                    <AllChatRooms classNames={'all_chat_rooms'} currentUser_id={this.state.currentUser.id} clickedRoom={this.getChatRoom} />
                    <FriendsList currentUser={this.state.currentUser} update={this.state.friendsUpdate}/>



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

                      //   ) : (
                      //     <Redirect to ='/' />
                      //   )
                      // }} />




                    }

                    {/* TODO need to find another location to put map */}
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
