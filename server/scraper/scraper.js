// const puppeteer = require('puppeteer')
const fs = require('fs')
const mongoose = require("mongoose");
const { PriceWatch } = require("../models/PriceWatch")
const { Item } = require("../models/Item")

const dirPath = './data'
const errorFilePath = './data/error.log'

async function getTextContent(selector, page) {
    try {
        let element = await page.waitForSelector(selector)
        let text = await page.evaluate(element => element.textContent, element)
        return text
    } catch(err) {
        console.log(err)
        return null
    }
}
async function getSrcContent(selector, page) {
    try {
        let element = await page.waitForSelector(selector)
        let src = await page.evaluate(element => element.src, element)
        return src
    } catch(err) {
        console.log(err)
        return null
    }
}

async function scrapeItemData(destinationUrl) {
    const output = {price: {}}
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()

    page.setDefaultNavigationTimeout(120000)

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
        if (element && element !== 'Not yet reviewed') {
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
        ratingCount = Number( ratingCount.split(' ')[0].slice(1).replace(',', '') )
        if (isNaN(ratingCount)) {
            ratingCount = 0
        }
    } else {
        ratingCount = 0
    }
    output.ratingCount = ratingCount
    output.priceWatches = []

    // console.log(output)

    browser.close()
    return output
}

async function updatePrices(itemID) {
    //get item from db
    const dbItem = await Item.findById(itemID)
    //scrape data from bb.com
    const scrapeData = await scrapeItemData(dbItem.url)
    //update prices info in item
    dbItem.rating = scrapeData.rating
    dbItem.ratingCount = scrapeData.ratingCount
    dbItem.price.current = scrapeData.price.current
    dbItem.price.noSale = scrapeData.price.noSale
    dbItem.price.historicLow = Math.min(dbItem.price.historicLow, scrapeData.price.current)
    dbItem.price.historicHigh = Math.max(dbItem.price.historicHigh, scrapeData.price.noSale)
    dbItem.priceData.push({date: new Date, price: scrapeData.price.current})
    //push changes to db
    await Item.findByIdAndUpdate(itemID, dbItem)
}

async function getItemIDList() {
    let output = await PriceWatch.find({}).populate('item')
    output = output.map(obj => obj.item._id)
    output = [...new Set(output)]
    return output
}

async function updateAllPrices() {
    const itemIDList = await getItemIDList()
    const failedItemList = []

    async function delay() {
        return new Promise ((resolve, reject) => {
            setTimeout(() => {resolve()}, Math.floor(Math.random() * 4000) + 1000);
        }) 
    }

    for (let i = 0; i < itemIDList.length; i++) {
        try {
            let beginningDelay = new Date
            await delay()
            let endingDelay = new Date
            await updatePrices(itemIDList[i])
            console.log(`updated item: ${itemIDList[i]} with starting delay: ${beginningDelay.getSeconds()} ending delay: ${endingDelay.getSeconds()} and completed at ${(new Date).toTimeString()}`)
        } catch (err) {
            console.log(err)
            writeError(`An error occured for this item: "${itemIDList[i]}" at index ${i}. ${err}`)
            failedItemList.push(itemIDList)
        }
    }
}

async function writeError(message) {
    const date = new Date()
    message = `${date}: ${message}`
    try {
        if (fs.existsSync(errorFilePath)){
            fs.appendFile(errorFilePath, `\n\n${message}`, (err) => {
                if (err) throw err
            })
            console.log(`added error to ${errorFilePath}`)
        } else {
            createDir(dirPath)
            createFile(errorFilePath, message)
            console.log(`created ${errorFilePath}`)
        }
    } catch (err){
        console.error(err)
    }
}

// const createDir = (dirPath) => {
//     fs.mkdirSync(dirPath, {recursive: true}, (error) => {
//         if (error) {
//             console.error('An error occurred: ', error)
//         } else {
//          //    console.log('Your directory is made!')
//         }
//     })
//  }
 const createFile = (filePath, fileContent) => {
    fs.writeFile(filePath, fileContent, (error) => {
        if (error) {
            console.error('An error occurred: ', error)
        } else {
         //    console.log('Your file is made!')
        }
    })
}

module.exports = {
    scrapeItemData,
    updatePrices,
    getItemIDList,
    updateAllPrices,
};