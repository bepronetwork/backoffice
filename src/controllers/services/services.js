
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

export {
    services,
    fromServicesToCodes,
    fromCodesToServices
}