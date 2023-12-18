class WeatherWidget extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        // Create elements inside the shadow root.
        this.h2 = document.createElement('h2');
        this.h2.textContent = 'Current Weather';
        this.shadowRoot.appendChild(this.h2);

        this.weatherWidgetDiv = document.createElement('div');
        this.weatherWidgetDiv.id = 'weatherWidget';
        this.shadowRoot.appendChild(this.weatherWidgetDiv);

        this.weatherDiv = document.createElement('div');
        this.weatherDiv.id = 'weather';
        this.weatherWidgetDiv.appendChild(this.weatherDiv);

        this.weatherErrorMsg = document.createElement('p');
        this.weatherErrorMsg.id = 'weatherErrorMsg';
        this.weatherErrorMsg.textContent = 'Current Weather Conditions Unavailable';
        this.weatherDiv.appendChild(this.weatherErrorMsg);

        const linkElem = document.createElement('link');
        linkElem.setAttribute('rel', 'stylesheet');
        linkElem.setAttribute('href', 'styles.css');

        this.shadowRoot.appendChild(linkElem);
    }

    // Function to update the weather widget with the provided weather data
    updateWeatherWidget(weatherData) {
        console.log("second-check");
        // Your logic to update the weather widget with the provided data
        // For simplicity, I'm calling fetchWeatherData here, but you might want to modify it based on your needs.
        this.fetchWeatherData();
    }

    // Async function to fetch weather data
    async fetchWeatherData() {
        console.log("first-check");
        const apiUrl = 'https://api.weather.gov/gridpoints/SGX/54,20/forecast/hourly?units=us';

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            // Extract relevant information from the API response
            const weatherData = data.properties.periods[0];

            // Create HTML elements to display temperature, conditions, and icon
            const temperatureElement = document.createElement('p');
            const temperatureLabel = document.createElement('b');
            temperatureLabel.textContent = 'Temperature:';
            temperatureElement.appendChild(temperatureLabel);
            temperatureElement.appendChild(document.createTextNode(` ${weatherData.temperature} °F`));

            const conditionsElement = document.createElement('p');
            const conditionsLabel = document.createElement('b');
            conditionsLabel.textContent = 'Conditions:';
            conditionsElement.appendChild(conditionsLabel);
            conditionsElement.appendChild(document.createTextNode(` ${weatherData.shortForecast}`));

            const rainElement = document.createElement('p');
            const rainLabel = document.createElement('b');
            rainLabel.textContent = 'Chance of Rain:';
            rainElement.appendChild(rainLabel);
            rainElement.appendChild(document.createTextNode(` ${weatherData.probabilityOfPrecipitation.value} %`));

            const imgElement = document.createElement('img');
            if (weatherData.shortForecast === "Sunny") {
                imgElement.src = 'media/sun.svg';
            } else if (weatherData.shortForecast === "Clear") {
                imgElement.src = 'media/moon.svg';
            } else if (weatherData.shortForecast === "Cloudy" || weatherData.shortForecast === "Mostly Cloudy") {
                imgElement.src = 'media/cloud.svg';
            } else if (weatherData.shortForecast.includes("Sunny")) {
                imgElement.src = 'media/cloud-sun.svg';
            } else if (weatherData.shortForecast.includes("Cloudy")) {
                imgElement.src = 'media/cloud-moon.svg';
            } else {
                imgElement.src = 'media/cloud.svg';
            }

            imgElement.alt = 'weather icon';
            imgElement.height = 80;
            imgElement.width = 80;

            // Clear existing content and append the new elements
            this.weatherDiv.innerHTML = '';
            this.weatherWidgetDiv.appendChild(imgElement);
            this.weatherDiv.appendChild(temperatureElement);
            this.weatherDiv.appendChild(conditionsElement);
            this.weatherDiv.appendChild(rainElement);

        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    // Fetch weather data when the component is attached to the DOM
    connectedCallback() {
        console.log("basic");
        this.fetchWeatherData();
    }
}

// Define the custom element
customElements.define('weather-widget', WeatherWidget);
