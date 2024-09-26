document.addEventListener("DOMContentLoaded", () => {
const apikey = "6387c0f728d45a1a2d1f2959cef25678";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

let cityElement = document.querySelector("#div-2-3");
let temperature = document.querySelector("#div-2-2");
let windspeed = document.querySelector("#windspeed");
let humidity = document.querySelector("#humidity");
let pressure = document.querySelector("#pressure");
let searchButton = document.querySelector("#div-1-2");
let inputBox = document.querySelector("#div-1-1");
let weathericon = document.querySelector("#div-2-1 img");

async function checkWeather(city) {
    try {
        const response = await fetch(apiurl + city + `&appid=${apikey}`);
        if (!response.ok) {
            throw new Error("City not found");
        }
        const data = await response.json();

        cityElement.textContent = data.name;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        windspeed.textContent = `${data.wind.speed} km/h`;
        humidity.textContent = `${data.main.humidity}%`;
        let pressureatm = data.main.pressure / 1013.25;
        pressure.textContent = `${pressureatm.toFixed(2)} atm`;

        let val = data.weather[0].main;
        weathericon.src = '/static/imagesicon/clouds.png';  // Default icon

        if (val === 'Clouds') {
            weathericon.src = "/static/imagesicon/clouds.png";
            document.body.style.backgroundImage = "url('/static/backgroundimages/cloudsback.jpg')";
        } else if (val === 'Rain') {
            weathericon.src = '/static/imagesicon/rain.png';
            document.body.style.backgroundImage = "url('/static/backgroundimages/rainback.jpg')";
        } else if (val === 'Drizzle') {
            weathericon.src = '/static/imagesicon/drizzle.png';
            document.body.style.backgroundImage = "url('/static/backgroundimages/drizzleback.jpg')";
        } else if (val === 'Mist') {
            weathericon.src = '/static/imagesicon/mist.png';
            document.body.style.backgroundImage = "url('/static/backgroundimages/mistback.jpg')";
        } else if (val === 'Snow') {
            weathericon.src = '/static/imagesicon/snow.png'; 
            document.body.style.backgroundImage = "url('/static/backgroundimages/snowback.jpg')";
        } else {
            weathericon.src = '/static/imagesicon/clear.png';
            document.body.style.backgroundImage = "url('/static/backgroundimages/clearback.jpg')";
        }

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("City not found. Please enter a valid city name.");
    }
}

searchButton.addEventListener("click", () => {
    checkWeather(inputBox.value);
});

// Default city to Jaunpur
checkWeather("Jaunpur");
});