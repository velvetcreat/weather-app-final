//Current time function
let now = new Date();
function formatDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    " Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[date.getMonth()];
  return `${month} ${day}, ${hours}:${minutes}`;
}
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(now);
//weather forecast
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri"];
  days.forEach(function (day) {});

  forecastHTML =
    forecastHTML +
    `<div class="col-2">
<div class="forecast-date">
${days}
<img src="#" alt="" width="54"/>
<div class="forecast-temp">
<span class="forecast-temp-max">70°F </span>
<span class="forecast-temp-min">55°F</span>
</div>
</div>
</div>`;
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

//                    search engine function
//               Search button activation from form
let showCurrentCity = document.querySelector("#search-city");
showCurrentCity.addEventListener("submit", showCity);
//              connecting axios & Open Weather API &&
//               New search updating HTML city
function showCity(event) {
  event.preventDefault();
  let currentCity = document.querySelector("#city-input").value;
  let place = document.querySelector("#current-city");
  place.innerHTML = `${currentCity}`;
  let apiKey = "7a25c6b2ec87adec4dc53604efe82144";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentTemp);
}
//      Update HTML temperature with current temperature from search
function showCurrentTemp(response) {
  let cityTemp = Math.round(response.data.main.temp);
  let degrees = document.querySelector("#current-temp");
  degrees.innerHTML = `${cityTemp}`;

  let cityDescription = response.data.weather[0].description;
  let description = document.querySelector(".description");
  description.innerHTML = `Current weather outlook: ${cityDescription}`;

  let humidityTemp = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${humidityTemp}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${windSpeed}km/h`;

  let iconElement = document.querySelector("#current-icon");
  iconElement.setAttribute("alt", response.data.weather[0].description);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  celsiusTemperature = response.data.main.temp;
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
//                  units C | F
//                 imperial  unit function
function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  //    remove the class from the celsius link to set F
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrTemp);
}
//                    metric unit function
function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  //    remove the class from the fahrenheit link to set C
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
//            global variable of units C & F
let celsiusTemperature = null;
let celsiusLink = document.querySelector("#cel-link");
celsiusLink.addEventListener("click", convertToCelsius);

let fahrenheitLink = document.querySelector("#fahr-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);
//          Current location button & temperature
//              1.Current trigger button
let currentButton = document.querySelector(".currentButton");
currentButton.addEventListener("click", retrievePosition);
//                 2.Using navigator geolocater
function retrievePosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}
//                3. Gathering API data
function currentPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "7a25c6b2ec87adec4dc53604efe82144";
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiUrl = `${apiEndPoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showAreaTemp);
}
//              4. updating the Temperature HTML
function showAreaTemp(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let temperature = document.querySelector("#current-temp");
  temperature.innerHTML = `${currentTemp}`;

  let currentCity = response.data.name;
  let place = document.querySelector("#current-city");
  place.innerHTML = currentCity;

  let currentDescription = response.data.weather[0].main;
  let description = document.querySelector(".description");
  description.innerHTML = `Current weather outlook: ${currentDescription}`;

  let humidityTemp = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `Humidity: ${humidityTemp}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `Wind: ${windSpeed}km/h`;

  let iconElement = document.querySelector("#current-icon");
  iconElement.setAttribute("alt", response.data.weather[0].description);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  celsiusTemperature = response.data.main.temp;
  let temperatureElement = document.querySelector("#current-temp");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);

  let fahrTemp = (celsiusTemperature * 9) / 5 + 32;

  temperatureElement.innerHTML = Math.round(fahrTemp);

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

displayForecast();
