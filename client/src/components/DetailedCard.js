import React from 'react'

export default function(props) {
    const {
        category,
        model,
        pictureUrl,
        sku,
        title,
        url,
        price,
    } = props.data
    return (
        <div className="grid grid-cols-3">
            <img src={pictureUrl}></img>
            <div>
            <h6>{title}</h6>
                <p>{category}</p>
                <p>Model: {model}</p>
                <p>sku: {sku}</p>
            </div>
            <div>
                <span>Current price:</span>
                <p>${price?.current} -- Was ${price?.noSale}</p>
                <span>Historic Low:</span>
                <p>${price?.historicLow}</p>
                <span>Historic High:</span>
                <p>${price?.historicHigh}</p>
            </div>
            <div className="col-start-2">
                <a href={url}>View on Bestbuy</a>
            </div>
        </div>
    )
}