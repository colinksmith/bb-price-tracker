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
    console.log(data)

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
    
    useEffect(() => {
        props.setFormData(prevFormData => {
              return ({ ...prevFormData, ['initialUrl']: data.url })
          })
    }, [data])

    if (loading) return null;

    return (
        <div>
            <DetailedCard 
                data={data}
            />
            <form className="mt-3 flex flex-col gap-4 border p-5 shadow-md bg-white rounded" onSubmit={props.handleSubmit}>
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
            <div className='mt-3 width-max aspect-square md:aspect-[2/1] relative shadow-md bg-white rounded'>
                <LineChart data={data}/>
            </div>
        </div>
    )
}