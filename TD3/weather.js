let requestURL = "https://www.prevision-meteo.ch/services/json/";
const request = new XMLHttpRequest();
let data = null;


function sendMeteoRequest(){
    const cityValue = document.getElementById('inputCity').value;
    if(cityValue == "" || cityValue == null){
        console.log("ok");
        console.log(cityValue);
        document.getElementById("cityName").innerHTML = "Please enter a city name";
        return;
    }
    console.log(cityValue);
    request.open('GET', requestURL.concat(cityValue));
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        const jsonObj = request.response;
        const strObj = JSON.stringify(jsonObj);
        data = JSON.parse(strObj);
        document.getElementById('data').style.display = "block";
        getCityName();
        displayTodayWeather();
    }
}

function getCityName(){
    document.getElementById('cityName').innerHTML = data.city_info.name+", "+data.city_info.country;
    console.log(data);
}

function getWindDirection(){
    const dir = data.current_condition.wnd_dir;
    let fullDir = "";
    switch(dir){
        case 'N':
            fullDir = "Nord";
            break;
        case 'E':
            fullDir = "Est"
            break;
        case 'O':
            fullDir = "Ouest";
            break;
        case 'S':
            fullDir = "Sud";
            break;
        case 'NE':
            fullDir = "Nord-Est";
            break;
        case 'NO':
            fullDir = "Nord-Ouest";
            break;
        case 'SE':
            fullDir = "Sud-Est";
            break;
        case 'SO':
            fullDir = "Sud-Ouest";
            break;
        default:
            fullDir = "Inconnu";
    }
    document.getElementById('windDir').innerHTML = "direction: "+fullDir;
    
}

function displayTodayWeather(){
    document.getElementById('todayName').innerHTML = data.current_condition.date
    document.getElementById('hourName').innerHTML = data.current_condition.hour;
    if(document.getElementById('imgWeather').childElementCount == 0){
        const img = document.createElement('img'); 
        img.src =  data.current_condition.icon_big;
        document.getElementById('imgWeather').appendChild(img); 
    }
    document.getElementById('conditionName').innerHTML = data.current_condition.condition;
    document.getElementById('currentDeg').innerHTML = data.current_condition.tmp;
    document.getElementById('minTmp').innerHTML = "min: "+data.fcst_day_0.tmin+"°";
    document.getElementById('maxTmp').innerHTML = "max: "+data.fcst_day_0.tmax+"°";
    document.getElementById('wind').innerHTML = "vent: "+data.current_condition.wnd_spd+"km/h";
    getWindDirection();
}
