import React, { useEffect, useState } from 'react'
import SearchBox from "../components/SearchBox";
import Card from "../components/Card"
import { 
    Label, 
    TextInput,
    Checkbox,
    Button,
} from 'flowbite-react'
import APIService from '../services/apiService';


const HomePage = (props) => {
    const [loading, setLoading] = useState(true);
    const [homeData, setHomeData] = useState([])

    const fetchHomeData = async () => {
        const response = await APIService.getRecentItems()
        setHomeData(response.data)
    }
    
    // Fetch the data on page load, don't set loading to false until data's fetched.
    // useEffect(() => {
    //   setLoading(true);
    //   fetchData()
    //   .then(setLoading(false)).catch(setLoading(false));
    // }, [])

    console.log(homeData)
    useEffect(() => {
        setLoading(true)
        fetchHomeData()
        .then(setLoading(false)).catch(setLoading(false))
    }, [])
    // Render nothing while fetching for data from server
    if (loading) return null;

    return(
        <div>
            <form className="flex flex-col gap-4 border p-5" onSubmit={props.handleSubmit}>
                <h2>Create a price watch</h2>
                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="email1"
                        value="We'll send an email to"
                    />
                    </div>
                    <TextInput
                    id="email1"
                    type="email"
                    placeholder="name@mail.com"
                    required={true}
                    onChange={(e) => props.handleChangeInForm(e)}
                    name="email"
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="url"
                        value="For this product (url link)"
                    />
                    </div>
                    <TextInput
                    id="url"
                    type="string"
                    placeholder="https://www.bestbuy.com/site/lg-65-class-c1-series-oled-4k-uhd-smart-webos-tv/6453312.p?skuId=6453312"
                    required={true}
                    onChange={(e) => props.handleChangeInForm(e)}
                    name="initialUrl"
                    />
                </div>
                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="price"
                        value="When the price drops to"
                    />
                    </div>
                    <TextInput
                    id="price"
                    type="string"
                    placeholder="$99.99"
                    required={true}
                    onChange={(e) => props.handleChangeInForm(e)}
                    name="desiredPrice"
                    />
                </div>
                <Button type="submit">
                    Submit
                </Button>
            </form>
            <div>
                <h3>Recent searches</h3>
                <div className="flex justify-center my-6 gap-10">
                    {!loading && homeData.map((item, index) => 
                        <Card data={item} key={index} />
                    )}
                </div>
            </div>
        </div>
    )
}

export default HomePage;