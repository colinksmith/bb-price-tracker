import React, { useEffect, useState } from 'react'
import APIService from '../services/apiService';
import { useParams } from "react-router-dom"
import DetailedCard from "components/DetailedCard"
import LineChart from "components/LineChart"
import { 
    Label, 
    TextInput,
    Checkbox,
    Button,
} from 'flowbite-react'

export default function(props) {
    const { id } = useParams()
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    // Fetch events from server
    const fetchData = async () => {
        // Database data from server
        const response = await APIService.getItemById(id);
        setData(response.data);
    }

    // Fetch the data on page load, don't set loading to false until data's fetched.
    useEffect(() => {
        setLoading(true);
        fetchData()
        .then(setLoading(false)).catch(setLoading(false));
    }, [])
    console.log(data)

    if (loading) return null;

    return (
        <div>
            <DetailedCard 
                data={data}
            />
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
                    <input
                    id="url"
                    type="hidden"
                    required={true}
                    name="initialUrl"
                    value={id}
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
            <LineChart data={data}/>
        </div>
    )
}