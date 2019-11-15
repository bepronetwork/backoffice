var api = require('etherscan-api').init('QPSKFN1UAJPK9NGVUMYMA1RAKKACQN6GQW');

export async function getContractData({address}){
    return await api.contract.getabi(address);
}