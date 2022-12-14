import React from "react";
import axios from "axios";
import {RAILS_BASE_URL,REACT_BASE_URL} from './baseurl' 

class ChatAvatar extends React.Component {

    state =({
        avatar : ""
    })

    componentDidMount(){
        this.getImage()
    }

    getImage = async() =>{
        let avatar;
        try {
    
            const resp = await axios.get(`${RAILS_BASE_URL}/chatrooms/avatar/${this.props.sender}.json`)
    
            
            avatar =resp.data.avatar;
           
            this.setState({
                avatar: avatar
            })
    
        } catch (err){
            console.log('There was an error trying to get the avatar', err);
        }
    }
    


    render(){

        return (
           <img src={this.state.avatar}id="chat_avatar"></img>
        )
    }
}

export default ChatAvatar