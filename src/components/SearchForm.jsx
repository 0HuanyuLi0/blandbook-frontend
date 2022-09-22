
import React from "react";
import axios from "axios";


class SearchForm extends React.Component {

    state = {
        query:null
    }


    handleSubmit = async (e) =>{
        // this.props.results(this.state.results) 
        // this.props.results(this.state.query) // test only
        e.preventDefault()
        const res = await axios.get(`http://localhost:3000/search/${this.state.query}`)


   
        this.props.results(res.data,this.state.query)
    


        e.target[0].value = ''

    }

    handleInput = (e) => {
        this.setState({
            query: e.target.value
        })
    }

    render() {
        return (
            <form className={this.props.classNames} onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Search for Posts or Users" onChange={this.handleInput}/>
                <input type='submit' className="material-symbols-outlined" value='search' />
            </form>
        )
    }

}

export default SearchForm

