import React from "react";
import axios from "axios";



class CurrentUserInfo extends React.Component {

    state = {
        // all data
        currentUser: null,
        error: null
    }

    getCurrentUser = (user) => {
        this.setState({
            currentUser: user

        })
    }

    

    handleLogout = () => {
        this.setState({ currentUser: null })
        localStorage.removeItem("jwt");
        axios.defaults.headers.common['Authorization'] = undefined;
        window.location.reload(false);
    }


    componentDidMount() {
        this.getCurrentUser(this.props.user)
    }

    render() {
        return (
            this.state.currentUser
            &&
            <div className={this.props.classNames}>
                <img src={this.state.currentUser.avatar} alt={this.state.currentUser.screen_name} className='avatar' />
                {' '}
                Hi {this.state.currentUser.screen_name}
                {' '}
                <div className="material-symbols-outlined" onClick={this.handleLogout} style={{cursor:"pointer"}}>logout</div>
            </div>
        )
    }

}

export default CurrentUserInfo