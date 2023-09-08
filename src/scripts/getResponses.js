const axios = require('axios');

const { getWhitelistPrice } = require('./fetcherPrices/whitelistPrices.js');
const { whitelist } = require('../whitelist.js');


async function getSinglePriceResponse(addresses) {
    let response = {}; 
    const contractAddresses = addresses.split(',');
    for (const address of contractAddresses) {
      if (!whitelist.includes(address)) {
        // If is not in the whitelist get price from Coingecko
        try {
          const coinGeckoUrl = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${address}&vs_currencies=usd`;
          console.log(coinGeckoUrl)
          const coinGeckoResponse = await axios.get(coinGeckoUrl);
          response[address] = coinGeckoResponse.data[address];
        } catch (error) {
          console.log(error)
        }
      } else {
        // If the address is in the whitelist here will be define the price of this asset
        const whitelistAddressIndex = whitelist.indexOf(address)
        response[address] = {
          "usd": await getWhitelistPrice(whitelistAddressIndex)
        };
      }
    }
    return response;
}

async function getRangePriceResponse(address, fromTimestamp, toTimestamp) {
  let response = {};
  if (!whitelist.includes(address)) {
    try {
      // If is not in the whitelist get price from Coingecko
      const coinGeckoUrl = `https://api.coingecko.com/api/v3/coins/ethereum/contract/${address}/market_chart/range?vs_currency=usd&from=${fromTimestamp}&to=${toTimestamp}`;
      const coinGeckoResponse = await axios.get(coinGeckoUrl);
      response = coinGeckoResponse.data;
    } catch (error) {
      response = { error: 'Error fetching data' }
    }
  } else {
    // If the address is in the whitelist here will be define the price of this asset
    const whitelistAddressIndex = whitelist.indexOf(address)
    response = {
      prices: [],
      market_caps: [],
      total_volumes: []
    };

    const price = await getWhitelistPrice(whitelistAddressIndex)

    let pivot = Number(fromTimestamp)
    while (pivot < Number(toTimestamp)) {
      response.prices.push([pivot * 1000, price]);
      response.market_caps.push([pivot * 1000, price * 50_000]);
      response.total_volumes.push([pivot * 1000, price * 5_000]);

      // update pivot
      pivot += 3_600    // 3_600 is 1 hour in sec
    }
  }
  return response;
}

module.exports = { getSinglePriceResponse, getRangePriceResponse };