class contract{

    constructor(params){
        this.web3 = params.web3;
        this.abi = params.contract.abi;
        this.address = params.address;
        this.json = params.contract;
        this.contract = new params.web3.eth.Contract(params.contract.abi, params.address)
    }

    async deploy(address, abi, byteCode, args=[]){
        
        this.contract = new this.web3.eth.Contract(abi);
        let transaction = await new Promise ( (resolve, reject) => {
            this.contract.deploy({
                data : byteCode,
                arguments: args
            }).send({
                from: address,
                gasPrice : 20000000000,
                gas : 4000000
            })
            .on('receipt', (receipt) => {
                resolve(receipt)
             })
            .on('error', () => {reject("Transaction Error")})
        })
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
            gasPrice : 20000000000,
            gas : 4000000,
            value: value ? value : '0x0'
        }

        let result = await account.signTransaction(tx);
        let transaction = await window.web3.eth.sendSignedTransaction(result.rawTransaction);
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

    setAddress(address){
        this.address = address;
    }

    getAddress(){
        return this.address;
    }
}


export default contract;