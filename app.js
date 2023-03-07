const { response } = require("express");
const express = require("express");
const app = express();
const port = 3000;
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post("/", (req, res) => {

    const query = req.body.cityName
    const key = "0578f388a3db3926b18cc2381b504c9c"
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + key + "&units=" + units;

    https.get(url, (response) => [
        response.on("data", (data) => {
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius</h1>");
            res.write("The weather is currently " + weatherDescription);
            res.write("<img src=" + imageURL + ">")
            res.send()
        })
    ]);
})

app.listen(port, () => {
    console.log("Server is running on the port 3000.");
})


