import React from 'react'
import { Link } from "react-router-dom";


const data = {
    "item": {
        "price": {
            "current": 999.99,
            "noSale": 999.99,
            "historicLow": 999.99,
            "historicHigh": 999.99
        },
        "priceData": [
            {
                "date": "2023-05-30T20:02:55.108Z",
                "price": 999.99
            }
        ],
        "priceWatches": [
            "64765669ec10e17bfc2dd528"
        ],
        "_id": "6476566fec10e17bfc2dd52d",
        "sku": 5721600,
        "model": "MGN63LL/A ",
        "title": "MacBook Air 13.3\" Laptop - Apple M1 chip - 8GB Memory - 256GB SSD (Latest Model) - Space Gray",
        "pictureUrl": "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/5721/5721600_sd.jpg;maxHeight=640;maxWidth=550",
        "url": "https://www.bestbuy.com/site/macbook-air-13-3-laptop-apple-m1-chip-8gb-memory-256gb-ssd-latest-model-space-gray/5721600.p?skuId=5721600",
        "category": "Computers & Tablets",
        "rating": 4.8,
        "ratingCount": 15276,
        "createdAt": "2023-05-30T20:02:55.117Z",
        "updatedAt": "2023-05-30T20:02:55.117Z",
        "__v": 0
    },
    "_id": "64765669ec10e17bfc2dd528",
    "initialUrl": "https://www.bestbuy.com/site/macbook-air-13-3-laptop-apple-m1-chip-8gb-memory-256gb-ssd-latest-model-space-gray/5721600.p?skuId=5721600",
    "email": "bob@bob.com",
    "desiredPrice": 777,
    "sku": 5721600,
    "createdAt": "2023-05-30T20:02:49.474Z",
    "updatedAt": "2023-05-30T20:02:55.203Z",
    "__v": 0
}

export default function(props) {
    console.log(props)
    const {
        _id,
        category,
        model,
        pictureUrl,
        sku,
        title,
        url,
        price,
    } = props.data.item

    return (
        <div>
            <img src={pictureUrl}></img>
            <h6>
                <Link to={'/item/' + _id}>
                    {title}
                </Link>
            </h6>
            <p>${price.current} -- Was ${price.noSale}</p>
            <div>
                <a href={url}>View on Bestbuy</a>
                <button>
                    <Link to={'/item/' + _id}>
                        Track this price
                    </Link>
                </button>
            </div>
        </div>
    )
}