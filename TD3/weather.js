let requestURL = "https://www.prevision-meteo.ch/services/json/";
const request = new XMLHttpRequest();
let data = null;


function sendMeteoRequest(){
    const cityValue = document.getElementById('inputCity').value;
    if(cityValue == "" || cityValue == null){
        document.getElementById("data").innerHTML = "Please enter a city name";
        return;
    }
    
    request.open('GET', requestURL.concat(cityValue));
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        const jsonObj = request.response;
        const strObj = JSON.stringify(jsonObj);
        data = JSON.parse(strObj);
        document.getElementById('currentInfo').style.display = "block";
        getCityName();
        displayTodayWeather();
    }
}

function getCityName(){
    document.getElementById('cityName').innerHTML = data.city_info.name+", "+data.city_info.country;
    console.log(data);
}

function displayTodayWeather(){
    document.getElementById('todayName').innerHTML = data.current_condition.date
    document.getElementById('hourName').innerHTML = data.current_condition.hour;
    if(document.getElementById('imgWeather').childElementCount == 0){
        const img = document.createElement('img'); 
        img.src =  data.current_condition.icon;
        document.getElementById('imgWeather').appendChild(img); 
    }
    document.getElementById('conditionName').innerHTML = data.current_condition.condition;
    document.getElementById('currentDeg').innerHTML = data.current_condition.tmp;
    document.getElementById('minTmp').innerHTML = "min: "+data.fcst_day_0.tmin+"°";
    document.getElementById('maxTmp').innerHTML = "max: "+data.fcst_day_0.tmax+"°";
    document.getElementById('wind').innerHTML = "Vent: "+data.current_condition.wnd_spd+"km/h";
}
