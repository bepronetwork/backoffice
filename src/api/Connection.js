import config from "./config";

const URL = config.server.production;

class Connection {

    constructor(){}

    /**
     *  @param
     */

    login = async ({username, password}) => {
        try{
            let response = await fetch(URL + '/api/users/login', {
                method : 'POST',
                headers : config.headers,
                body : JSON.stringify({username, password})
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

}


let ConnectionSingleton = new Connection();


export default ConnectionSingleton;