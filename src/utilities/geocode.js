const request = require("postman-request");

const geocode = (location, callback) =>{
    let geocodeUrl= `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`;

    request({url:geocodeUrl, json: true}, (error, response) =>{
        if(error){
            callback("Invalid URL or Unable to connect to server", undefined);
        }else if(!response.body.results || response.body.error){
            callback("Invalid location. Please provide a correct location", undefined);
        }else{

            const result = {
                latitude: response.body.results[0].latitude,
                longitude: response.body.results[0].longitude,
                location: response.body.results[0].name,
                country: response.body.results[0].country,
            }

            callback(undefined, result);
        }
    });
}

module.exports = geocode;