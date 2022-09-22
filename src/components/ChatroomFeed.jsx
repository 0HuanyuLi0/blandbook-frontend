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

        if(this.props.messages){
            // this.showMessages(this.props.messages)
            this.setState({
                totalMessages: this.props.allMessages, ...this.props.messages
            })
        }


    }

    componentDidUpdate(prevProps){
        
       if(this.props.chatroom.allMessages !== prevProps.chatroom.allMessages){
           
            this.showMessages(this.props.allMessages)
            this.updateMessages()
                // const newMessages = this.props.messages.map(message=> console.log('Message', message))
                
                // this.setState({
                //     totalMessages: newMessages
                // })
            
        }else{
            console.log('Loading');
        }

        if(this.props.chatroom !== prevProps.chatroom){
            this.setState({
                totalMessages: []
            })

            this.showMessages(this.updateMessages())
        
        }

        
    }

       
    showMessages( allMessages ){

        this.updateMessages()
        //sortmessages firs 
        const sortedMessages = allMessages.sort((a, b)=> {
            return a.created_at - b.created_at
        })
        return sortedMessages.reverse().map( message =>{
            
        

            return <ChatroomMessage key={message.id} message={message.content} senderId={message.user_id} userId={this.props.user} />
        })
        
    }

    updateMessages = () => {
        //updatemessages should eb called below
        let newMessages = this.props.messages.map(message=> message)
        console.log("This is new message", newMessages);
        // this.showMessages() //arg should be new props
        this.props.allMessages.forEach(message=> newMessages.push(message))
        console.log("This is the updated message", newMessages);
        return newMessages //I need to make this the object we iterate over
        
    }

    
    
    render(){

        return(

            <div className="chatroomFeed_container">
                <h3 className="chatroom_title">Chatroom feed:</h3>

                <div className="messages">
                { 
                    this.props.chatroom.messages
                    ? 
                    (this.showMessages(this.updateMessages()))
                    :
                    (<h3>Be the first to post!</h3>) 

                    
                }

                </div>
                    
                
                
                

               

            </div>
        )

    }


}


export default ChatroomFeed;