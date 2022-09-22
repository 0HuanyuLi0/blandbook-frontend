
import React from "react";
import { Route, HashRouter as Router, Link, Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Modal from 'react-bootstrap/Modal';
import axios from "axios";
import '../css/search.css'

const ResultsModal = (props) => {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Searching for "{props.query}"
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ListGroup>
                    {props.data.map(rlt => {
                        if (rlt.email) {
                            return (
                                <ListGroup.Item variant="success" className="center">
                                    <img className="avatar" src={rlt.avatar} alt={rlt.screen_name} />
                                    {' | '}
                                    {rlt.screen_name}
                                    {' | '}
                                    {rlt.email}
                                    {' | '}
                                    {<Button variant="success" size="sm" onClick={() => followAction(rlt.id, props)}>Follow</Button>}
                                    {' | '}
                                    {<Button variant="danger" size="sm" onClick={() => unfollowAction(rlt.id, props)}>unFollow</Button>}
                                </ListGroup.Item>
                            )
                        }
                        if (rlt.title) {
                            return (
                                <ListGroup.Item key={rlt.id} action variant="warning" className="center rlts-font" dangerouslySetInnerHTML={{__html: rlt.title.substring(0,50) + " ..."}} 
                                href={`http://localhost:3001/#/comments/${rlt.id}`}
                                onClick={props.onHide}
                                >
                                </ListGroup.Item>
                            )
                        }

                    })
                    }
                </ListGroup>



            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}



const followAction = async (followId, props) => {
    await axios.post(`http://localhost:3000//followers/${props.currentUser.id}/${followId}`).then(props.onHide).then(window.location.reload())
}

const unfollowAction = async (followId, props) => {
    await axios.delete(`http://localhost:3000//followers/${props.currentUser.id}/${followId}`).then(props.onHide).then(window.location.reload())
}


class SearchResults extends React.Component {

    state = {
        results: null,
        query: null
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
                < ResultsModal show={this.props.show} onHide={this.handleClick} query={this.state.query} data={this.state.results} currentUser={this.props.currentUser} />
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