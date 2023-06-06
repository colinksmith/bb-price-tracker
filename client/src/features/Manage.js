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
    console.log(props.data)
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
                    onChange={(e) => props.handleChangeInForm(e)}
                    name="email"
                    />
                </div>
                <Button type="submit" onClick={props.handleSubmit}>
                    Submit
                </Button>
            </form>
            {props.data.priceWatches && props.data.priceWatches.map((priceWatch, index) => 
                <DetailedCard data={props.data.priceWatches[index].item} priceWatch={props.data.priceWatches[index]} key={index}/>
                )
            }
        </div>
    )
} 