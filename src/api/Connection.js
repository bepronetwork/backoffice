import config from "./config";

const URL = config.server.production;

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
    
    getSummary = async ({app, type, headers}) => {
        try{
            let response = await fetch(URL+ '/api/app/summary', {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({app, type})
            });
            return response.json();
        }catch(err){
            throw err;
        }
    }

    getDepositReference = async ({currency, entity, headers}) => {
        try{
            let response = await fetch(URL+ '/api/app/deposit/generateReference', {
                method : 'POST',
                headers : addHeaders(config, headers),
                body : JSON.stringify({
                    "entity" : entity,
                    "currency" : currency
                })
            });

            return response.json();
        }catch(err){
            throw err;
        }
    }

    getDepositInfo = async ({id, headers}) => {
        try{
            let response = await fetch(URL+ `/api/deposit/${id}/info`, {
                method : 'POST',
                headers : addHeaders(config, headers),
            });

            return response.json();
        }catch(err){
            throw err;
        }
    }

    createBearerToken = async (app) => {
        try{
            let response = await fetch(URL+ `/api/app/api/createToken`, {
                method : 'POST',
                headers : config.headers,
                body : JSON.stringify(app)
            });
            return response.json();
        }catch(err){
            throw err;
        }
    }

}

function addHeaders(config, newHeaders){
    return {
            ...config.headers,
            ...newHeaders   
    }
}

let ConnectionSingleton = new Connection();


export default ConnectionSingleton;

