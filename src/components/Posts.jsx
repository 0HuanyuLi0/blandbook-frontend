import React from "react";
import axios from "axios";
import '../css/posts.css';
// import Comments from "./Comments";
import { Route, HashRouter as Router, Link, Redirect } from 'react-router-dom';
import Comments from "./Comments";
import CreatePost from "./CreatePost";
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import '../css/posts.css'
import {RAILS_BASE_URL,REACT_BASE_URL} from './baseurl' 


const options = { year: 'numeric', month: 'long', day: 'numeric' };
// TODO: Posts Sort?
class Posts extends React.Component {

    state = {
        postsArr: null,
        userDetails: null,
        clicked: false,
        loading: true,
        like: {},
        dislike: {},
    }
    

    componentDidMount() {
        this.getPosts()
    }
    

    

    getPosts = async () => {
        const res = await axios.get(`${RAILS_BASE_URL}/posts.json`)
        const response = await axios.get(`${RAILS_BASE_URL}/friends/${this.props.currentUser.id}.json`)

        this.setState({
            postsArr: res.data,
        })
    }


    handleClick = async (post_id, numb, index, fc, e) => {


        let newNumber = numb

        // let clickedTemp = this.state.clicked  
        let adjust = null

        let currentState = this.state[fc][post_id]

        currentState === undefined &&
            this.setState({
                [fc]: { ...this.state[fc], [post_id]: true }
            })


        if (!currentState || currentState === undefined) {
            newNumber += 1
            e.target.className = 'material-symbols-outlined filled'
        } else {
            newNumber -= 1
            e.target.className = 'material-symbols-outlined unfilled'
        }

        adjust = {
            post: {
                [fc]: newNumber
            }
        }
        const res = await axios.patch(`${RAILS_BASE_URL}/posts/${post_id}`, adjust)

        this.setState({
            [fc]: { ...this.state[fc], [post_id]: !currentState }
        })


        this.getPosts()

    }



    handleDelete = async (id) => {
        const res = await axios.delete(`${RAILS_BASE_URL}/posts/${id}`)
        this.getPosts()
    }

    

    render() {
        return (

            this.state.postsArr &&
            <div>

                <CreatePost currentUser={this.props.currentUser} updateData={this.getPosts} />
                <hr />
                <ul className={this.props.classNames}>
                    {this.state.postsArr.map((post, index) =>
                        <ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                            key={post.id}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold"><div className="post_title" dangerouslySetInnerHTML={{__html: post.title}}></div></div>
                                <Badge as={'div'} className="badge_like" bg="light" text="dark">
                                {post.like} <button className="material-symbols-outlined" onClick={(e) => this.handleClick(post.id, post.like, index, 'like', e)}>thumb_up</button> | {post.dislike} <button className="material-symbols-outlined" onClick={(e) => this.handleClick(post.id, post.dislike, index, 'dislike', e)}>thumb_down</button>
                                </Badge>
                                <br />
                                <em>{post.user.screen_name} </em>
                                <em> on:{new Date(post.created_at).toLocaleDateString("en-AU", options)}</em>
                                <br />
                                {this.props.currentUser
                                    &&
                                    <Link to={`/comments/${post.id}`}>Comments</Link>
                                }

                                {' | '}
                                {
                                    this.props.currentUser.id === post.user_id &&
                                    <Button variant="danger" size="sm" onClick={() => this.handleDelete(post.id)}>Delete</Button>
                                }
                                
                                <br />
                                <hr />

                            </div>
                            

                        </ListGroup.Item>
                        
                    )}

                </ul>

            </div>

        )
    }


}

export default Posts

