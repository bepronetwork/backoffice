import Contract from "../../models/Contract";
import CryptographySingleton from "../models/Crypto";

const Contract_Name = 'CasinoProtocolStates';
let leftPad = require('left-pad');


let self;

class CasinoProtocolStates{

    constructor(params){
        self = {
            contract : 
            new Contract(
                params.web3,
                require(`../../models/contracts/${Contract_Name}.json`), 
                null
            ),
            ...params
        }

      
    }

    __assert(contractDeployed){
        self.contract.use(
            require(`../../models/contracts/${Contract_Name}.json`),
            contractDeployed.contractAddress
        );
    }

    /**
     * @constructor Starting Function
     */

    async __init__(){

        let contractDepolyed = await this.deploy();
        await this.sendTokensToCasinoContract();
        await this.authorize(self.account.getAddress());
        
        /*1 - Platform Provides
        let server_seed = CryptographySingleton.generateSeed();
        // 2 - User Provides
        let client_seed = CryptographySingleton.generateSeed();
        // 3 - Platform Signs on Ethereum Blockchain
        let output = CryptographySingleton.generateRandomResult(server_seed, client_seed);
        // 4 - Defined on the smart-contract
        let finalResult = CryptographySingleton.hexToInt(output) // server_seed, client_seed and nonce;
        */
        // Start Contract use
        this.__assert(contractDepolyed);
        // Set Params
        let params = {nonce : 45672234, category : 1, winBalance : 100};
        // Get Signature
        let {signature, nonce,  category} = this.getUserSignature(params);

        console.log("\nSignature S : " + signature.s)
        console.log("\nSignature V : " + signature.v)
        console.log("\nSignature R : " + signature.r)

        console.log("\nNonce : " + nonce)
        console.log("\nCategory : " + category)

        console.log(params.winBalance);
        // Determine the Player
        await this.updateState(
            signature,
            nonce,
            category,
            params.winBalance,
            false
        ); 
    }

    sendTokensToCasinoContract = async () => {
        try{
            let data = await self.erc20TokenContract.getContract().methods.transfer(
                self.contractAddress,
                100000000
                ).encodeABI();
            return await self.erc20TokenContract.getABI().send(self.account.getAccount(), data);
          
        }catch(err){
            console.log(err);
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
        console.log("\n Contract Address is : " + res.contractAddress)
        return res;
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

    getUserSignature({nonce, category}){
                   
        let message =  self.web3.utils.soliditySha3(
            {type: 'uint128', value: nonce},
            {type: 'uint8', value: category}
        );
        
        console.log("\n Nonce : "+ nonce);
        console.log("\n Pk : "+ self.clientAccount.getPrivateKey());
        console.log("\n Category : "+ category);
        let response = self.clientAccount.getAccount().sign(message, self.clientAccount.getPrivateKey());

        return {
            signature : response,
            nonce,
            category,
            address : self.clientAccount.getAddress()
        };
    }
    
    async determinePlayer(signedMessageObject, nonce){
        try{
            let res = await self.contract.getContract().methods.determinePlayer(
                nonce,
                signedMessageObject.v,
                signedMessageObject.r,
                signedMessageObject.s
                ).call({
                    from : self.account.getAddress()
                });
            console.log(res)
        }catch(err){
            console.log(err);
        }   
    }

    async authorize(addr){
        try{
            let data = await self.contract.getContract().methods.authorize(
                addr
            ).encodeABI();
            return await self.contract.send(self.account.getAccount(), data);
        }catch(err){
            console.log(err);
        }   
		authorized[addr] = true;
	}

    async updateState(signedMessageObject, nonce, category, winBalance, chargeGas){
        try{
            let data = await self.contract.getContract().methods.updateState(
                winBalance,
                nonce,
                category,
                signedMessageObject.v,
                signedMessageObject.r,
                signedMessageObject.s,
                chargeGas
            ).encodeABI();
            let res = await self.contract.send(self.account.getAccount(), data);      
        }catch(err){
            console.log(err);
        }   
    }
}



export default CasinoProtocolStates;