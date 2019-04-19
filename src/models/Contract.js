var fs = require('fs');
const _ = require('lodash');
const web = require('web3');

class Contract{

    constructor(web3, contract_json, address)
    {
        this.web3 = web3;
        this.json = contract_json;      
        this.abi = contract_json.abi;
        this.address = address;
        this.contract = new web3.eth.Contract(contract_json.abi, address)
    }

    async deploy(account, abi, byteCode, args=[]){
        this.contract = new this.web3.eth.Contract(abi);

        let balance = await this.web3.eth.getBalance(account.address);
        console.log("Balance is " + this.web3.utils.fromWei(balance, 'ether') + " ETH");
        let data = this.contract.deploy({
            data : byteCode,
            arguments: args
        }).encodeABI();

        let tx = {
            data : data,
            from  : account.address,
            gas : 5913388
        }
        
        let result = await account.signTransaction(tx);
        let transaction = await this.web3.eth.sendSignedTransaction(result.rawTransaction);
        console.log("Contract Signed");
        //fs.writeFile('Deployed.json', JSON.stringify(transaction), 'utf8', () => {});
        this.address = transaction.contractAddress;
        return transaction;
    }

    async use(contract_json, address){
        this.json = contract_json;      
        this.abi = contract_json.abi;
        this.address = address ? address : this.address;
        this.contract = new this.web3.eth.Contract(contract_json.abi, this.address)
    } 

    async send(account, byteCode, value='0x0'){
        let tx = {
            data : byteCode,
            from  : account.address,
            to : this.address,
            gas : 4430000,
            gasPrice : 800000000,
            value: value ? value : '0x0'
        }

        let result = await account.signTransaction(tx);
        let transaction = await this.web3.eth.sendSignedTransaction(result.rawTransaction);
        console.log('Call done!');
        return transaction;
    }
    
    getContract(){
        return this.contract;
    }

    getABI(){
        return this.abi;
    }

    getJSON(){
        return this.json;
    }

    getAddress(){
        return this.address;
    }
}


export default Contract;