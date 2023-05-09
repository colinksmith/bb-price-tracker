import SearchBox from '../components/SearchBox';
import DetailedCard from "../components/DetailedCard"
import { useExampleContext } from '../contexts/ExampleContext';
import { 
    Label, 
    Select, 
    TextInput,
    Checkbox,
    Button,
    buttonStyle
} from 'flowbite-react'

export default function FeatureOne() {

    // Consume (i.e. acquire, grab, pull, etc) the data
    // from the ExampleContext.
    const { setExampleData } = useExampleContext();

    // We can then update this data between files.

    // Try setting exampleData here:
    const handleButton = () => {
        setExampleData({ value: "Value is now One" });
    }

    const buttonStyle = "border-2 border-black \
    bg-cyan-400 hover:bg-cyan-600 active:bg-cyan-700 \
    rounded-full py-2 px-10 text-slate-800 \
    text-lg font-bold tracking-wider"

    return (
        <div>
            <form className="grid md:grid-cols-2 gap-4">
                <div className="col-span-2">
                    <div className="mb-2 block">
                    </div>
                    <TextInput
                    id="email1"
                    type="email"
                    placeholder="Enter URL, SKU, or description"
                    required={true}
                    />
                </div>
                <div id="select" className="">
                    <div className="mb-2 block">
                        <Label
                        htmlFor="filters"
                        value="Filter by"
                        />
                    </div>
                    <Select
                        id="filters"
                        required={true}
                    >
                        <option>
                        all
                        </option>
                    </Select>
                </div>
                <div id="select">
                    <div className="mb-2 block">
                        <Label
                        htmlFor="sort"
                        value="Sort results by"
                        />
                    </div>
                    <Select
                        id="sort"
                        required={true}
                    >
                        <option>
                        Relevance
                        </option>
                        <option>
                        Price high to low
                        </option>
                        <option>
                        Price low to high
                        </option>
                        <option>
                        Newest arrival
                        </option>
                        <option>
                        Rating
                        </option>
                        <option>
                        Number of reviews
                        </option>
                    </Select>
                </div>
                <Button className="col-span-2" type="submit">
                    Submit
                </Button>
            </form>
            
            <DetailedCard />

        </div>
    )
} 