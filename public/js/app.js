const form = document.querySelector("form");
let userSearch = document.querySelector("#user-location");
let message1 = document.querySelector(".js-message-1");
let message2 = document.querySelector(".js-message-2");
let weatherIcon = document.querySelector(".js-weather-icon");
let weatherDegree = document.querySelector(".js-degree");
let feelsLike = document.querySelector(".js-feelsLike-message");
let condition = document.querySelector(".js-condition");
let minTemp = document.querySelector(".js-min-temp");
let maxTemp = document.querySelector(".js-max-temp");
import { weatherCode } from "./utilis/weatherCode.js";


form.addEventListener("submit", (e) =>{
    e.preventDefault();

    let location = userSearch.value;

    message1.classList.remove("error-message");
    message1.textContent = "Loading......";
    message2.textContent = "";

    if(!location){
        message1.classList.add("error-message");
        message1.textContent = "Please provide a location!";
    }else{
        fetch(`http://localhost:3000/weather?location=${location}`).then((response)=>{
            response.json().then((data) =>{
                if(data.error){
                    message1.classList.add("error-message");
                    message1.textContent = "Please provide a location!";
                }else{
                    message1.textContent = data.location;
                    message2.textContent = data.country;

                    weatherIcon.setAttribute("src", `./images/${weatherCode(data.code)}.png`);
                    condition.textContent = weatherCode(data.code);

                    weatherDegree.innerHTML = `${data.temperature}<span>&deg</span>`;
                    feelsLike.innerHTML = `It feelsLike ${data.feelsLike}<span>&deg</span>`;

                    minTemp.innerHTML = `${data.min}<span>&deg</span>`;
                    maxTemp.innerHTML = `${data.temperature}<span>&deg</span>`;
                }
            })
        });

    }

});

