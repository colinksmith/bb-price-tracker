import React from 'react'
import { Link } from "react-router-dom";


export default function(props) {
    const {
        _id,
        category,
        model,
        pictureUrl,
        sku,
        title,
        url,
        price,
    } = props.data
    console.log(props)
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 my-2 border p-5 shadow-md bg-white rounded">
            <img className='md:row-span-2 max-h-80 justify-self-center' src={pictureUrl}></img>
            <div className='text-left'>
                <h6 className='hover:underline'>
                    <Link to={'/item/' + _id}>
                        {title}
                    </Link>
                </h6>
                <p className='mt-3'>{category}</p>
                <p>Model: {model}</p>
                <p>sku: {sku}</p>
            </div>
            <div className='text-left grid grid-cols-2 justify-items-center mt-4 md:mt-0 h-max'>
                <p className='h-max'>Current price</p> <span className='font-medium text-lg h-max'>${price?.current}</span>
                <p>Non-sale Price</p> <span className='font-medium text-lg'>${price?.noSale}</span>
                <p className='mt-3'>Historic Low</p> <span className='mt-3 font-medium text-lg'>${price?.historicLow}</span>
                <p>Historic High</p> <span className='font-medium text-lg'>${price?.historicHigh}</span>
                {props.priceWatch && 
                    <p className='mt-3'>Alert me at </p>
                }
                {props.priceWatch && 
                    <span className='mt-3 font-medium text-lg'>${props.priceWatch.desiredPrice}</span>
                }


            </div>
            <div className="md:col-start-2 min-h-max">
                <a className='my-1 md:my-3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-block' href={url}>View on Bestbuy</a>
            </div>
            {props.priceWatch && 
                <div className="md:col-start-3 min-h-max">
                    <button className='my-1 md:my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded inline-block' onClick={(e) => {props.handleDelete(e, props.priceWatch._id)}}>Delete this alert</button>
                </div>
            }
            
        </div>
    )
}