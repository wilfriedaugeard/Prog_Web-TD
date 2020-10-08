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
    errorMessage(){
        alert("Something wrong with http request...");
    }




}