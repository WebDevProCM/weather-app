const path = require("path");

const express = require("express");
const hbs = require("hbs")

const geocode = require("./utilities/geocode.js");
const forecast = require("./utilities/forecast.js");

const app = express();

const staticFiles = path.join(__dirname, "../public");
app.use(express.static(staticFiles));

const partialsDirectory = path.join(__dirname, "../views/partials");
app.set("view engine", "hbs");
hbs.registerPartials(partialsDirectory);

app.get("/", (req, res) =>{
    res.render("index.hbs")
});

app.get("/weather", (req, res) =>{
    if(!req.query.location){
        return res.send({
            error: "Please provide a location"
        })
    }

    geocode(req.query.location, (error, response) =>{
        if(error){
            return res.send({
                error: error
            });
        }

        forecast(response, (error, response)=>{
            if(error){
                return res.send({
                    error: error
                });
            }

            res.send({
                location: response.location,
                country: response.country,
                temperature: response.temperature,
                feelsLike: response.feelsLike,
                isDay: response.isDay,
                code: response.code,
                min: response.min
            });
        });
    });
});

app.get("/about", (req, res) =>{
    res.render("about.hbs")
});

app.listen(3000, () =>{
    console.log("server running")
});



