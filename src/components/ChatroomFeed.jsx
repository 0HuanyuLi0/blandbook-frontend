//This component shows the feed of the chat. It is a child of the 'ChatroomShow' comp.

//TODO: Pass the avatar url to the ChatroomMessage component

import React from "react";
import ChatroomMessage from "./ChatroomMessage";

class ChatroomFeed extends React.Component {

    state={
        loading: null,
        totalMessages: [],
    }
    componentDidMount(){
        
        
        if(this.props.chatroom.allMessages){
            
            this.showMessages(this.props.allMessages)
        }else{
            console.log('Loading');
        }

        
    }

    componentDidUpdate(prevProps){
        
       if(this.props.chatroom.allMessages !== prevProps.chatroom.allMessages){
           
            this.showMessages(this.props.allMessages)
            
              
            
        }else{
            console.log('Loading');
        }

        if(this.props.chatroom !== prevProps.chatroom){
            this.setState({
                totalMessages: [] //for moving from one room to the next
            })

            this.showMessages(this.props.allMessages)
        
        }

        
    }
       
    showMessages( allMessages ){

        //sort messages first, showing newest at the bottom 
        const sortedMessages = allMessages.sort((a, b)=> {
            return a.created_at - b.created_at
        })
        return sortedMessages.map( message =>{
            
           return <ChatroomMessage key={message.id} message={message.content} senderId={message.user_id} userId={this.props.user} />
        })
        
    }

    
    
    render(){

        return(

            <div className="chatroomFeed_container">
                <h3 className="chatroom_title">Chatroom feed:</h3>

                <div className="messages">
                { 
                    this.props.chatroom.messages
                    ? 
                    (this.showMessages(this.props.allMessages))
                    :
                    (<h3>Be the first to post!</h3>) 

                    
                }

                </div>
                    
                
                
                

               

            </div>
        )

    }


}


export default ChatroomFeed;