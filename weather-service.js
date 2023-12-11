
const weatherWidget = document.getElementById("weather");
const weatherWidgetBig = document.getElementById("weatherWidget");

let errorMsg = document.getElementById("weatherErrorMsg");
if (errorMsg) {
    errorMsg.style.display = "none";
}


async function fetchWeatherData() {
    console.log("first-check");
    const apiUrl = 'https://api.weather.gov/gridpoints/SGX/54,20/forecast/hourly?units=us';

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Extract relevant information from the API response
        const weatherData = data.properties.periods[0];

        // Create HTML elements to display temperature, conditions, and icon
        const temperatureElement = document.createElement('p');
        temperatureElement.textContent = `Temperature: ${weatherData.temperature} °F`;

        const conditionsElement = document.createElement('p');
        conditionsElement.textContent = `Conditions: ${weatherData.shortForecast}`;

        const rainElement = document.createElement('p');
        rainElement.textContent = `Chance of Rain: ${weatherData.probabilityOfPrecipitation.value} %`;
        

        const imgElement = document.createElement('img');
        if (weatherData.shortForecast === "Sunny") {
            imgElement.src = 'media/sun.svg';
        }
        else if (weatherData.shortForecast === "Clear") {
            imgElement.src = 'media/moon.svg';
        }
        else if (weatherData.shortForecast === "Cloudy" || weatherData.shortForecast === "Mostly Cloudy") {
            imgElement.src = 'media/cloud.svg';
        }
        else if (weatherData.shortForecast.includes("Sunny")) {
            imgElement.src = 'media/cloud-sun.svg';
        } 
        else  if (weatherData.shortForecast.includes("Cloudy")) {
            imgElement.src = 'media/cloud-moon.svg';
        } else {
            imgElement.src = 'media/cloud.svg';
        }

        imgElement.alt = 'weather icon';
        imgElement.height = 80;
        imgElement.width = 80;

        // Clear existing content and append the new elements
        weatherWidget.innerHTML = '';
        weatherWidgetBig.appendChild(imgElement);
        weatherWidget.appendChild(temperatureElement);
        weatherWidget.appendChild(conditionsElement);
        weatherWidget.appendChild(rainElement);
        

    } catch (error) {
      console.error('Error fetching weather data:', error);

      
    }
  }

  // Function to update the weather widget with the provided weather data
  function updateWeatherWidget(weatherData) {
    console.log("second-check");
    
  }

  // Fetch weather data when the page loads
  window.addEventListener("load", (event) => {
    console.log("basic");
    fetchWeatherData()
  });