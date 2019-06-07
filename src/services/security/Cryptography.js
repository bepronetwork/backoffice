import Numbers from "../numbers";

var SHA512 = require("crypto-js/hmac-sha512");
var SHA512_HASH = require("crypto-js/sha512");
var randomstring = require("randomstring");
var randomHex = require('randomhex');

class Cryptography{

    constructor(){

    }

    generateSeed(length = 32){
        return randomHex(length);
    }

    hashSeed(seed){
        return SHA512_HASH(seed);
    }

    generateNonce(){
        return Math.floor(Math.random() * 10000000000000000) + 1;
    }

    generateRandomResult(server_seed, client_seed, nonce){
        let randomHex = SHA512(server_seed, client_seed);
        return randomHex;

    }

    hexToInt = (randomHex) => {
        // TO DO : If this number is over 999,999 than the next 5 characters (ex : aad5e) would be used. But in our case it's 697,969 so this will be used. Now you only have to apply a modulus of 10^4 and divide it by 100
        let hexString = randomHex.toString().substring(0, 5);
        return parseInt(hexString, 16)%(10000)/100;
    }

    generatePrivateKey = () => {
        return '0x' + randomstring.generate({
            charset: 'hex',
            length : 64
        });
    }


    async getUserSignature({address, winBalance, nonce, category, decimals}){

        var data =  window.web3.utils.soliditySha3(
            {type: 'int128', value :  Numbers.fromExponential(Numbers.toSmartContractDecimals(winBalance, decimals))},
            {type: 'uint128', value: nonce},
            {type: 'uint8', value: category}
        );

        if (window.web3.utils.isHexStrict(data)) {
            data = window.web3.utils.hexToBytes(data);
        }

        var messageBuffer = Buffer.from(data);
        var preamble = "\x19Ethereum Signed Message:\n".concat(data.length);
        var preambleBuffer = Buffer.from(preamble);
        var ethMessage = Buffer.concat([preambleBuffer, messageBuffer]);
        var hash = window.web3.utils.keccak256(ethMessage);
        let signedMessage = await window.web3.eth.sign(hash, address);
        let signedMessageSplitted = signedMessage.split('x')[1];
        
        let signature = {
            r : "0x" + signedMessageSplitted.substring(0, 64), 
            s : "0x" + signedMessageSplitted.substring(64, 128),
            v : "0x" + signedMessageSplitted.substring(128, 130)
        }
        return {
            signature ,
            nonce,
            category,
            address
        };
    }

}

let CryptographySingleton = new Cryptography();

export default CryptographySingleton;