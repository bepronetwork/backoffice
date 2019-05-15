
const bcrypt = require('bcrypt-nodejs');
const SALT_ROUNDS = bcrypt.genSaltSync(10);

class Security {

    constructor(password){
        this.state = {
            password : password
        }
    }

    hash(){
        //Hash Password
        try{
            return this.hashPassword(this.state.password);
        }catch(error){
            throw error; 
        } 
    }

    hashPassword = (password) => {
        try{
            return bcrypt.hashSync(password, SALT_ROUNDS);
        }catch(error){
            throw error;
        }
        
    }

    unhashPassword(password, hashPassword){
          // Verifying a hash 
        try{
            return bcrypt.compareSync(password, hashPassword);
        }catch(error){
            throw error;
        }
      
    }
}

export default Security;