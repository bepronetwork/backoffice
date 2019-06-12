import {
    casino
} from "./interfaces";

import Contract from "../models/Contract";
import ERC20TokenContract from "./ERC20Contract";
import { fromBigNumberToInteger } from "./services/services";
import Numbers from "../services/numbers";

let self;

class CasinoContract{
    constructor({contractAddress, tokenAddress, decimals}){
        self = {
            contract : 
            new Contract({
                web3 : window.web3,
                contract : casino, 
                address : contractAddress,
                tokenAddress : tokenAddress
            }),
            erc20TokenContract : new ERC20TokenContract({
                web3 : global.web3,
                contractAddress : tokenAddress
            }),
            decimals
        }
    }

      /**
     * @constructor Starting Function
     */

    async __init__(){
        console.log("\Contract Creator Address : " + self.account.getAddress());
        let contractDepolyed = await this.deploy();
        console.log("\nContract Address " + contractDepolyed)
        await this.sendTokensToCasinoContract(self.tokenTransferAmount || 1000000);
        await this.authorize(self.account.getAddress());
        this.__assert(contractDepolyed);
        return this;
    }

    __assert(){
        self.contract.use(
            casino,
            self.contractAddress);
    }

    /**
     * @constructor Starting Function
     */

  
    sendTokensToCasinoContract = async () => {
        try{
            console.log("Sending Tokens...")
            let data = await self.erc20TokenContract.getContract().methods.transfer(
                self.contractAddress,
                100
            ).encodeABI();
            await self.erc20TokenContract.getABI().send(self.account.getAccount(), data);
            console.log("Tokens Sent...");
            return self.erc20TokenContract;
          
        }catch(err){
            console.log(err);
        }   
    }
    
    async start(){
        let balance = await self.account.getBalance();
        console.log(balance + " ETH");
        try{
            console.log(await self.contract.getContract().methods.balanceOf(self.account.getAddress()).call());  
        }catch(err){
            console.log(err);
        }
    }

    async updateState(signedMessageObject, nonce, tokenAmount, winBalance, category, chargeGas){
        try{          
            let data = await self.contract.getContract().methods.updateState(
                parseInt(tokenAmount),
                parseInt(winBalance),
                nonce,
                category,
                signedMessageObject.v,
                signedMessageObject.r,
                signedMessageObject.s,
                chargeGas
                ).encodeABI();
            let response = await self.contract.send(self.account.getAccount(), data);  
            return response;   
        }catch(err){
            console.log(err);
        }   
    }


    async getApprovedWithdrawAmount(address){
        try{
            return Numbers.fromBigNumberToInteger(await self.contract.getContract().methods.approveWithdraw(address).call())
        }catch(err){
            throw err;
        }
    }


    async withdrawTokens({amount, decimals}){
        let amountWithDecimals = Numbers.toSmartContractDecimals(amount, decimals);
        let accounts = await window.web3.eth.getAccounts();

        return new Promise ( (resolve, reject) => {
            self.contract.getContract().methods.withdraw(
                accounts[0],
                amountWithDecimals
            ).send({from : accounts[0]})
            .on('transactionHash', (hash) => {
            })
            .on('confirmation', (confirmations, receipt) => {
                resolve(receipt)
            })
            .on('error', () => {reject("Transaction Error")})
        })
    }

    async withdrawApp({receiverAddress, amount}){
        try{
            let accounts = await window.web3.eth.getAccounts();
            let amountWithDecimals = Numbers.toSmartContractDecimals(amount, self.decimals);
            return new Promise ( (resolve, reject) => {
                self.contract.getContract().methods.withdrawBankroll(
                    receiverAddress,
                    amountWithDecimals
                ).send({from : accounts[0]})
                .on('transactionHash', (hash) => {
                })
                .on('confirmation', (confirmations, receipt) => {
                    resolve(receipt)
                })
                .on('error', () => {reject("Transaction Error")})
            })
        }catch(err){
            throw err;
        }
    }


    async cancelWithdraw(){
        try{
            var res;
            let accounts = await window.web3.eth.getAccounts();
            let approvedWithdrawAmount = await this.getApprovedWithdrawAmount(accounts[0]);
            if(approvedWithdrawAmount > 0){
                return new Promise ( (resolve, reject) => {
                    self.contract.getContract().methods.cancelWithdraw().send({from : accounts[0]})
                    .on('transactionHash', (hash) => {
                    })
                    .on('confirmation', (confirmations, receipt) => {
                        resolve(receipt)
                    })
                    .on('error', () => {reject("Transaction Error")})
                })
            }
            return res;
        }catch(err){
            console.log(err)
        }
    }


    async getBankRoll(){
        try{
            let res = await self.contract.getContract().methods.bankroll().call()
            let number =  window.web3.utils.hexToNumber(res._hex);
            console.log(number)
            return fromBigNumberToInteger(res); 
        }catch(err){
            console.log(err)
        }
    }


    async determinePlayer( signedMessageObject, winBalance,  nonce, category){
        try{
            let response = await self.contract.getContract().methods.determinePlayer(
                parseInt(winBalance),
                nonce,
                category,
                signedMessageObject.v,
                signedMessageObject.r,
                signedMessageObject.s
            ).call({
                from : self.account.getAddress()
            });
            return response    
        }catch(err){
            console.log(err);
        }   
    }

    fromIntToFloatEthereum(int){
        return Math.round(int*100);
    }

    async getHouseTokenAmount(){
        try{
            let playersTokenAmount = await this.getAllPlayersTokenAmount();
            let houseAmount = await this.getSmartContractLiquidity();
            console.log(houseAmount, playersTokenAmount)
            return houseAmount - playersTokenAmount;
        }catch(err){
            console.log(err);
            return 'N/A';
        }
    }

    async getAllPlayersTokenAmount(){
        try{
            return fromBigNumberToInteger(await self.contract.getContract().methods.playerBalance().call());
        }catch(err){
            console.log(err);
            return 'N/A';
        }
    }

    async getSmartContractLiquidity(){
        try{
            return fromBigNumberToInteger(await self.erc20TokenContract.getTokenAmount(this.getAddress()));
        }catch(err){
            console.log(err);
            return 'N/A';
        }
    }


    /**
     * @Functions
     */

    async deploy(){
        console.log("Deploying...");
        let params = [
            self.erc20TokenContract.getAddress(),  // Predecessor Contract
            self.erc20TokenContract.getAddress(),  // ERC-20 Token Contract
            100,                      // Deposit Limit
            1                         // K Gas Price
        ];

        let res = await self.contract.deploy(
            self.account.getAccount(), 
            self.contract.getABI(), 
            self.contract.getJSON().bytecode, 
            params);
        self.contractAddress = res.contractAddress;
        return res;
    }

    getAddress(){
        return self.contract.getAddress();
    }

}



export default CasinoContract;