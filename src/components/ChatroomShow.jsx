import axios from "axios";
import React from "react";
import '../css/chat.css';
import ChatroomWebSocket from "./ChatroomWebSocket";
import ChatroomFeed from "./ChatroomFeed";
import { Button } from "react-bootstrap";
import {RAILS_BASE_URL,REACT_BASE_URL} from './baseurl' 
class ChatroomShow extends React.Component {

    state = {
        allMessages: [],
        newMessage: '',
        roomSubscription: null,
        visible: 'visible',
        chatroom_id: null,
    }

    

    componentDidMount() {
        if (this.props.roomData.messages) {
            this.fetchMessages()
            this.setState({
                
                visible: 'visible',
                chatroom_id: this.props.currentRoom.id
            })


        } else {
            this.setState({
                visible: 'visible'
            })
            return
        }

        this.setState({
            visible: 'visible'
        })

        //Polling version to overcome Redis depricatiton
        setInterval(this.fetchMessages, 2000);

    }

    componentDidUpdate(prevProps){
       
        if (prevProps !== this.props){
                this.fetchMessages()
                this.setState({
                    visible: 'visible',
                    
                })
    
            }
        }
        
        
  

    
    onSubscriptionCreate = (sub) => {

        this.setState({
            roomSubscription: sub
        })
    }

    //This takes the content of the input field and adds it to the state as a new message
    handleMessageInput = (e) => {
        this.setState({
            newMessage: e.target.value
        })
    }

    postMessage(message) {
        try{
            const res = axios.post(`${RAILS_BASE_URL}/messages/`,{
                content:message,
                user_id: this.props.currentUser.id, 
                chatroom_id: this.state.chatroom_id
            } )
        }catch (err){
            console.log('There was an error posting the messgae');
        }

        this.fetchMessages()
        
    }

    //After submission, clear the state so a new message can be added. Also prevent the submit button from refreshing the page
    submitMessage = async (e) => {
        e.preventDefault() //prevents page from reloading on submit

        this.setState({
            newMessage: '' //clear the message, ready for a new one.
        })

        //Define the message to match the model created in Rails. Might need to add some more details here to enable the other features in message (such as likes or dislikes).
        //The token is used to securely identify the user on the backend. 

        const message = {

            content: this.state.newMessage,
            chatroom_id: this.props.roomData.chatroom.id,
            token:  localStorage.getItem("jwt")

        }


        //This actually sends the message to the backend via websocket
        // if (this.state.roomSubscription !== null) {

        //     this.state.roomSubscription.send(message)

        // }
        this.postMessage(this.state.newMessage);
        this.fetchMessages()

        
    } //post messgage

    fetchMessages = async() => {
        try{
            console.log('Fetching');
            const res = await axios.get(`${RAILS_BASE_URL}/chatrooms/${this.props.currentRoom.id}`)
            this.setState({
                allMessages: res.data.messages
            })
             
        }catch (err){
            console.log('There was an error posting the messgae');
        }
        
    }

    


    // updateAppStateRoom = (message) => { //message is an object we get back from the ChatroomWebSocket after a message has been posted.

    //     //here we add the previous state 
    //     // this.setState(prevState => ({
    //     //     allMessages: [...prevState.allMessages, message]
    //     //   }))

    //       //For heroku deployment
    //       const allMessages = this.fetchMessages()
    //       this.setState({
    //         allMessages: allMessages
    //       })
               
       

    // } //end uAS



    //Map over the members of the chat to show them in the sidebar
    showMembers = (membersList) => {
        if (membersList.length > 0) { //this was to avoid an error

            return membersList.map(member => {
                return <li className="chatMembers"><img src={member.avatar} id="chat_avatar" />{member.screen_name} </li>
            })


        }
    }

    hideChat = () => {
        this.setState({
            visible: 'hidden'
        })
    }

    render() {

        return (

            <div className="chatroom" id={this.state.visible}>
                <div className="chatroomTopRow">
                    <h2 className="chatroom_title">Welcome to {this.props.roomData.chatroom.title}</h2>

                   
                    
                </div>

                <img src={process.env.PUBLIC_URL+"/pictures/x-circle.png"} className="closeButton" onClick={ () => this.hideChat()}/>    
               
                <div className="chatroomMain">
                    <div className="chatroom_sidebar">

                        <h4>Others in {this.props.roomData.chatroom.title} </h4>
                        <ul id='chatroom_members'>
                            {this.showMembers(this.props.roomData.users)}


                        </ul>


                    </div>
                    <ChatroomFeed chatroom={this.props.roomData.chatroom} messages={this.props.roomData.messages} allMessages={this.state.allMessages}  user={this.props.currentUser} />

                    <div className="chatroomForm">
                        <form id='chat-form' onSubmit={this.submitMessage}>
                            <h3 className="chatroom_title">Post a new message:</h3>

                            <input type='text' value={this.state.newMessage} onChange={this.handleMessageInput} id="chat_input" placeholder="Type your message here..."></input>
                            <submit><input type='submit' id="chat_button" value="" ></input></submit>

                        </form>



                    </div>


                    


                </div>





                {/* This invisible component is the core of the chat app. It contains the details of the cable through the WS */}
                {/* <ChatroomWebSocket
                    cableApp={this.props.cableApp}
                    updateApp={this.updateAppStateRoom}
                    getRoomData={this.props.getRoomData}
                    roomData={this.props.roomData}
                    currentRoom={this.props.currentRoom}
                    onSubscriptionCreate={this.onSubscriptionCreate}
                /> */}



            </div>


        )

    }




}

export default ChatroomShow