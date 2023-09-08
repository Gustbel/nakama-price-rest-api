async function getSinglePriceResponse(address) {
    return { "single": address }
}

async function getRangePriceResponse(address) {
    return { "range": address }
}

module.exports = { getSinglePriceResponse, getRangePriceResponse };