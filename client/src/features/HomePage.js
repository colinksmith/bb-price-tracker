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

    useEffect(() => {
        setLoading(true)
        fetchHomeData()
        .then(setLoading(false)).catch(setLoading(false))
    }, [])
    // Render nothing while fetching for data from server
    if (loading) return null;

    console.log(homeData)

    return(
        <div>
            <form className="flex flex-col gap-4 mt-4 border p-5 shadow-lg bg-white rounded" onSubmit={props.handleSubmit}>
                <h2 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Create a price watch</h2>
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
                    type="number"
                    placeholder="$99.99"
                    required={true}
                    onChange={(e) => props.handleChangeInForm(e)}
                    name="desiredPrice"
                    />
                </div>
                <Button type="submit">
                    Submit
                </Button>
                {props.respons.data && props.respons.status === 201 &&
                    <p id="standard_success_help" className="mt-2 text-xs text-green-600 dark:text-green-400">{props.respons.data.message}</p>
                }
                {props.respons.data && props.respons.status === 200 &&
                    <p id="standard_success_help" className="mt-2 text-xs text-red-600 dark:text-red-400"><span class="font-medium">Error: </span>{props.respons.data.message}</p>
                }
            </form>
            <div className="flex flex-col gap-4">
                <h3 className="mb-3 mt-5 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">Recent price watches</h3>
                <div className="flex justify-center my-6 lg:gap-2 flex-wrap">
                    {/* {!loading && homeData.map((item, index) => 
                        <Card data={item} key={index} />
                    )} */}
                </div>
            </div>
        </div>
    )
}

export default HomePage;