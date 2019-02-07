var cookies = require('browser-cookies');

class cache{

    /**
     * @type Authentication
     */
    setToCache = (type, data) => {
        cookies.set(type, JSON.stringify(data), {expires : 365});
    }


    getFromCache = (type) => {
        let result = cookies.get(type);
        return result ? JSON.parse(result) : null;
    }
}

let Cache = new cache();

export default Cache;