import React from 'react';

import './index.css';

class ItemInformation extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            searchInput: "",
            searchResult: []
        };
    }

    render(){
        console.log('state item information', this.props)
        const { itemDetail } = this.props;
        return (
            <div className="App">
                <h1>Item information screen</h1>
                <div>{this.props.itemDetail.name}</div>
                {itemDetail && Object.keys(itemDetail).map((info)=>{
                    console.log(typeof itemDetail[info])
                    if(typeof itemDetail[info] === "string")
                        return <div key={info}>{info} :- {itemDetail[info]}</div>
                })}
            </div>
        );
    }
}

export default ItemInformation;
