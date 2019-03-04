import config from "../api/config";


class API{

    getETHPriceAPI = async () => {
        return new Promise( (resolve) => {
            fetch('https://api.coinmarketcap.com/v1/ticker/ethereum', {
                headers : config.headers,
                mode    : 'cors'
            })
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