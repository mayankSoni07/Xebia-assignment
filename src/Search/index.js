import React from 'react';

class Search extends React.Component {
    constructor(props){
        super(props);
        if(localStorage.getItem("token")+"" !== true+"")
            this.props.history.push('/login');
        this.onLogout = this.onLogout.bind(this);
    }

    onLogout(){
        localStorage.setItem("token", undefined);
        this.props.history.push("/login")
    }

    render(){
        return (
        <div className="App">
            <h1>Search screen</h1>
            <button onClick={this.onLogout}>Logout</button>
        </div>
        );
    }
}

export default Search;
