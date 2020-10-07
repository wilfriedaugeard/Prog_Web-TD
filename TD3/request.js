let requestURL = "https://www.prevision-meteo.ch/services/json/";
let data = null;

function sendData(info){
    let url = requestURL.concat(info)
    fetch(url)
    .then(res => res.json(), res => errorMessage(res))
    .then(json => dataTreatment(json))
    .catch(err => errorMessage(err)); 
}


function sendMeteoRequest(){
    const cityValue = document.getElementById('inputCity').value;
    sendData(cityValue);
}

function dataTreatment(json){
    data = json;
    data.errors ? errorMessage(data) : validData();
}

function validData(){
    reduiceMap();
    console.log("ok");
    displayData();
}

function errorMessage(err){
   alert("Please enter a valid city name or pick the map.");
}