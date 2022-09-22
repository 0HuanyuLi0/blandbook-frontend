import React from "react";
import axios from "axios";
import { Route, HashRouter as Router, Link, Redirect } from 'react-router-dom';
import ChatroomCreate from "./ChatroomCreate";
import Button from 'react-bootstrap/Button';
import RAILS_BASE_URL from './baseurl'



class AllChatRooms extends React.Component {

    state = {
        loading:true,
        error:null,
        rooms:null
    }

    
    getAllRooms = async (user_id) => {
        const res = await axios.get(`${ RAILS_BASE_URL}/users/${user_id}/all_chat_rooms`)

        this.setState({
            rooms: res.data,
            loading:false
        })

       
    }

    handleClick = (room) =>{
        this.props.clickedRoom(room)
    }
  
    componentDidMount(){
        this.getAllRooms(this.props.currentUser_id)
    }

    render() {
        return (
            !this.state.loading 
            &&
            <div className={this.props.classNames}>
                <h6>All Chat Rooms:</h6>
                <ul>
                    {this.state.rooms.map(ele=>
                    //    <Link to={`/chatroom/${ele.id}`}> 
                       <li key={ele.id} onClick={()=>this.handleClick(ele)}>
                            <img src={ele.image} alt={ele.title}/>
                            <br />
                            <p>{ele.title}</p>
                        </li>
                        // </Link>
                        )}
                    <li> 
                        {
                            <Button className="newRoom_btn" variant="warning" size="sm" href={`/#/newroom`}>Add New </Button>
                        // <Link to={`/newroom/`}>Add new</Link>
                        }
                        
                    </li>
                </ul>
                
            </div>
        )
    }

}

export default AllChatRooms