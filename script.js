const weatherFrom = document.querySelector('.weatherForm');
const cityInput = document.querySelector('.cityInput');
const card = document.querySelector('.card');
const apiKey = "0066438db1c17ff78b293f577361cbb5";


weatherFrom.addEventListener('submit', async event =>{

    event.preventDefault();
    const city = cityInput.value;
    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);

        }catch(error){
            console.error(error);
            displayError(error)
        }
    }
    else {
        displayError('Please enter a valid city');
    }
})


async function getWeatherData(city){
        const urlApi = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        const response = await fetch(urlApi);
        // console.log(response);

        if(!response.ok){
            throw Error('Cloud not fetch weather data');
        }
        else {
            return response.json();
        }
}


function displayWeatherInfo(data){

    const {
        name: city,
        main : {temp , humidity},
        weather : [{description, id}]
    } = data;

    // console.log(data.weather[0].id);

    card.textContent= '';
    card.style.display= 'flex';

    const cityDsiplay = document.createElement('h1');
    const tempDsiplay = document.createElement('p');
    const humidityDsiplay = document.createElement('p');
    const descDisplay = document.createElement('p');
    const weatherEmoji = document.createElement('p');

    cityDsiplay.textContent = city;
    tempDsiplay.textContent = `${(temp - 273.15) .toFixed(2)}°C`;
    humidityDsiplay.textContent = `Humidity: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);


    cityDsiplay.classList.add('cityDisplay');
    tempDsiplay.classList.add('tempDisplay');
    humidityDsiplay.classList.add('humidityDisplay');
    descDisplay.classList.add('descDisplay');
    weatherEmoji.classList.add("weatherEmoji");

    card.appendChild(cityDsiplay);
    card.appendChild(tempDsiplay);
    card.appendChild(humidityDsiplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
}

function getWeatherEmoji(weatherId) {

    // console.log(weatherId)
    switch(true) {
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case (weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case (weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case (weatherId >= 600 && weatherId < 700):
            return "❄️";
        case (weatherId >= 700 && weatherId < 800):
            return "🌬️";
        case (weatherId === 800):
            return "☀️️";
        case (weatherId >= 801 && weatherId < 810):
            return "☁️";
        default : ''
    }
}

function displayError(message) {
    const errorDisplay = document.createElement('p');
    errorDisplay.textContent = message;
    errorDisplay.classList.add('errorDisplay');

    card.textContent='';
    card.style.display = 'flex';
    card.appendChild(errorDisplay)
}
