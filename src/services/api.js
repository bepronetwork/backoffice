class API{

    getETHPriceAPI = async () => {
        return new Promise( (resolve, reject) => {
            fetch('https://api.coinmarketcap.com/v1/ticker/ethereum/')
            .then(response => resolve(response.json()))
            .catch(error => console.log(error))
        })
    }

    getEthereumPrice = async (eth_quantity) => {
        let response = await this.getETHPriceAPI();
        return parseFloat(eth_quantity)*parseInt(response[0].price_usd);
    }

}

let APISingleton = new API();

export default APISingleton;