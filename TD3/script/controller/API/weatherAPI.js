export default class WeatherAPI {
    constructor(info, app){
        this.url =  "https://www.prevision-meteo.ch/services/json/" + info;
        this.app = app;
    }

    sendData(moreInfo){
        fetch(this.url)
        .then(res => res.json(), res => this.errorMessage())
        .then(json => this.callBack(json, moreInfo))
        .catch(err => console.log("HTTP error: "+err)); 
    }

    callBack(data, moreInfo){
        this.app.dataTreatment(data, moreInfo);
    }
    
    errorMessage(){
        alert("Something wrong with http request...");
    }


}