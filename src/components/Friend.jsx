import axios from "axios";
import React from "react";
import FriendsList from "./FriendsList";
import '../css/friends.css'

class Friend extends React.Component{

    state ={
        loading: true,
        followers: [],
        following: [],
        
    }

    updateFriends = (resp) => {
        console.log('Response is', resp);
    }
    // componentDidMount(){
    //     if(this.props.details.followers){

    //         const newArr = this.props.details.followers.map((follower => {
    //             follower.push(newArr)
    //         }))
    //         this.setState({
    //             followers: newArr
    //         })
            
    //     }
        
           
       
    // }

    // componentDidUpdate(prevProps){
    //     console.log('The prev props are:', prevProps.details.followers);
    //     if(this.props.details.followers && prevProps.details.followers) {

    //         if(this.props.details.followers.length !== prevProps.details.followers.length){
    //             //     this.showMessages(this.props.allMessages)
    //             // }else{
    //                 this.showFollow()
    //                 console.log('Loading');
    //             } else{
    //              console.log('No change');
    //             }
        

    //     }
        
        
    // }


    unfollow = async(userId, followerId) => {
        console.log('Unfollow clicked', userId, followerId);


         await axios.delete(`http://localhost:3000//followers/${userId}/${followerId}`).then(response => {
            //delete then do another axios reques
            this.props.getFriendsList()
         })
         
         
       

        

        
        

    }

    // componentDidUpdate(prevState){
    //     if(this.state && this.state.following !== prevState.state.following){
    //         this.setState({
    //             loading: true
    //         })
    //     }   
        
    // }

    showFollow= () => {
        if(this.props.details.followers && !this.props.following ){
           return  this.props.details.followers.map(follower=> {
                return (
                    <li className="friendList">
                        <img src={follower.avatar} className="friendAvatar" /> 
                        <p>{follower.screen_name}</p>
                        <a onClick={()=> {this.unfollow(this.props.details.id, follower.id)}} className='unfollowButton'>unfollow</a>


                    </li>
                
                )})

        

        } else if(this.props.details.followers && this.props.following){
            return  this.props.details.following.map(follow=> {
                return (
                    <li className="friendList">
                        <img src={follow.avatar} className="friendAvatar"/> 
                        <p>{follow.screen_name}</p>



                    </li>
                
                )})
        

        } else {
            return 
        }

        
    }

    render(){

        return(

            <div className="friend container">
                <ul>

                    {
                        this.showFollow()
                        
                    }
                       
                </ul>
            </div>

        )

    }


}

export default Friend