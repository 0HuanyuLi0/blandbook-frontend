import React from "react";
import axios from "axios";

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
    
            const resp = await axios.get(`http://localhost:3000/chatrooms/avatar/${this.props.sender}.json`)
    
            
            avatar =resp.data.avatar;
            console.log(avatar);
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