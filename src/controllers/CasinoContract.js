import {
    casino
} from "./interfaces";

import Contract from "../models/Contract";
import ERC20TokenContract from "./ERC20Contract";
import { fromBigNumberToInteger } from "./services/services";
import Numbers from "../services/numbers";

let self;

class CasinoContract{
    constructor({contractAddress, tokenAddress, decimals, authorizedAddress, ownerAddress, croupierAddress}){
        self = {
            contract : 
            new Contract({
                web3 : window.web3,
                contract : casino, 
                address : contractAddress,
                tokenAddress : tokenAddress
            }),
            erc20TokenContract : tokenAddress ? new ERC20TokenContract({
                web3 : global.web3,
                contractAddress : tokenAddress
            }) : null,
            decimals,
            authorizedAddress,
            ownerAddress,
            contractAddress,
            croupierAddress
        }
    }

      /**
     * @constructor Starting Function
     */

    async __init__(){
        let contractDepolyed = await this.deploy();
        this.__assert(contractDepolyed);
        await this.authorizeCroupier({addr : self.croupierAddress});
        return this;
    }


    async authorizeAccountToManage({addr=self.ownerAddress}){
        try{
            let accounts = await window.web3.eth.getAccounts();
            return new Promise ( (resolve, reject) => {
                self.contract.getContract().methods.authorizeAccount(
                    addr                 
                ).send({from : accounts[0]})
                .on('transactionHash', (hash) => {
                })
                .on('confirmation', (confirmations, receipt) => {
                    resolve(receipt)
                })
                .on('error', () => {reject("Transaction Error")})
            })          
        }catch(err){
            console.log(err);
        }   
    }

    async unauthorizeAccountToManage({addr}){
        try{
            let accounts = await window.web3.eth.getAccounts();
            return new Promise ( (resolve, reject) => {
                self.contract.getContract().methods.unauthorizeAccount(
                    addr                 
                ).send({from : accounts[0]})
                .on('transactionHash', (hash) => {
                })
                .on('confirmation', (confirmations, receipt) => {
                    resolve(receipt)
                })
                .on('error', () => {reject("Transaction Error")})
            })          
        }catch(err){
            console.log(err);
        }   
    }

    async authorizeCroupier({addr=self.authorized}){
        try{
            let accounts = await window.web3.eth.getAccounts();
            return new Promise ( (resolve, reject) => {
                self.contract.getContract().methods.authorizeCroupier(
                    addr                 
                ).send({from : accounts[0]})
                .on('transactionHash', (hash) => {
                })
                .on('confirmation', (confirmations, receipt) => {
                    resolve(receipt)
                })
                .on('error', () => {reject("Transaction Error")})
            })          
        }catch(err){
            console.log(err);
        }   
    }




    __assert(){
        self.contract.use(
            casino,
            self.contractAddress);
    }

    /**
     * @constructor Starting Function
     */

  
    sendTokensToCasinoContract = async ({amount}) => {
        try{
            let accounts = await window.web3.eth.getAccounts();
            let amountWithDecimals = Numbers.toSmartContractDecimals(amount, self.decimals);

            return new Promise ( (resolve, reject) => {
                self.erc20TokenContract.getContract().methods.transfer(
                    self.contractAddress,
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
            console.log(err);
        }   
    }
    
    async start(){
       
    }

    async getApprovedWithdrawAmount(address){
        try{
            return Numbers.fromBigNumberToInteger(
                (await self.contract.getContract().methods.withdrawals(address).call()).amount
                )
        }catch(err){
            throw err;
        }
    }


    async withdrawTokens({amount, decimals}){
        let amountWithDecimals = Numbers.toSmartContractDecimals(amount, decimals);
        let accounts = await window.web3.eth.getAccounts();

        return new Promise ( (resolve, reject) => {
            self.contract.getContract().methods.withdraw(
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

    async setUserWithdrawal({address, amount}){
        try{
            let accounts = await window.web3.eth.getAccounts();
            let amountWithDecimals = Numbers.toSmartContractDecimals(amount, self.decimals);
            return new Promise ( (resolve, reject) => {
                self.contract.getContract().methods.setUserWithdrawal(
                    address,
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

    async setUserWithdrawalBatch({addresses, amounts}){
        try{
            let accounts = await window.web3.eth.getAccounts();
            let amountsWithDecimals = amounts.map( a => Numbers.toSmartContractDecimals(a, self.decimals))
            return new Promise ( (resolve, reject) => {
                self.contract.getContract().methods.setUserWithdrawalBatch(
                    addresses,
                    amountsWithDecimals
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

    async withdrawApp({amount}){
        try{
            let accounts = await window.web3.eth.getAccounts();
            let amountWithDecimals = Numbers.toSmartContractDecimals(amount, self.decimals);
            return new Promise ( (resolve, reject) => {
                self.contract.getContract().methods.ownerWithdrawalTokens(
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
        }catch(err){
            throw err;
        }
    }

    async changeCasinoToken({address}){
        try{
            let accounts = await window.web3.eth.getAccounts();
            return new Promise ( (resolve, reject) => {
                self.contract.getContract().methods.changeSingleTokenContract(
                    address
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

    async getBankRoll(){
        try{
            return Numbers.fromBigNumberToInteger(await self.contract.getContract().methods.bankroll().call(), self.decimals); 
        }catch(err){
            throw err;
        }
    }

    fromIntToFloatEthereum(int){
        return Math.round(int*100);
    }

    async getHouseTokenAmount(){
        try{
            let playersTokenAmount = await this.getAllPlayersTokenAmount();
            let houseAmount = await this.getSmartContractLiquidity();
            return houseAmount - playersTokenAmount;
        }catch(err){
            return 'N/A';
        }
    }

    async getAllPlayersTokenAmount(){
        try{
            return Numbers.fromDecimals(await self.contract.getContract().methods.totalPlayerBalance().call(), self.decimals);
        }catch(err){
            return 'N/A';
        }
    }

    async getSmartContractLiquidity(){
        try{
            return Numbers.fromDecimals(await self.erc20TokenContract.getTokenAmount(this.getAddress()), self.decimals);
        }catch(err){
            return 'N/A';
        }
    }

    async getMaxDeposit(){
        try{
            return Numbers.fromDecimals(await self.contract.getContract().methods.maxDeposit().call(), self.decimals);
        }catch(err){
            return 'N/A';
        }
    }

    async getMaxWithdrawal(){
        try{
            return Numbers.fromDecimals(await self.contract.getContract().methods.maxWithdrawal().call(), self.decimals);
        }catch(err){
            return 'N/A';
        }
    }

    async isPaused(){
        try{
            return await self.contract.getContract().methods.paused().call();
        }catch(err){
            return 'N/A';
        }
    }

    async pauseContract(){
        try{
            let accounts = await window.web3.eth.getAccounts();
            return new Promise ( (resolve, reject) => {
                self.contract.getContract().methods.pause().send({from : accounts[0]})
                .on('confirmation', (confirmations, receipt) => {
                    resolve(receipt)
                })
                .on('error', () => {reject("Transaction Error")})
            })
        }catch(err){
            throw err;
        }
    }

    async unpauseContract(){
        try{
            let accounts = await window.web3.eth.getAccounts();
            return new Promise ( (resolve, reject) => {
                self.contract.getContract().methods.unpause().send({from : accounts[0]})
                .on('confirmation', (confirmations, receipt) => {
                    resolve(receipt)
                })
                .on('error', () => {reject("Transaction Error")})
            })
        }catch(err){
            throw err;
        }
    }

    async getWithdrawalTimeLimit(){
        try{
            return Numbers.fromSmartContractTimeToMinutes(await self.contract.getContract().methods.releaseTime().call());
        }catch(err){
            console.log(err)
            return 'N/A';
        }
    }

    async changeMaxDeposit({amount}){
        try{
            let accounts = await window.web3.eth.getAccounts();
            let amountWithDecimals = Numbers.toSmartContractDecimals(amount, self.decimals);
            return new Promise ( (resolve, reject) => {
                self.contract.getContract().methods.changeMaxDeposit(
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


    async changeMaxWithdrawal({amount}){
        try{
            let accounts = await window.web3.eth.getAccounts();
            let amountWithDecimals = Numbers.toSmartContractDecimals(amount, self.decimals);
            return new Promise ( (resolve, reject) => {
                self.contract.getContract().methods.changeMaxWithdrawal(
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

    async changeWithdrawalTimeLimit({amount}){
        try{
            let accounts = await window.web3.eth.getAccounts();
            let SCTime = Numbers.fromMinutesToSmartContracTime(amount);
            return new Promise ( (resolve, reject) => {
                self.contract.getContract().methods.changeReleaseTime(
                    SCTime
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


    /**
     * @Functions
     */

    async deploy(){
        let accounts = await window.web3.eth.getAccounts();

        let params = [
            self.erc20TokenContract.getAddress(),   // Token Contract
            self.authorizedAddress,                 // Authorized Address
            self.ownerAddress                       // Owner Address
        ];

        let res = await self.contract.deploy(
            accounts[0],
            self.contract.getABI(), 
            self.contract.getJSON().bytecode, 
            params);
        self.contract.setAddress(res.contractAddress);
        self.contractAddress = res.contractAddress;
        return res;
    }

    getAddress(){
        return self.contractAddress || self.contract.getAddress();
    }

}



export default CasinoContract;