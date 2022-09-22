
import React from "react";
import axios from "axios";
import ChatroomWebSocket from "./ChatroomWebSocket";
import ChatroomShow from "./ChatroomShow";
import RAILS_BASE_URL from './baseurl' 

class ChatRoom extends React.Component {
    // for testing only, need to apply websocket

    state = {
        roomId: null,
        messages: null
    }

    getMessages = async (room_id) => {
        const res = await axios.get(`${RAILS_BASE_URL}/chatrooms/${room_id}`)
        

        this.setState({
            messages: res.data.messages,
            roomId: this.props.room.id
        })
    }

    componentDidMount() {
        this.getMessages(this.props.room.id)
      
    }

    componentDidUpdate() {
        if (this.props.room.id !== this.state.roomId) {
            this.getMessages(this.props.room.id)
        }
    }

    render() {

        return (
            this.state.messages
            &&
            <div className={this.props.classNames}>
                <h6>You are in Chat room:{this.props.room.title}</h6>
                <ul>
                    {this.state.messages.map(ele =>
                        <li key={ele.id}>
                            {ele.content}
                        </li>
                    )}

                </ul>

               
            </div>
        )

    }



}

export default ChatRoom