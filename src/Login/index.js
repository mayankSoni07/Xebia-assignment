import React from 'react';

import apiCall from '../Utilities/api';
import { isEmptyField, setLocalValue, getLocalValue, checkUser } from '../Utilities/commonMethods';
import { 
    URL_BASE, URL_PEOPLE_SEARCH, MSG_EMPTY_FIELD, MSG_UNAUTHENTICATED_USER, ERROR_TIME, TIMEOUT_TIME,
    MSG_WRONG_PASSWORD
} from '../Utilities/commonConstants';

import './index.css';

class Login extends React.Component {
    constructor(props){
        super(props);

        setLocalValue("timeout", undefined)
        if(getLocalValue("token")+"" === true+"")
            this.props.history.push('/search');

        this.state = {
            username: "",
            password: "",
            isError: false,
            errMsg: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.setError = this.setError.bind(this);
    }

    handleChange(e, type){
        let obj = {};
        obj[type] = e.target.value;
        this.setState({ ...obj });
    }

    setError(errMsg){
        this.setState({ isError: true, errMsg: errMsg }, ()=>{
            setTimeout(()=>{
                this.setState({ isError: false });
            }, ERROR_TIME);
        });
    }

    handleClick(){
        const { username, password } = this.state;
        if(isEmptyField(username) || isEmptyField(password)){
            this.setError(MSG_EMPTY_FIELD);
        } else {
            let reqObj = {};
            reqObj["reqUrl"] = URL_BASE + URL_PEOPLE_SEARCH + username;
            reqObj["method"] = "GET";

            this.setState({ isLoading: true });

            apiCall(reqObj)
            .then((res)=>{
                let foundUser;
                this.setState({ isLoading: false });
                if(res.data.count){
                    let results = res.data.results;
                    /** Found user by username */
                    foundUser = results && results.find((item)=>{
                        if(item.name.toLowerCase() === username.toLowerCase())
                            return item;
                    });

                    if(foundUser){
                        if(
                            foundUser.birth_year.toLowerCase() === password.toLowerCase()
                        ){
                            if(!checkUser(foundUser.name)){
                                setTimeout(()=>{ setLocalValue("timeout", true) }, TIMEOUT_TIME)
                                setLocalValue("searchCount", 0);
                            }
                            setLocalValue("username", foundUser.name);
                            setLocalValue("token", true);
                            this.props.history.push("/search");
                        } else 
                            this.setError(MSG_WRONG_PASSWORD);
                    } else
                        this.setError(MSG_UNAUTHENTICATED_USER);

                } else {
                    this.setError(MSG_UNAUTHENTICATED_USER);
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({ isLoading: false });
            })
        }
    }

    render(){
        const { username, password, errMsg, isError, isLoading } = this.state;
        return (
            <React.Fragment>
                <h1>STAR WARS LOGIN</h1>

                <div>
                    <label className="label">Username<span className="red">*</span></label>
                    <input
                        placeholder="Luke Skywalker" value={username} 
                        onChange={(e) => this.handleChange(e, "username")}
                    />
                </div>

                <div>
                    <label className="label">Password<span className="red">*</span></label>
                    <input
                        placeholder="19BBY" value={password} 
                        onChange={(e) => this.handleChange(e, "password")}
                    />
                </div>

                {isError && <div className="red">{errMsg}</div>}

                <button className="submit" onClick={this.handleClick}>SUBMIT</button>

                {isLoading && <img className="loading" src={require("../Utilities/loading.gif")}></img>}

            </React.Fragment>
        );
    }
}

export default Login;
