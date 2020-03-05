import React from 'react';

class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e, type){
        let obj = {};
        obj[type] = e.target.value;
        this.setState({ ...obj });
    }

    handleClick(){
        console.log('handleClick')
    }

    render(){
        return (
            <React.Fragment>
                <h1>STAR WARS LOGIN</h1>

                <div>
                    <label>Username : </label>
                    <input
                        placeholder="Luke Skywalker" value={this.state.username} 
                        onChange={(e) => this.handleChange(e, "username")}
                    />
                </div>

                <div>
                    <label>Password : </label>
                    <input
                        placeholder="19BBY" value={this.state.password} 
                        onChange={(e) => this.handleChange(e, "password")}
                    />
                </div>

                <button onClick={this.handleClick}>Submit</button>

            </React.Fragment>
        );
    }
}

export default Login;
