import React, { useEffect, useState } from 'react'
import DetailedCard from 'components/DetailedCard';
import { 
    Label, 
    TextInput,
    Checkbox,
    Button,
} from 'flowbite-react'
import { useExampleContext } from '../contexts/ExampleContext';

export default function Manage(props) {
    const [email, setEmail] = useState('')

    async function getItems(e) {
        e.preventDefault()
        await fetch(`http://localhost:2121/pricewatch/manage/${email}`)
    }

    const handleChangeInForm = (e) => {
        // Set the target state to the new form field value
        const {name, value} = e.target;
        setEmail(prevEmail => {
            return ({ ...prevEmail, [name]: value })
        });
    }

    return (
        <div>
            <form className="flex flex-col gap-4 border p-5">
                <h2>Manage price watches</h2>
                <div>
                    <div className="mb-2 block">
                    <Label
                        htmlFor="email1"
                        value="Email"
                    />
                    </div>
                    <TextInput
                    id="email1"
                    type="email"
                    placeholder="name@mail.com"
                    required={true}
                    onChange={(e) => handleChangeInForm(e)}
                    name="email"
                    />
                </div>
                <Button type="submit" onClick={getItems}>
                    Submit
                </Button>
            </form>

            {/* <DetailedCard /> */}
        </div>
    )
} 