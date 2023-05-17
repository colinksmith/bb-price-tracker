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
    const { sku } = useParams()
    // console.log(sku)

    return (
        <div>
            <DetailedCard />
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
                    value={sku}
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
            <LineChart />
        </div>
    )
}