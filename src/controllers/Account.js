import ConnectionSingleton from "../api/Connection";
import store from "../containers/App/store";
import { setProfileInfo } from "../redux/actions/profile";
import App from "./App";
import Timer from 'tiny-timer';

let timer = new Timer()

class Account{    
    constructor(params){
        this.params = params;
        this.date = null;
    }

    login = async () => {
        try{
            let response = await ConnectionSingleton.login({
                username : this.params.username, 
                password : this.params.password
            });

            let {
                message : data,
                status
            } = response.data;


            if(status == 200){
                /* SET Profile Data */
                this.setProfileData(data);
                /* SET APP */
                this.setApp(data.apps[0]);
                /* GET APP Stats */
                await this.getData();
                // Set Timer
                this.setTimer();
                // TO DO : Create an Initial Screen to choose between Apps or a top Dropdown for it
                return response;
            }else{
                throw new Error('Login didn´t work')
            }
        }catch(err){
            console.log(err)
            // TO DO
            throw err;
		}
    
    }



    getData = async () => {
        await this.getAppStatistics();
        /* Add Everything to the Redux State */  
        await store.dispatch(setProfileInfo(this));

    }
    

    setProfileData = (data) => {
        this.User = data;
    }

    getProfileData = () => {
        return this.data;
    }

    setApp = (app) => {
        this.App = new App(app);
    }

    getApp = () => {
        return this.App;
    }

    getAppStatistics = async () => {
       return await this.App.getSummary();
    }

    getUsername = () => {
        return this.User.name;
    }

    setTimer = () => {
        window.setInterval(
            () => {
            this.getData();
          }, 2000);
    }
}

export default Account;