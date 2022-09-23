
import React from "react";
import { Route, HashRouter as Router, Link, Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import '../css/search.css'
import { RAILS_BASE_URL, REACT_BASE_URL } from './baseurl'





class SearchResults extends React.Component {



    followAction = async (followId, currentUserId) => {
        await axios.post(`${RAILS_BASE_URL}/followers/${currentUserId}/${followId}`).then(this.onHide).then(this.phoneUpdate)
    }

    unfollowAction = async (followId, currentUserId) => {
        await axios.delete(`${RAILS_BASE_URL}/followers/${currentUserId}/${followId}`).then(this.onHide).then(this.phoneUpdate)
    }

    phoneUpdate = () => {
        this.props.phoneUpdate()
    }

    state = {
        results: null,
        query: null,
        refreshList: false
    }

    componentDidUpdate() {
        console.log('search results', this.props.results);
        if (this.props.results !== this.state.results) {
            this.setState({
                results: this.props.results,
                query: this.props.query
            })
        }
    }

    handleClick = () => {
        this.props.close()
        this.setState({
            results: null,
            query: null
        })
    }




    render() {
        return (
            this.state.results &&
            <div className={this.props.classNames}>
                <Modal
                    show={this.props.show}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Searching for "{this.state.query}"
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ListGroup>
                            {this.state.results.map(rlt => {
                                if (rlt.email) {
                                    return (
                                        <ListGroup.Item variant="success" className="center">
                                            <img className="avatar" src={rlt.avatar} alt={rlt.screen_name} />
                                            {' | '}
                                            {rlt.screen_name}
                                            {' | '}
                                            {rlt.email}
                                            {' | '}
                                            {<Button variant="success" size="sm" onClick={() => this.followAction(rlt.id, this.props.currentUser.id)}>Follow</Button>}
                                            {' | '}
                                            {<Button variant="danger" size="sm" onClick={() => this.unfollowAction(rlt.id, this.props.currentUser.id)}>unFollow</Button>}
                                        </ListGroup.Item>
                                    )
                                }
                                if (rlt.title) {
                                    return (
                                        <ListGroup.Item key={rlt.id} action variant="warning" className="center rlts-font" dangerouslySetInnerHTML={{ __html: rlt.title.substring(0, 50) + " ..." }}
                                            href={`${REACT_BASE_URL}/comments/${rlt.id}`}
                                            onClick={this.handleClick}
                                        >
                                        </ListGroup.Item>
                                    )
                                }

                            })
                            }
                        </ListGroup>



                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.handleClick}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            // <ListGroup className={this.props.classNames}>

            //     {this.state.results.length > 1 ? this.state.results.map(ele =>
            //         <li key={ele.id}>
            //             <ListGroup.Item action href={`/comments/${ele.id}`} onClick={this.handleClick}>
            //                 {ele.title && ele.title}
            //             </ListGroup.Item>

            //             {ele.email &&

            //                      <ListGroup.Item>
            //                      {ele.avatar && <img src={ele.avatar} className="avatar" />}
            //                     {ele.screen_name}

            //                      </ListGroup.Item>

            //             }


            //             <hr />
            //         </li>

            //     )
            //         :
            //         <p style={{ color: 'red', fontSize: '20px' }}>Can't find anything, please try again</p>
            //     }

            //     <button onClick={this.handleClick}>Close</button>
            // </ListGroup>
        )
    }


}

export default SearchResults