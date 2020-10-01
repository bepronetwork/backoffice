export const actions = Object.freeze({
    SET_SERIES_DATA: "SET_SERIES_DATA"
})

const extractSeriesFromVideogames = data => {
    let series = {};

    data.forEach(videogame => {
        series[videogame._id] = videogame.series.map(serie => serie.id);
    });

    return series;
}

export function setSeriesData(data) {
    return {
        type: actions.SET_SERIES_DATA,
        payload: extractSeriesFromVideogames(data)
    }
}