import React from "react";
import ActionCable from 'action-cable-react-jwt';


let RAILS_BASE_WS;
if( process.env.NODE_ENV === 'development'){

  RAILS_BASE_WS = 'ws://localhost:3000';
} else {
  RAILS_BASE_WS = 'ws://blandbook-server.herokuapp.com';
}

class ChatroomWebSocket extends React.Component {


    componentDidMount(){
        let token =  localStorage.getItem("jwt")

        const CableApp = {}



        CableApp.cable = ActionCable.createConsumer(`${RAILS_BASE_WS}/cable`, token)

        //This is needed to render data on the ChatroomShow component. It grabs the room id_#, 
        this.props.getRoomData(this.props.currentRoom.id)
        // console.log('The ChatroomWebSocket has recieved room', this.props.currentRoom.id);
        //the subscriptions.create() here is sending params to the subscribed action in the ChatroomsChannel
        const room =
        CableApp.cable.subscriptions.create({
            channel: 'ChatroomChannel',
            room: this.props.currentRoom.id,
            token: token
        },

        {
            connected:  () => {},
            disconnected: ()=> {}, 
            received: (updatedRoom) => {
                // console.log('The updatedroom we received is', updatedRoom)
                this.props.updateApp(updatedRoom)
                //This contains chatroom_id: , content: , user_id:
            }
        
        })
        
                       
        //Room here is just the room number
        this.props.onSubscriptionCreate(room)




 
    } //end componentDidMount

    render(){
        return (
            <div></div>
        )
    }

}

export default ChatroomWebSocket