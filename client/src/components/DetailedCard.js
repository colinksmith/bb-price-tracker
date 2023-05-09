import React from 'react'

export default function() {
    return (
        <div className="grid grid-cols-3">
            <img src="https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6501/6501491_sd.jpg;maxHeight=2000;maxWidth=2000"></img>
            <div>
            <h6>lg 65" oled tv</h6>
                <p>TV & Home Theater -{'>'} TVs -{'>'} All Flat-Screen TVs</p>
                <p>Model: OLED65C2PUA</p>
                <p>sku: 6501491</p>
            </div>
            <div>
                <span>Current price:</span>
                <p>$1,599.99 -- Was $1,699.99</p>
                <span>Historic Low:</span>
                <p>$1,599.99</p>
                <span>Historic High:</span>
                <p>$2699.99</p>
            </div>
            <div className="col-start-2">
                <a>View on Bestbuy</a>
                <button>Track this price</button>
            </div>
        </div>
    )
}