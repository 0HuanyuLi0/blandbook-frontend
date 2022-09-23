
// some issues:
// TODO: thumbup and thumbdown one time one user
// without using websocket and setInterval, could we see the update 
// forgot how to set the button direct press enter to submit, need to check, not hurry

import React from "react";
import axios from "axios";
// import { Route, HashRouter as Router, Link, Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import '../css/comments.css'

import NewComment from "./NewComment";

import {RAILS_BASE_URL,REACT_BASE_URL} from './baseurl' 

const options = {year: 'numeric', month: 'long', day: 'numeric'};

class Comments extends React.Component {



    state = {
        postId:this.props.match.params.postId,
        commentDetails: null,
        like: {},
        dislike: {},
        postDetails: {
            title: null,
            postUser: null,
            postDate: null
        },
    }


    componentDidMount() {
       
        this.getCommentDetails()
        console.log('=====:',this.props.history.location.pathname.split('/').slice(-1)[0]);
        
    }

    componentDidUpdate(){
       if (this.props.history.location.pathname.split('/').slice(-1)[0] !== this.state.postId) {
        
        this.getCommentDetails()
       }
    }

    getCommentDetails = async() => {
        try{
            
            const res = await axios.get(`${RAILS_BASE_URL}/posts/${this.props.history.location.pathname.split('/').slice(-1)[0]}.json`)
            
            this.setState({
                
                // sort by created time
                postId:this.props.history.location.pathname.split('/').slice(-1)[0],
                commentDetails: res.data.comments.sort((a,b) => {
                    return new Date(a.created_at).getTime() - 
                        new Date(b.created_at).getTime()
                }).reverse(),
                postDetails: {
                    title: res.data.title,
                    postUser: res.data.user.screen_name,
                    postDate: res.data.user.created_at
                }
            })

        }catch(err){
            console.log('There was an error', err)
        }
    }

    
    handleDelete = async(id) => {
        try{
            const res = await axios.delete(`${RAILS_BASE_URL}/comments/${id}`)
            // console.log('handleDelete', res.data); // for test
            this.getCommentDetails()

        }catch(err){
            console.log('There was an error of delete', err)
        }
    }



    // thumb up and thumb down
    handleClick = async (comment_id, numb, index, fc, e) => {
        let newNumber = numb
        let adjust = null
        let currentState = this.state[fc][comment_id]

        currentState === undefined &&
            this.setState({
                [fc]: {...this.state[fc], [comment_id]:true}
            })

        if (!currentState || currentState === undefined) {
            newNumber += 1
            e.target.className = 'material-symbols-outlined filled'
        } else {
            newNumber -= 1
            e.target.className = 'material-symbols-outlined unfilled'
        }

        adjust = {
            comment: {
                [fc]: newNumber
            }
        }

        const res = await axios.patch(`${RAILS_BASE_URL}/comments/${comment_id}`, adjust)

        this.setState({
            [fc]: { ...this.state[fc], [comment_id]: !currentState }
        })

        this.getCommentDetails()


    }





    render() {
        return (
            <div>
                <p className="fs-5 text-center"><strong>Post</strong></p>
                <p className="fs-6 post_title" dangerouslySetInnerHTML={{__html: this.state.postDetails.title}}></p>
                <figcaption class="blockquote-footer">
                    <em>{this.state.postDetails.postUser} 
                    on:{new Date(this.state.postDetails.postDate).toLocaleDateString("en-AU", options)}</em>
                </figcaption>

                <NewComment currentUser = {this.props.currentUser} currentPostId = {this.props.match.params.postId} createNewComment = {this.getCommentDetails} />

                <hr />

                <p className="fs-5 text-center"><strong>Comments History</strong></p>
                <ul>
                {this.state.commentDetails
                &&
                this.state.commentDetails.map((comment, index) =>
                <ListGroup.Item 
                    as="li"
                    key={comment.id}
                >
                    <div className="fs-6 post_title" dangerouslySetInnerHTML={{__html: comment.content}}></div>

                    <Badge as={'div'} className="badge_like" bg="light" text="dark">
                        {comment.like}
                        <button 
                            className="material-symbols-outlined"
                            onClick={e => this.handleClick(comment.id, comment.like, index, 'like', e)}
                        >
                            thumb_up
                        </button> 
                        {' '}|{' '} 
                        {comment.dislike}
                        <button 
                            className="material-symbols-outlined"
                            onClick={e => this.handleClick(comment.id, comment.dislike, index, 'dislike', e)}
                        >
                            thumb_down
                        </button>
                    </Badge>

                    <br /><br />


                    <figcaption class="blockquote-footer">
                    <em>{comment.user.screen_name} </em>
                    <em>on:{new Date(comment.created_at).toLocaleDateString("en-AU", options)}</em>
                    </figcaption>

                    {comment.user.id === this.props.currentUser.id
                    &&
                    <Button variant="danger" size="sm" onClick={() => this.handleDelete(comment.id)}>Delete</Button>
                    }

                    <hr />
                </ListGroup.Item>
                )}
                </ul>
            </div>
        );
    }
}

export default Comments