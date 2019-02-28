import ConnectionSingleton from "../api/Connection";
import store from "../containers/App/store";
import { setProfileInfo } from "../redux/actions/profile";

class App{    
    constructor(params){
        this.params = params;
        this.data = {
            
        };

    }

    getSummary = async () => {
        try{
            let res = await Promise.all([
                ConnectionSingleton.getSummary({
                    app : this.params.id,
                    type : 'USERS'
                }),
                ConnectionSingleton.getSummary({
                    app : this.params.id,
                    type : 'GAMES'
                }),
                ConnectionSingleton.getSummary({
                    app : this.params.id,
                    type : 'BETS'
                }),
                ConnectionSingleton.getSummary({
                    app : this.params.id,
                    type : 'REVENUE'
                }),
                ConnectionSingleton.getSummary({
                    app : this.params.id,
                    type : 'WALLET'
                })
            ])
            console.log(res)

            this.data = {
                ...this.data,
                summary : {
                    users   : res[0].data.message,
                    games   : res[1].data.message,
                    bets    : res[2].data.message,
                    revenue : res[3].data.message,
                    wallet  : res[4].data.message[0]
                }
            };

            return res;
        }catch(err){
            throw err;
		}
    }

    getName(){
        return this.params.name;
    }

    getDescription(){
        return this.params.description;
    }

    getId(){
        return this.id;
    }

    getSummaryData(type){
        return {
            data :  this.data.summary[type],
            type : type
        }
    }



}

export default App;