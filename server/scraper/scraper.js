const puppeteer = require('puppeteer')
const fs = require('fs')
const homeLink = 'https://stores.bestbuy.com/'
const directoryLink = 'https://stores.bestbuy.com/index.html'
const urlLink = 'https://stores.bestbuy.com/al/mobile/1310-tingle-cir-e-340.html'

const dirPath = './data'
const filePath = './data/storeData.json'
const errorFilePath = './data/error.txt'
const urlListPath = './data/urls'

function main() {
    
    let temp = JSON.parse(fs.readFileSync('./categoriesData.json'))
    temp = temp.categories.filter(category => {
        return category.subCategories.length === 0
    })
    temp = JSON.stringify(temp, null, 4)
    fs.writeFileSync('./data/subcategories', temp, (err => {
        if (err) throw err
    }))
}


main()