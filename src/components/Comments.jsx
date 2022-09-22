
// some issues:
// TODO: thumbup and thumbdown one time one user
// without using websocket and setInterval, could we see the update 
// forgot how to set the button direct press enter to submit, need to check, not hurry

import React from "react";
import axios from "axios";
import { Route, HashRouter as Router, Link, Redirect } from 'react-router-dom';

import NewComment from "./NewComment";

const BASE_URL_SINGLE_POST = 'http://localhost:3000/posts/'


class Comments extends React.Component {



    state = {
        postId: this.props.match.params.postId,
        commentDetails: null,
        postDetails: {
            title: null,
            postUser: null
        },
    }

    componentDidMount() {
        // const newLocal = this;
        // console.log('componentDidMount', this.props.match.params.postId) // for test

        // this.setState({
        //     postId: this.props.match.params.postId,
        // })
        // console.log(this.props.match.params.postId);
        // this.state.postId &&
        // console.log('componentDidMount state', this.state.postId) //null

        // setInterval(this.getCommentDetails, 2000);
        this.getCommentDetails()
        // console.log(this.props.history.location.pathname.split('/').slice(-1)[0]);
    }

    componentDidUpdate(){
       if (this.props.history.location.pathname.split('/').slice(-1)[0] !== this.state.postId) {
        this.getCommentDetails()
       }
    }

    getCommentDetails = async() => {
        try{
            // const res = await axios.get(BASE_URL_SINGLE_POST + this.props.match.params.postId + '.json')
            const res = await axios.get(BASE_URL_SINGLE_POST + this.state.postId + '.json')
            // console.log('getCommentDetails', res.data); // for test
            this.setState({
                postId:this.props.match.params.postId,
                commentDetails: res.data.comments.reverse(),
                postDetails: {
                    title: res.data.title,
                    postUser: res.data.user.screen_name
                }
            })

        }catch(err){
            console.log('There was an error', err)
        }
    }

    // fetchCommentAgain = async() => {
    //     const res = await axios.get(BASE_URL_SINGLE_POST + this.state.postId + '.json')

    //     this.setState({
    //         commentDetails: res.data.comments.reverse()
    //     })
    // }

    handleDelete = async(id) => {
        try{
            const res = await axios.delete(`http://localhost:3000/comments/${id}`)
            // console.log('handleDelete', res.data); // for test
            this.getCommentDetails()

        }catch(err){
            console.log('There was an error of delete', err)
        }
    }





    render() {
        return (
            <div>
                <p><strong>Post: </strong></p>
                <p>{this.state.postDetails.title}</p>
                <p>by {this.state.postDetails.postUser}</p>
                <Link to="/" >Go Back to Post</Link>
                <br />

                <NewComment currentUser = {this.props.currentUser} currentPostId = {this.props.match.params.postId} createNewComment = {this.getCommentDetails} />
                <br />

                <p><strong>Comments History</strong></p>
                <ul>
                {this.state.commentDetails
                &&
                this.state.commentDetails.map((comment, index) => 
                <li key={comment.id}>
                    <p>
                        {comment.user.screen_name} says: 
                        <em>{comment.content}</em> 
                    </p>

                    <p>
                        like:{comment.like}
                        |
                        dislike:{comment.dislike}
                    </p>

                    <p>create time:{comment.created_at}</p>

                    {comment.user.id === this.props.currentUser.id
                    &&
                    <button onClick={() => this.handleDelete(comment.id)}>Delete</button>
                    }

                    <br />
                    <hr />
                </li>)}
                </ul>
            </div>
        );
    }
}

export default Comments


