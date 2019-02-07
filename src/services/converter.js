import APISingleton from "./api";

class converter{
    constructor(){}

    fromETHtoUsd = (eth_quantity) => {
        
        let usd_quantity = APISingleton.getEthereumPrice(eth_quantity);
        return usd_quantity;
    }
}

let ConverterSingleton = new converter();

export default ConverterSingleton;