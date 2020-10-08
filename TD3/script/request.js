let data = null;


class RequestAPI {
    constructor(info, app){
        this.url =  "https://www.prevision-meteo.ch/services/json/" + info;
        this.app = app;
    }

    sendData(){
        fetch(this.url)
        .then(res => res.json(), res => this.errorMessage())
        .then(json => this.callBack(json))
        .catch(err => console.log("HTTP error: "+err)); 
    }

    callBack(data){
        this.app.dataTreatment(data);
    }

    validData(){
        reduiceMap();
        displayData();
    }
    errorMessage(){alert("Something wrong with http request...");}




}


// function sendData(info){
//     let url = requestURL.concat(info)
//     fetch(url)
//     .then(res => res.json(), res => errorMessage(res))
//     .then(json => dataTreatment(json))
//     .catch(err => errorMessage(err)); 
// }


// function sendMeteoRequest(){
//     const cityValue = document.getElementById('inputCity').value;
//     let req = new RequestAPI(cityValue);
//     req.sendData();
// }

// function dataTreatment(json){
//     data = json;
//     data.errors ? errorMessage(data) : validData();
// }

// function validData(){
//     reduiceMap();
//     console.log("ok");
//     displayData();
// }

// function errorMessage(err){
//    alert("Please enter a valid city name or pick the map.");
// }