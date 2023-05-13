import DetailedCard from 'components/DetailedCard';
import { 
    Label, 
    TextInput,
    Checkbox,
    Button,
} from 'flowbite-react'
import { useExampleContext } from '../contexts/ExampleContext';

export default function FeatureTwo() {

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
                    />
                </div>
                <Button type="submit">
                    Submit
                </Button>
            </form>
            <DetailedCard />
        </div>
    )
} 