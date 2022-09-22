import React from "react";
import axios from "axios";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import '../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';


class CreatePost extends React.Component {

    state = {
        post: null,
        show: false,
        editorState: EditorState.createEmpty(),
      
    }


    handleChange = (editorState) => {
        this.setState({
            editorState:editorState,
            post:draftToHtml( this.state.editorState)
        })
        console.log(draftToHtml( this.state.editorState))
        // this.setState({ post: e.target.value })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        if (this.state.post) {
            const res = await axios.post(`http://localhost:3000/posts`, {
                post: {
                    user_id: this.props.currentUser.id,
                    title: this.state.post,
                    like: 0,
                    dislike: 0
                }
            })
            this.props.updateData()
            e.target[0].value = ''
            this.setState({
                post: null
            })
            this.handleClose()
        }

    }

    handleShow = () => {
        this.setState({ show: true })
    }
    handleClose = () => {
        this.setState({ show: false })
    }

  
    render() {
        return (
            <div>
          
                <div className="center_btn">
                <Button size="sm" variant="primary" onClick={this.handleShow}>
                    Create New Post
                </Button>
                </div>
                
                <Modal show={this.state.show} onHide={this.handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Create New Post</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    
                    
                        <form onSubmit={this.handleSubmit}>

                            <Editor onChange={this.handleChange}
                                    autoFocus
                                    editorClassName="editor"
                                    />

                            <br />
                            <Button variant="primary" type="submit" size="sm">Submit</Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>


        )
    }


}


export default CreatePost