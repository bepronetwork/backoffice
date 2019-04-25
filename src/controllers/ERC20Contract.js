import {
    ierc20
} from "./interfaces";

import Contract from "../models/Contract";

let self;
const options = {
    token_amount : 1000000000 ,
    decimals : 18
}

class ERC20TokenContract{

    constructor(params){
        self = {
            contract : 
                new Contract({
                    web3 : params.web3,
                    contract : ierc20, 
                    address : params.contractAddress
            }),
            ...params
        }

     
    }

    __assert(){
        self.contract.use(
            ierc20,
            self.contractAddress);
    }

    async __init__(){
        let contractDepolyed = await this.deploy();
          // Start Contract use
        this.__assert(contractDepolyed);
    }

    async deploy(){
        console.log("Deploying...");
        let params = [
            options.token_amount,
            options.decimals
        ];//[params]

        let res = await self.contract.deploy(
            self.account.getAccount(), 
            self.contract.getABI(), 
            self.contract.getJSON().bytecode, 
            params);
        return res;
    }   

    getContract(){
        return self.contract.getContract();
    }

    getAddress(){
        return self.contract.getAddress();
    }

    async getTokenAmount(address){
        return await self.contract.getContract().methods.balanceOf(address).call();
    }

    getABI(){
        return self.contract;
    }
    
   
}



export default ERC20TokenContract;