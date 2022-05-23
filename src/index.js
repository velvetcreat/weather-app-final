// Current date & time
function formatDate(date) {
	let hour = date.getHours();
	if (hour < 10) {
		hour = `0${hour}`
	}

	let minute = date.getMinutes();
	if (minute < 10) {
		minute = `0${minute}`
	}

	let dayIndex = date.getDay();
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	let day = days[dayIndex];

	let nrDate = date.getDate();

	let months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	let month = months[date.getMonth()];

	let year = date.getFullYear();

	return `${day} ♥ ${month} ${nrDate}&nbsp;&nbsp;${hour}:${minute}`;
}

let currentTime = new Date()
let dateElement = document.querySelector("#current-date");
dateElement.innerHTML = formatDate(currentTime);
//
let form = document.querySelector("#search-city");
form.addEventListener("click", handleSubmit);

searchCity("Los Angeles");

//search engine button & box
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
	celsiusLink.classList.add("active");
	fahrenheitLink.classList.remove("active");
  let showCurrentCity = document.querySelector("#search-city");
	showCurrentCity.addEventListener("submit",searchCity(city));
}
//axios searching... call to API key
function searchCity(city) {
  apiKey = "7a25c6b2ec87adec4dc53604efe82144";
	let units = "metric";
	let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=`;
	apiUrl = `${apiEndpoint}${city}&appid=${apiKey}&units=${units}`;
	axios.get(apiUrl).then(showTemperature);
  
  // Results from search engine for city weather 
}function showTemperature(response) {
  document.querySelector("#current-city").innerHTML = `${response.data.name}`;
	document.querySelector("#current-temp").innerHTML = `${Math.round(
    response.data.main.temp
    )}°`;
    
    let iconElement = document.querySelector("#current-icon");
    iconElement.setAttribute("alt", response.data.weather[0].description);
    iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    
    let humidityTemp = `Humidity: ${Math.round(response.data.main.humidity)}%`;
    document.querySelector("#humidity").innerHTML = humidityTemp;
    
    let windValue = `${Math.round(
      response.data.wind.speed * 0.001 * 3600
      )} km/h`;
      document.querySelector("#wind").innerHTML = windValue;
      
      let sunriseUnix = `${response.data.sys.sunrise}`;
      let sunrise = new Date(sunriseUnix * 1000);
      let sunriseElement = document.querySelector("#sunrise");
      sunriseElement.innerHTML = `${sunrise}`;
      
      let sunsetData = response.data.sys.sunset;
      let sunsetUnix = `${sunsetData}`;
      let sunset = new Date(sunsetUnix * 1000);
      let sunsetElement = document.querySelector("#sunset");
      sunsetElement.innerHTML = `${sunset}`;
      
      celsiusTemperature = response.data.main.temp;
      
      getForecast(response.data.coord);
    }
    // API call for forecast coordinates..
    function getForecast(coordinates) {
      let apiKey = "7a25c6b2ec87adec4dc53604efe82144";
      let apiUrl = `
      https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
      
      axios.get(apiUrl).then(displayForecast);
    }
    // Display forecast
    function displayForecast(response) {
      forecast = response.data.daily;
    
      let forecastElement = document.querySelector("#forecast");
    
      let forecastHTML = `<div class="row row-cols-1 row-weather-forecast">`;
    
      forecast.forEach(function (forecastDay, index) {
        if (index > 0 && index < 8) {
          forecastHTML =
            forecastHTML +
            `
            <div class="col-md">
            <div class="card">
            <div class="card-body">
            <h5 class="card-day">${formatDay(forecastDay.dt)}</h5>
              <p class="card-temperature" id="forecast-max${index}">${Math.round(
              forecastDay.temp.max
            )}°</p>
            <img
            src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
            alt="${forecastDay.weather[0].description}"
                class="forecast-icon"
                />
              <p class="card-temperature" id="forecast-min${index}">${Math.round(
              forecastDay.temp.min
            )}°</p>
              </div>
          </div>
          </div>
      `}
    });
      forecastHTML = forecastHTML + `</div>`;
      forecastElement.innerHTML = forecastHTML;
      if (fahrenheitLink.className === "active") {
        convertForecastTemperature("imperial");
      }
    }
    // Forecast for the week - date structure
    function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  day = date.getDay();
  days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
    // Forecast temperature to match units
    function convertForecastTemperature(unitType) {
      forecast.forEach(function (forecastDay, index) {
        if (index > 0 && index < 8) {
          let tempMin = `${Math.round(forecastDay.temp.min)}°`;
          let tempMax = `${Math.round(forecastDay.temp.max)}°`;
          let min = document.querySelector("#forecast-temp-min" + index);
          let max = document.querySelector("#forecast-temp-max" + index);
          if (unitType === "metric") {
            min.innerHTML = tempMin;
            max.innerHTML = tempMax;
          } else {
            min.innerHTML = `${Math.round(
          (forecastDay.temp.min * 9) / 5 + 32
        )}°`;
        max.innerHTML = `${Math.round(
          (forecastDay.temp.min * 9) / 5 + 32
        )}°`;
      }
    }
  })
}
// Unit conversion
function showCurrentTemperature(response) {
  if (fahrenheitLink.className === "active") {
    temperatureElement.innerHTML = Math.round(
      (celsiusTemperature * 9) / 5 + 32
    );
  } else {
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }
}
// Current location button
function findCurrentLocation(position) {
  let lat = position.coords.latitude;
	let lon = position.coords.longitude;
	apiKey = "7a25c6b2ec87adec4dc53604efe82144";
	units = "metric";
	apiEndpoint = `https://api.openweathermap.org/data/2.5/weather`;
	apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
	axios.get(apiUrl).then(showTemperature);
	axios.get(apiUrlCurrent).then(showCurrentTemperature);
}
function findGeoLocation(event) {
	event.preventDefault();
	navigator.geolocation.getCurrentPosition(findCurrentLocation);
}
let locationButton = document.querySelector("#currentButton");
locationButton.addEventListener("click", findGeoLocation);

// Fahrenheit to Celsius conversion
function displayFahreheitTemperature(event) {
	event.preventDefault();
	celsiusLink.classList.remove("active");
	fahrenheitLink.classList.add("active");
	let temperatureElement = document.querySelector("#current-temp");
	let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
	temperatureElement.innerHTML = `${Math.round(fahrenheitTemperature)}°`;
	convertForecastTemperature("imperial")
}
// Fahrenheit to Celsius conversion
function displayCelsiusTemperature(event) {
	event.preventDefault();
	celsiusLink.classList.add("active");
	fahrenheitLink.classList.remove("active");
	let temperatureElement = document.querySelector("#current-temp");
	temperatureElement.innerHTML = `${Math.round(celsiusTemperature)}°`;
	convertForecastTemperature("metric");
}

let fahrenheitLink = document.querySelector("#fahr-link");
fahrenheitLink.addEventListener("click", displayFahreheitTemperature);

let celsiusTemperature = null;

let celsiusLink = document.querySelector("#cel-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

let forecast = null;
let units = "metric";

displayForecast();
