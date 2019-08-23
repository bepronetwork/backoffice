import Cache from "../../services/cache";

let services = {
    casino : 101,
    crypto : 201
}


function fromServicesToCodes(servicesObject){
    return Object.keys(servicesObject).map( (key, index) => {
        return servicesObject[key] ? services[key] : null;
    }).filter((el) => el != null );
}

function fromCodesToServices(servicesObject){
    return servicesObject.map( (code) => {
        let array =  Object.keys(services).map( (key) => {
            if(code == services[key]){
                return key;
            }
        }).filter((el) => el != null );
        return array[0];
    })
}

function fromBigNumberToInteger(value, decimals=18){
    return value.toNumber() / Math.pow(10, decimals)*1000000000000000000;
}

function setAuthToCookies(params){
    Cache.setToCache('Auth', params);
}

function getAuthFromCookies(){
    return Cache.getFromCache('Auth');
}

export {
    services,
    fromBigNumberToInteger,
    fromServicesToCodes,
    fromCodesToServices,
    setAuthToCookies,
    getAuthFromCookies
}