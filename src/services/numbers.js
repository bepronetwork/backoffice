import moment from 'moment';
import accounting from 'accounting';

Number.prototype.noExponents= function(){
    var data= String(this).split(/[eE]/);
    if(data.length== 1) return data[0]; 

    var  z= '', sign= this<0? '-':'',
    str= data[0].replace('.', ''),
    mag= Number(data[1])+ 1;

    if(mag<0){
        z= sign + '0.';
        while(mag++) z += '0';
        return z + str.replace(/^\-/,'');
    }
    mag -= str.length;  
    while(mag--) z += '0';
    return str + z;
}

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

    toSmartContractDecimals(value, decimals){
        let numberWithNoExponents = new Number(value*10**decimals).noExponents();
        return numberWithNoExponents;
    }

}


let Numbers = new numbers();

export default Numbers;