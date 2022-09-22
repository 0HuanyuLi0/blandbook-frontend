
import React from "react";
import axios from "axios";

const BASE_URL_CREATE_COMMENT = 'http://localhost:3000/comments'

class NewComment extends React.Component {

    state = {
        newcontent: null,
        like: 0,
        dislike: 0,
        // user_id: this.props.currentUser.id,
        post_id: this.props.currentPostId
    };
    
    handleInput = (ev) => {
        // console.log(ev.target.value);
        this.setState({newcontent: ev.target.value})
    }

    handleSubmit = async (ev) => {
        // console.log('ev', ev); // test
        ev.preventDefault();
        // console.log('NewComment handleSubmit', this.state.newcontent); // for test

        try {
            const res = await axios.post(BASE_URL_CREATE_COMMENT, {
                content: this.state.newcontent,
                like: this.state.like,
                dislike: this.state.dislike,
                // user_id: this.props.currentUser.id,
                post_id: this.props.currentPostId
            });
            // console.log('NewComment handleSubmit', res.data); // for test 

            this.props.createNewComment()
            // console.log('newcomment handlesubmit', ev.target[0].value); //test
            ev.target[0].value = ''

        }catch(err){
            console.error('Error', err);
        }
    }

    render(){
        return (
            <form onSubmit={this.handleSubmit}>
                <textarea cols="40" rows="2" onChange={this.handleInput} placeholder="Leave Your Comment"></textarea>
                <br />
                <button>Submit</button>
            </form>
        );
    } // render()
} // class NewComment

export default NewComment


