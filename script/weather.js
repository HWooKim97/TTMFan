const weather = document.querySelector(".js-weather");

const API_KEY = "2a4ee2a66222fa259fed4d6e77ebf48f";

function getWeather(lat, lng){
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response){
      return response.json();
    })
      .then(function(json){
        const temp = json.main.temp;
        const city = json.name;
        const wth = json.weather[0].main;
        weather.innerText = `${wth}°C, ${temp} @ ${city}`;
      })
}

function handleSucces(position){
  const locationObj = {
    lat : position.coords.latitude,
    lng : position.coords.longitude
  }
  getWeather(locationObj.lat, locationObj.lng);
  localStorage.setItem("local", JSON.stringify(locationObj));
}

function handleError(){
  weather.innerText = `Failed to verify location`;
}

function getLocation(){
  navigator.geolocation.getCurrentPosition(handleSucces, handleError);
}

function init(){
  getLocation();
}

init();