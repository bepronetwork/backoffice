import Numbers from "../numbers";

function date(a,b) {
    if (a.timestamp < b.timestamp)
      return -1;
    if (a.timestamp > b.timestamp)
      return 1;
    return 0;
}


const colors = ['#894798','#70bbfd', '#f6da6e', '#ff4861','#ff3861','#e14861']

class DashboardMapper{

    constructor(){}
  
    toRevenueChart = (data) => {
        return Object.keys(data).map( (key) => {
            // Each Item is date based
            return {
                name : Numbers.fromDayMonthYear(data[key].date),
                a : Numbers.toFloat(data[key].financials.revenue),
                b : Numbers.toFloat(data[key].financials.loss),
                c : Numbers.toFloat(data[key].financials.totalProfit),
                timestamp : Numbers.toDate(data[key].date)
            }
        }).sort(date);
    }

    toPieChart = (data) => {
        return Object.keys(data).map( (key, index) => {
            // Each Item is date based
            return {
                name : data[key].name,
                value : Numbers.toFloat(data[key].betsAmount),
                fill : colors[index]
            }
        })
    }

    toDateProfit = (data) => {
        return Object.keys(data).reduce( (acc, key) => {
            // Each Item is date based
            return Numbers.toFloat(acc+data[key].financials.totalProfit)
        }, 0);
    }

    toDateRevenue = (data) => {
        return Object.keys(data).reduce( (acc, key) => {
            // Each Item is date based
            return Numbers.toFloat(acc+data[key].financials.revenue)
        }, 0);
    }


}

let DashboardMapperSingleton = new DashboardMapper();

export default DashboardMapperSingleton;