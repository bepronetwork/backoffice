import { ETHEREUM_NET_DEFAULT } from "../config/apiConfig";
import { ierc20 } from '../controllers/interfaces';
const abiDecoder = require('abi-decoder'); // NodeJS

var abiDecoderERC20 = abiDecoder;
abiDecoderERC20.addABI(ierc20.abi);

const URL = `https://api${ETHEREUM_NET_DEFAULT != 'mainnet' ? ("-" + ETHEREUM_NET_DEFAULT) : ''}.etherscan.io/api`
const KEY = '6V2VS4ZGQYS9W3X626A58KSGMMXGXD5P9C';

async function getPastTransactions(address){
    let URL_FETCH = `${URL}?module=account&action=txlist&address=${address}&sort=desc&apikey=${KEY}`;
    try{
        let response = await fetch(URL_FETCH, { method : 'GET' });
        return response.json();
    }catch(err){
        throw err;
    }
}


function getTransactionDataERC20(transaction_data_encoded){
    const input = transaction_data_encoded.input;
    const decodedInput = abiDecoderERC20.decodeMethod(input);
    if(!decodedInput){return null}
    const functionName = decodedInput.name;
    const functionParams = decodedInput.params;
    let tokensTransferedTo = functionParams[0].value;
  
    /* Response Object */
    let res = {
        tokensTransferedTo : tokensTransferedTo,
        functionName : functionName,
        from : transaction_data_encoded.from,
        tokenAmount : functionParams[1].value
    }

    return res;
    
}


export {
    getPastTransactions,
    getTransactionDataERC20
}