let requestURL = "https://www.prevision-meteo.ch/services/json/";
const request = new XMLHttpRequest();
let data = null;


// Send the request to API
function sendData(requestData){
    reduiceMap();
    request.open('GET', requestURL.concat(requestData));
    request.responseType = 'json';
    request.send();

    request.onload = function() {
        const jsonObj = request.response;
        const strObj = JSON.stringify(jsonObj);
        data = JSON.parse(strObj);

        if(savedMarker != null){
            setMapOnAll(null);
        }
        var myLatLng = {lat: parseFloat(data.city_info.latitude), lng: parseFloat(data.city_info.longitude)};
        let newMarker = new google.maps.Marker({
            position: myLatLng,
            map: map,
        });
        savedMarker = newMarker;
        newMarker.setMap(map);


        document.getElementById('data').style.display = "block";
        getCityName();
        displayTodayWeather();
        displayWeekWeather();
    }
}

// Reduice the map size
function reduiceMap(){
    document.getElementById('mapDiv').className = "col-md-6";
}

// Check input and send data to request function
function sendMeteoRequest(){
    const cityValue = document.getElementById('inputCity').value;
    if(cityValue == "" || cityValue == null){
        document.getElementById("cityName").innerHTML = "Please enter a city name";
        return;
    }
    sendData(cityValue);
    
}

// Get the city name and display it
function getCityName(){
    document.getElementById('cityName').innerHTML = data.city_info.name+", "+data.city_info.country;
    console.log(data);
}

// Get wind direction and display long name
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

// Get the weather of a day and display it
function getDayWeather(numDay, jsonField){
    const dayName    = "dayName_"+numDay;
    const dateName   = "dateName_"+numDay;
    const imgWeather = "imgWeather_"+numDay;
    const minMaxTmp  = "minMaxTmp_"+numDay;

    document.getElementById(dayName).innerHTML   = jsonField.day_long;
    document.getElementById(dateName).innerHTML  = jsonField.date;
    document.getElementById(minMaxTmp).innerHTML = jsonField.tmin+"° - "+jsonField.tmax+"°";

    if(document.getElementById(imgWeather).childElementCount == 0){
        const img = document.createElement('img'); 
        img.src   = jsonField.icon;
        document.getElementById(imgWeather).appendChild(img); 
    }
}

// Display week weather
function displayWeekWeather(){
    getDayWeather(0, data.fcst_day_0);
    getDayWeather(1, data.fcst_day_1);
    getDayWeather(2, data.fcst_day_2);
    getDayWeather(3, data.fcst_day_3);
    getDayWeather(4, data.fcst_day_4);
}

// Display today weather
function displayTodayWeather(){
    document.getElementById('todayName').innerHTML  = data.current_condition.date
    document.getElementById('hourName').innerHTML   = data.current_condition.hour;
    if(document.getElementById('imgWeather').childElementCount == 0){
        const img   = document.createElement('img'); 
        img.src     =  data.current_condition.icon_big;
        document.getElementById('imgWeather').appendChild(img); 
    }
    document.getElementById('conditionName').innerHTML  = data.current_condition.condition;
    document.getElementById('currentDeg').innerHTML     = data.current_condition.tmp;
    document.getElementById('minTmp').innerHTML         = " min: "+data.fcst_day_0.tmin+"°";
    document.getElementById('maxTmp').innerHTML         = " max: "+data.fcst_day_0.tmax+"°";
    document.getElementById('wind').innerHTML           = "vent: "+data.current_condition.wnd_spd+"km/h";
    getWindDirection();
}





