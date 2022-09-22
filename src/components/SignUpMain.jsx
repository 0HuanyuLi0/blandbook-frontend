
// need to refresh to get the data????

import React from 'react'
import axios from 'axios'
// import {Route, Link, HashRouter as Router} from 'react-router-dom';

import SignUp from './SignUp';

const BASE_URL_USERS = 'http://localhost:3000/users'

class SignUpMain extends React.Component{

    state = {
        newUser: {},
        // loading: true,
        error: null
    }

    componentDidMount(){
        // this.setNewUser(); // if setNewUser directly, errors are undefined
        this.fetchNewUser();
    }


    setNewUser = async(object) => {
        try {
            const res = await axios.post(BASE_URL_USERS, {
                email: object.email, 
                screen_name: object.screen_name, 
                password: object.password, 
                password_confirmation: object.password_confirmation,
                avatar: object.avatar, 
                location: object.location, 
                is_admin: object.is_admin 
            });

            console.log('setNewUser Response', res.data); // for test

            localStorage.setItem("jwt", res.data.auth_token.token)
            this.props.setCurrentUserSignup();

            this.setState({
                newUser: res.data.user,
                // loading: false
            });

            // if (res.data.auth_token.token){
            //     window.location.reload(false);
            // }

        } catch(err){
            this.setState({
                // loading: false,
                error: err.response.data.error
            });
            // console.log(err.response.data.error);  // for test
        }
    } // setNewUser


    fetchNewUser = () => {
        this.setState({
            newUser: this.state.newUser,
            error: this.state.error
        })
    }


    render(){
        return (
                <div className="signup_form">

                   <SignUp notifySignUp={this.setNewUser} />

                    {this.state.error
                    &&
                    this.state.error.map((er,index) =>
                    <li key={index}>
                        <p>{er}</p>
                    </li>
                    )}
                </div>
        );
    } // render



} // class SignUpMain

export default SignUpMain

