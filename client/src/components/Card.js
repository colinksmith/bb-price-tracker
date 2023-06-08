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
    } = props.data.item

    return (
        <div className='flex flex-col gap-4 border p-5 items-center grow max-w-full sm:max-w-[50%] lg:max-w-sm mx-0 shadow-md bg-white rounded'>
            <img src={pictureUrl} className='max-h-52'></img>
            <h6>
                <Link className='hover:underline' to={'/item/' + _id}>
                    {title}
                </Link>
            </h6>
            <p><span className='font-medium text-lg'>${price.current}</span> -- Was <span className='font-medium text-lg'>${price.noSale}</span></p>
            <div className='flex gap-4 mt-auto'>
                <a className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded' href={url}>View on Bestbuy</a>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'>
                    <Link to={'/item/' + _id}>
                        Track this price
                    </Link>
                </button>
            </div>
        </div>
    )
}