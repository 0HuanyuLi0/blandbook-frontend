import axios from "axios";
import React from "react";
import Friend from "./Friend";
import '../css/friends.css'
import Button from 'react-bootstrap/Button';
class FriendsList extends React.Component {

    state = {
        loading: true,
        friendsList: {}
    }

    componentDidMount() {
        console.log('Friends list has mounted');
        // this.getFollowerList(this.props.userId)
        if (this.state.loading === true) {
            this.getFriendsList()
        }

        // setInterval(this.getFriendsList,2000)
       
    }

 


    getFriendsList = async () => {

        const res = await axios.get(`http://localhost:3000/friends/${this.props.currentUser.id}.json`)


        this.setState({
            loading: false,
            friendsList: res.data
        })



    }


    unfollow = async (userId, followerId) => {
        console.log('Unfollow clicked', userId, followerId);


        await axios.delete(`http://localhost:3000//followers/${userId}/${followerId}`).then(response => {
            //delete then do another axios reques
            this.getFriendsList()
        }).then(response => {
            this.showFollowers();
            this.showFollowing();
        })
    }

    follow = async (userId, followId) => {
        console.log('Unfollow clicked', userId, followId);


        await axios.post(`http://localhost:3000//followers/${userId}/${followId}`).then(response => {
            //add then do another axios reques
            this.getFriendsList()
        }).then(response => {
            this.showFollowers();
            this.showFollowing();
        })
    }

    showFollowers = () => {
        if (this.state.friendsList.followers) {
            return this.state.friendsList.followers.map(follower => {
                return (
                    
                    <li key={follower.id} className="friendList">
                        <img src={follower.avatar} className="friendAvatar" />
                        <p>{follower.screen_name}</p>
                        <Button size="sm" variant="danger" onClick={() => { this.unfollow(this.props.currentUser.id, follower.id) }} className='unfollowButton'>unfollow</Button>
                    </li>

                )
            })





        } else {
            return
        }


    }

    showFollowing = () => {
        if (this.state.friendsList.following) {
            return this.state.friendsList.following.map(follow => {
                return (
                    <li key={follow.id} className="friendList">
                        <img src={follow.avatar} className="friendAvatar" />
                        <p>{follow.screen_name}</p>

                        <Button size="sm" variant="success" onClick={() => { this.follow(this.props.currentUser.id, follow.id) }} className='unfollowButton'>Follow Back </Button>


                    </li>

                )
            })
        } else {
            return
        }
    }



    render() {
        return (
            <div className="allFollow_container">
                {/* Possibly add components */}
                    <h6>Following:</h6>
                <div className="followList">

                    {
                        this.showFollowers()
                    }
                </div>

                    <h6>Followers:</h6>
                <div className="followingList">


                    {
                        this.showFollowing()
                    }

                </div>
            </div>


        )


    }


}

export default FriendsList;