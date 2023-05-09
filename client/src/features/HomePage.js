import Card from "../components/Card"

const HomePage = () => {
    return(
        <div>
            <div className="flex my-6 justify-center items-center">
                <div className="flex border border-purple-200 rounded">
                    <input
                        type="text"
                        className="block w-full px-4 py-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        placeholder="Search..."
                    />
                    <button className="px-4 text-white bg-purple-600 border-l rounded ">
                        Search
                    </button>
                </div>
            </div>
            <div>
                <h3>Recent searches</h3>
                <div className="flex justify-center my-6 gap-10">
                    <Card />
                    <Card />
                    <Card />

                </div>

            </div>
            <div>
                <h4>Historic Lows</h4>
                <div className="flex justify-center my-6 gap-10">
                    <Card />
                    <Card />
                    <Card />

                </div>

            </div>
        </div>
    )
}

export default HomePage;