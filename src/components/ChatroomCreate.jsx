import axios from "axios";
import React from "react";
import Form from 'react-bootstrap/Form'

const BASE_URL = 'http://localhost:3000'

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
            const resp = await axios.post(BASE_URL +`/chatrooms.json`, data)
            
 
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
                <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label for="chatroomTitle">Title</label>
                    <input type="text" class="form-control"  placeholder="What is this chatroom all about?" onChange={this.handleInput}/>
                </div>
                
                <div class="form-group">
                    <label for="exampleInputFile"> Add an image</label>
                    <input type="file" id="exampleInputFile" onChange={this.addFile}/>
                    <p class="help-block">Example block-level help text here.</p>
                </div>
                
                <submit><button type="submit" className="btn btn-default">Create</button></submit>
                </form>
            </div>
        )
    }

}

export default ChatroomCreate


