import React from 'react'
import { Link } from "react-router-dom";


export default function(props) {
    // const {
    //     _id,
    //     category,
    //     model,
    //     pictureUrl,
    //     sku,
    //     title,
    //     url,
    //     price,
    // } = props.data
    console.log(props)
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 my-2 border p-5 shadow-md bg-white rounded">
            <div className='md:col-span-2 text-left'>
                <h6 className='hover:underline'>
                    
                    Error, something went wrong with this url
                    
                </h6>
                <p className='mt-3'>{props.url}</p>
            </div>
            <div className='text-left grid grid-cols-2 justify-items-center mt-4 md:mt-0 h-max'>
                <p className='h-max'></p> <span className='font-medium text-lg h-max'></span>
                <p></p> <span className='font-medium text-lg'></span>
                <p className='mt-3'></p> <span className='mt-3 font-medium text-lg'></span>
                <p></p> <span className='font-medium text-lg'></span>
                {props.priceWatch && 
                    <p className='mt-3'>Alert me at </p>
                }
                {props.priceWatch && 
                    <span className='mt-3 font-medium text-lg'>${props.priceWatch.desiredPrice}</span>
                }


            </div>
            <div className="md:col-start-2 min-h-max">
                <a className='my-1 md:my-3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded inline-block' href={props.url}>Go to this link</a>
            </div>
            {props.priceWatch && 
                <div className="md:col-start-3 min-h-max">
                    <button className='my-1 md:my-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded inline-block' onClick={(e) => {props.handleDelete(e, props.priceWatch._id)}}>Delete this alert</button>
                </div>
            }
            
        </div>
    )
}