import pic from '../assets/man-g17d7c8d33_1280.jpg'

export default function About() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 mt-6 justify-items-center'>
            <img src={pic} className='rounded-full w-full max-w-sm center self-center'></img>
            <div>
                <h1 className='text-xl font-medium mt-3'>About BB Price Tracker</h1>
                <p className='mt-3'>This project was made to help people get the best deals on electronics at BestBuy. I personally always enjoy getting a deal on a product, but oftentimes I don't care to keep checking day after day to see whether a product is on sale or at the price I'd be willing to buy it at. This website makes that easy - just make a price watch and you'll automatically get an email when the price is right.</p>
                <p className='mt-3'>This project was also partially inspired by BestBuy's price adjustment policy - if the price drops within the return period, they can get you the new sale price. Of course I never check the price after I've bought something, but this way I set it up to be alerted if the price drops below the price I bought it for.</p>
            </div>

        </div>
    )
}