//this is a child component for the ChatroomFeed component.
//It displays the essages as either from the user or from another user.

import React from "react";
import ChatAvatar from "./ChatAvatar";


class ChatroomMessage extends React.Component{

    whichUser = (id ) => {
        if (id === this.props.userId.id){
            return "user_message"
                    
        } else {
            return "other_message"
        }
    } //end whichUser

   
       
    
    

    render(){




        return(
            
            <div id="chat_message" className={this.whichUser(this.props.senderId )}>
                    <ChatAvatar sender={this.props.senderId}/>
                   <p>{this.props.message}</p>

            </div>

            


        )

    }


}


export default ChatroomMessage