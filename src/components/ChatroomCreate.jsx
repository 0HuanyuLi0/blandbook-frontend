import axios from "axios";
import React from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import {RAILS_BASE_URL,REACT_BASE_URL} from './baseurl'; 
import { Route, HashRouter as Router, Link, Redirect } from 'react-router-dom';


class ChatroomCreate extends React.Component {

    state = {
        title: "",
        image: ""
    }

    handleInput = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    handleSubmit = async(e) => {
        e.preventDefault()  

        const data = {
            title: this.state.title,
            image: this.state.image,
            owner: this.props.currentUser.id
        }
        try{
            const resp = await axios.post(`${RAILS_BASE_URL}/chatrooms.json`, data)
            
 
        } catch (err){
             console.log('There was an error creating the new room', err)
        }

    }

    addFile = (e) => {
        this.setState({
            image: e.target.value

        })

    }

    render(){

        return(

            <div className="newRoomContainer">
                <div className="topRowChatCreate">
                    <h2>Create a new chatroom</h2>
                    <Router>
                        <Link to="/"> <img src={process.env.PUBLIC_URL+"pictures/x-circle.png"} className="closeButton"/></Link>

                    </Router>

                </div>

                <Form onSubmit={this.handleSubmit} id="newChatForm">
                <div className="form-group">
                    <label for="chatroomTitle">Chatroom Title</label>
                    <input type="text" class="form-control"  placeholder="What is this chatroom all about?" onChange={this.handleInput}/>
                </div>
                
                <div className="form-group">
                    <label for="exampleInputFile"> Add an image</label>
                    <input type="file" id="exampleInputFile" onChange={this.addFile}/>
                    <p class="help-block">Chose a thumbnail image for your chat.</p>
                </div>
                
                <submit><button type="submit" className="btn btn-primary" id="create_chat">Create</button></submit>
                </Form>
            </div>
        )
    }

}

export default ChatroomCreate


