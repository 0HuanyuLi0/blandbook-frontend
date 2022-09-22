
import React from "react";
import axios from "axios";
import ChatroomWebSocket from "./ChatroomWebSocket";
import ChatroomShow from "./ChatroomShow";

class ChatRoom extends React.Component {
    // for testing only, need to apply websocket

    state = {
        roomId: null,
        messages: null
    }

    getMessages = async (room_id) => {
        const res = await axios.get(`http://localhost:3000/chatrooms/${room_id}`)
        console.log(res.data.messages);

        this.setState({
            messages: res.data.messages,
            roomId: this.props.room.id
        })
    }

    componentDidMount() {
        this.getMessages(this.props.room.id)
        console.log(this.props.room.id);
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

                {/* <ChatroomShow /> */}
                {/* Not sure what props need */}



            </div>
        )

    }



}

export default ChatRoom