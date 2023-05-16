//example object
const exItem = {
  prices: { current: 799.99, noSale: 1079.99 },
  sku: '6529821 ',
  model: 'WA55A7300AE/US ',
  title: 'Samsung - 5.5 cu. ft. Extra-Large Capacity Smart Top Load Washer with Super Speed Wash - Ivory',
  pictureURL: 'https://pisces.bbystatic.com/image2/BestBuy_US/images/products/6529/6529821_sd.jpg;maxHeight=640;maxWidth=550',
  URL: 'https://www.bestbuy.com/site/samsung-5-5-cu-ft-extra-large-capacity-smart-top-load-washer-with-super-speed-wash-ivory/6529821.p?skuId=6529821',
  category: 'Appliances',
  rating: 4.6,
  reviewCount: 381,
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

async function scrapeItemData() {
    const output = {prices: {}}
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()

    await page.goto(urlLink)

    const sku = await getTextContent('.sku .product-data-value', page)
    output.sku = Number(sku)
    output.model = await getTextContent('.model .product-data-value', page)
    output.title = await getTextContent('.sku-title h1', page)
    output.pictureURL = await getSrcContent('.primary-image-selected img', page)
    output.URL = page.url()
    const currentPrice = await getTextContent('.priceView-customer-price span', page)
    output.prices.current = Number(currentPrice.replaceAll('$' , '').replaceAll(',' , ''))
    if (await page.$('.pricing-price__regular-price')) {
        const noSale = await getTextContent('.pricing-price__regular-price', page)
        output.prices.noSale = Number(noSale
            .split(' ')
            .filter(x => x.includes('$'))
            [0]
            .replaceAll('$' , '')
            .replaceAll(',' , '')
        )
    } else {
        output.prices.noSale = output.prices.current
    }
    output.category = await getTextContent('.c-breadcrumbs-list-item + .c-breadcrumbs-list-item a', page)
    const rating = await getTextContent('.ugc-c-review-average', page)
    output.rating = Number(rating)
    //format displayed reviews eg 1,533 into number
    const reviewCount = await getTextContent('.c-reviews', page)
    output.reviewCount = Number( reviewCount.split(' ')[0].slice(1).replace(',', '') )

    

    return output
}
async function main() {
    let log = await scrapeItemData()
    console.log(log)
}

main()