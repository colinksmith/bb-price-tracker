//example object
const exItem = {
  price: { current: 799.99, noSale: 1079.99 },
  sku: '6529821 ',
  model: 'WA55A7300AE/US ',
  title: 'Samsung - 5.5 cu. ft. Extra-Large Capacity Smart Top Load Washer with Super Speed Wash - Ivory',
  pictureURL: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6529/6529821_sd.jpg;maxHeight=640;maxWidth=550',
  URL: 'https://www.bestbuy.com/site/samsung-5-5-cu-ft-extra-large-capacity-smart-top-load-washer-with-super-speed-wash-ivory/6529821.p?skuId=6529821',
  category: 'Appliances',
  rating: 4.6,
  ratingCount: 381,
}

const puppeteer = require('puppeteer')
const fs = require('fs')
const homeLink = 'https://stores.bestbuy.com/'
const baseLink = 'https://stores.bestbuy.com/site'
const urlLink = 'https://www.bestbuy.com/site/samsung-5-5-cu-ft-extra-large-capacity-smart-top-load-washer-with-super-speed-wash-ivory/6529821.p?skuId=6529821'

const dirPath = './data'
const filePath = './data/storeData.json'
const errorFilePath = './data/error.txt'
const urlListPath = './data/urls'

async function getTextContent(selector, page) {
    let element = await page.waitForSelector(selector)
    let text = await page.evaluate(element => element.textContent, element)
    return text
}
async function getSrcContent(selector, page) {
    let element = await page.waitForSelector(selector)
    let src = await page.evaluate(element => element.src, element)
    return src
}

async function scrapeItemData(destinationUrl) {
    const output = {price: {}}
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()

    await page.goto(destinationUrl)

    const sku = await getTextContent('.sku .product-data-value', page)
    output.sku = Number(sku)
    output.model = await getTextContent('.model .product-data-value', page)
    output.title = await getTextContent('.sku-title h1', page)
    output.pictureUrl = await getSrcContent('.primary-image-selected img', page)
    output.url = page.url()
    const currentPrice = await getTextContent('.priceView-customer-price span', page)
    output.price.current = Number(currentPrice.replaceAll('$' , '').replaceAll(',' , ''))

    output.price.noSale = await page.evaluate(() => {
        let element = document.querySelector('.pricing-price__regular-price')
        let val = null
        if (element) {
            val = Number(element.textContent
                .split(' ')
                .filter(x => x.includes('$'))
                [0]
                .replaceAll('$' , '')
                .replaceAll(',' , '')
            )
        }
        return val 
    })
        || output.price.current
    
    output.category = await getTextContent('.c-breadcrumbs-list-item + .c-breadcrumbs-list-item a', page)
    let rating = 0
    if (await page.$('.ugc-c-review-average')) {
        rating = await getTextContent('.ugc-c-review-average', page)
    } else {
        rating = 0
    }
    output.rating = Number(rating)
    //format displayed reviews eg 1,533 into number
    
    let ratingCount = 0
    if (await page.$('.c-reviews')) {
        ratingCount = await getTextContent('.c-reviews', page)
    } else {
        ratingCount = 0
    }
    output.ratingCount = Number( ratingCount.split(' ')[0].slice(1).replace(',', '') )
    output.priceWatches = []

    console.log(output)

    browser.close()
    return output
}
async function main() {
    let log = await scrapeItemData(urlLink)
}

module.exports = {
    scrapeItemData,
};
