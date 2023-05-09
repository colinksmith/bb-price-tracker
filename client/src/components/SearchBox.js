import React from 'react'

export default function() {
    return (
        <div className="flex my-6 justify-center items-center">
            <div className="flex rounded">
                <input
                    type="text"
                    className="block w-full px-4 py-2 text-purple-700 bg-white border rounded focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    placeholder="Search..."
                />
                <button className="px-4 text-white bg-purple-600 border-l rounded ">
                    Search
                </button>
            </div>
        </div>
    )
}