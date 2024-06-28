const weatherForm=document.querySelector('.weatherForm');
const inputEl=document.querySelector('.input-field');
const card=document.querySelector('.card');
const apiKey="d5aec4253a998351e71b930c93b3f1bb";

weatherForm.addEventListener('submit',async function(event){

    event.preventDefault();
    const city=inputEl.value;
    if(city){
        try {
            const weatherData= await getWeatherData(city);
            displayWeatherInformation(weatherData);
        } 
        catch (error) {
            console.error(error)
        }
    }
    else{
        displayError("Please enter a city");
    }
});

async function getWeatherData(city){

    const apiURL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response=fetch(apiURL);
    if ((await response).ok) {
        return (await response).json();
    }
    else{
        throw new Error("could not find data");
    }
}

function displayWeatherInformation(data){
    const {name:city,main:{temp,humidity},weather:[{description,id}]}=data;

    card.textContent="";
    card.style.display="flex";

    const cityDisplay=document.createElement("h2");
    const tempDisplay=document.createElement("p");
    const humidityDisplay=document.createElement("p");
    const descDisplay=document.createElement("p");
    const idDisplay=document.createElement("p");

    cityDisplay.textContent=city;
    tempDisplay.textContent=`Temp:${temp}`;
    humidityDisplay.textContent=`Humidity:${humidity}%`;
    descDisplay.textContent=description;
    idDisplay.textContent=getWeatherEmoji(id);
    cityDisplay.classList.add("content");
    idDisplay.classList.add("weatherEmoji");
    humidityDisplay.classList.add("content");
    tempDisplay.classList.add("content");
    descDisplay.classList.add("content");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(idDisplay);
}

function getWeatherEmoji(weatherID){
    switch(true){
        case(weatherID >=200 && weatherID <=300):
        return "⛈️";
        case(weatherID >=300 && weatherID <=500):
        return "🌧️";
        case(weatherID >=500 && weatherID <=600):
        return "☔";
        case(weatherID >=600 && weatherID <=700):
        return "❄️";
        case(weatherID >=700 && weatherID <800):
        return "🌫️";
        case (weatherID >=800 && weatherID <=820):
            return "☀️";
        default :
        return "❓";
    }
};


function displayError(message){
    const show=document.createElement("p");
    show.textContent=message;
    show.classList.add("errorDisplay");
    card.textContent="";
    card.style.display="flex";
    card.appendChild(show);
}