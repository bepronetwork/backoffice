import config from "./config";

const URL = config.server.development;

class Connection {

    constructor(){}

    /**
     *  @param
     */

    register = async ({username, password, name, email}) => {
        try{
            let response = await fetch(URL + '/api/admins/register', {
                method : 'POST',
                headers : config.headers,
                body : JSON.stringify({username, hash_password : password, name, email})
            });

            return response.json();
        }catch(err){
            throw err;
        }
    }

    login = async ({username, password}) => {
        try{
            let response = await fetch(URL + '/api/admins/login', {
                method : 'POST',
                headers : config.headers,
                body : JSON.stringify({username, password})
            });
            return response.json();
        }catch(err){
            throw err;
        }
    }

    createApp = async ({name, description, metadataJSON, admin_id, marketType}) => {
        console.log(name, description, metadataJSON, admin_id, marketType)
        try{
            let response = await fetch(URL + '/api/app/create', {
                method : 'POST',
                headers : config.headers,
                body : JSON.stringify({name, description , metadataJSON, admin_id, marketType})
            });
            return response.json();
        }catch(err){
            throw err;
        }
    }
    
    getSummary = async ({app, type}) => {
        try{
            let response = await fetch(URL+ '/api/app/summary', {
                method : 'POST',
                headers : config.headers,
                body : JSON.stringify({app, type})
            });

            return response.json();
        }catch(err){
            throw err;
        }
    }

    getDepositReference = async (currency, entity, entityType) => {
        try{
            let response = await fetch(URL+ '/api/deposit/generateReference', {
                method : 'POST',
                headers : config.headers,
                body : JSON.stringify({
                    "entity" : entity,
                    "entityType" : entityType,
                    "currency" : currency
                })
            });

            return response.json();
        }catch(err){
            throw err;
        }
    }

    getDepositInfo = async (deposit_id) => {
        try{
            let response = await fetch(URL+ `/api/deposit/${deposit_id}/info`, {
                method : 'POST',
                headers : config.headers
            });

            return response.json();
        }catch(err){
            throw err;
        }
    }

}


let ConnectionSingleton = new Connection();


export default ConnectionSingleton;