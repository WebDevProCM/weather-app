const request = require("postman-request");

const forecast = (geocode, callback) =>{
    const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${geocode.latitude}&longitude=${geocode.longitude}&current=temperature_2m,apparent_temperature,is_day,rain,showers,snowfall,weather_code&daily=temperature_2m_min&forecast_days=1`;
    request({url: forecastUrl, json: true}, (error, response)=> {
        if(error){
            callback("Error occured. Unable to connect to the server", undefined);
        }else if(!response.body.current){
            callback("Please enter correct Latitude and longitude", undefined);
        }else{
            const weather = response.body.current;
            const result = {
                location: geocode.location,
                country: geocode.country,
                temperature: weather.temperature_2m,
                feelsLike: weather.apparent_temperature,
                isDay: weather.is_day,
                code: weather.weather_code,
                min: response.body.daily.temperature_2m_min
            }
            callback(undefined, result);
        } 
    });
}

module.exports = forecast;