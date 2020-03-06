import React from 'react';

import './index.css';

function ItemInformation(props) {
        const { itemDetail } = props;
        return (
            <div className="item-information-container">
                <h1 className="header">Item information screen</h1>
                {itemDetail && Object.keys(itemDetail).map((info)=>{
                    if(typeof itemDetail[info] === "string")
                        return <div key={info}>
                            <span className="key">{info}</span>
                            <span className="value">:</span>
                            <span className="value">{itemDetail[info]}</span>
                        </div>
                })}
            </div>
        );
}

export default ItemInformation;
