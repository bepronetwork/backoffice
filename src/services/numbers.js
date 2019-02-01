import moment from 'moment';
import accounting from 'accounting';

class numbers{
    constructor() {
    }

    fromDayMonthYear(date){
        let mom = moment().dayOfYear(date.day);
        mom.set("hour", date.hour);
        mom.set("year", date.year);
        return mom.format("ddd, hA"); 
    }
    
    toFloat(number){
        return parseFloat(parseFloat(number).toFixed(2))
    }

    toDate(date){
        let mom = moment().dayOfYear(date.day);
        mom.set("hour", date.hour);
        mom.set("year", date.year);
        return mom.unix();
    }

    toMoney(number){
        return accounting.formatMoney(number, { symbol: "EUR",  format: "%v" }); 
    }

    formatNumber(number){
        return accounting.formatNumber(number);
    }
}



let Numbers = new numbers();

export default Numbers;