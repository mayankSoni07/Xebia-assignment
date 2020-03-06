import React from 'react';

import apiCall from '../Utilities/api';
import { setTokenValue, getTokenValue } from '../Utilities/commonMethods';
import { URL_BASE, URL_PLANET_SEARCH } from '../Utilities/commonConstants';

import ItemInformation from '../ItemInformation';
import './index.css';

class Search extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchInput: "",
            searchResult: [],
            isItemRender: null
        };

        if(getTokenValue()+"" !== true+"")
            this.props.history.push('/login');
        
        this.onLogout = this.onLogout.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.removeInputFocus = this.removeInputFocus.bind(this);
        this.inputFocus = this.inputFocus.bind(this);
    }

    onLogout(){
        setTokenValue(undefined);
        this.props.history.push("/login")
    }

    removeInputFocus(){
        this.refs.searchInputRef.disabled = true;
    }

    inputFocus(){
        this.refs.searchInputRef.disabled = false;
        this.refs.searchInputRef.focus();
    }

    handleClick(e){
        const input = e.target.value;
        this.setState({ searchInput: input });
        this.removeInputFocus();

        if(input.length === 0){
            this.setState({ searchResult: [] });
            this.inputFocus();
        } else {
            let reqObj = {};
            reqObj["reqUrl"] = URL_BASE + URL_PLANET_SEARCH + input;
            reqObj["method"] = "GET";

            apiCall(reqObj)
            .then((res)=>{
                this.inputFocus();

                let results = res.data.results;
                /** Sort : Desecending order */
                results && results.sort((a,b)=>{
                    if(parseInt(a.population) > parseInt(b.population)) return -1;
                    else return 1;
                });

                this.setState({ searchResult : results });
            })
            .catch(err => console.log(err))
        }
    }

    renderItem(item, index){
        let className = "item-container ";
        if(index < 4)
            className = className + "large-item";
        else if (index>3 && index<7)
            className = className + "medium-item";
        else if (index>6 && index<10)
            className = className + "small-item";

        return <div 
                    key={item.name} className={className} 
                    onClick={()=>this.setState({ isItemRender: item.name, itemDetail: item })}
                >{item.name} - {item.population}</div>
    }

    render(){
        const { searchInput, searchResult, isItemRender, itemDetail } = this.state;
        console.log('state search', this.state)
        return (
            <div className="App">
                <h1>Search screen</h1>
                
                <button className="logoutButton" onClick={this.onLogout} >Logout</button>

                <label>Search : </label>
                <input ref="searchInputRef" value={searchInput} onChange={this.handleClick}/>

                {searchResult && searchResult.map((item, index)=>{
                    return this.renderItem(item, index)
                })}

                {isItemRender && <ItemInformation itemDetail={itemDetail} />}
            </div>
        );
    }
}

export default Search;
