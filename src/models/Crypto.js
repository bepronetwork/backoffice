var SHA512 = require("crypto-js/hmac-sha512");
var randomHex = require('randomhex');


class Crypto{

    constructor(){
        // TO DO : Finalize Client See e Server Seed Setup

    }

    generateSeed(length = 32){
        return randomHex(length);
    }

    hashSeed(seed){
        return SHA512(seed);
    }

    generateNonce(){
        return Math.floor(Math.random() * 10000000000000000) + 1;
    }

    generateRandomResult(server_seed, client_seed){
        let randomHex = SHA512(server_seed, client_seed);
        return randomHex;

    }

    hexToInt = (randomHex) => {
        // TO DO : If this number is over 999,999 than the next 5 characters (ex : aad5e) would be used. But in our case it's 697,969 so this will be used. Now you only have to apply a modulus of 10^4 and divide it by 100
        let hexString = randomHex.toString().substring(0, 5);
        return parseInt(hexString, 16)%(10000)/100;
    }


}

let CryptographySingleton = new Crypto();

export default CryptographySingleton;