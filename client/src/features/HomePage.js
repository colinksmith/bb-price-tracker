import SearchBox from "../components/SearchBox";
import Card from "../components/Card"

const HomePage = () => {
    return(
        <div>
            <SearchBox />
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