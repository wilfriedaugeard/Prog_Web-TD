/**
 * The WeatherAPI class is used to get weather informations.
 * @class
 */
class WeatherAPI {
    /**
     * Create a WeatherAPI instance and build url request.
     * @param {String} info - City name or latitude/longitude. 
     * @param {App} app - The main app instance. 
     */
    constructor(info, app){
        this.url =  "https://www.prevision-meteo.ch/services/json/" + info;
        this.app = app;
    }

     /**
     * Send url request with location informations.
     * @param {Object} moreInfo - Complementary data.
     */
    sendData(moreInfo){
        fetch(this.url)
        .then(res => res.json(), res => this.errorMessage())
        .then(json => this.callBack(json, moreInfo))
        .catch(err => console.log("HTTP error: "+err)); 
    }

    /**
    * Call App dataTreatment method.
     * @param {JSON} data - Main data passed.
     * @param {Object} moreInfo - Complementary data.
     */
    callBack(data, moreInfo){
        this.app.dataTreatment(data, moreInfo);
    }

    /**
     * Create an alert box with an error message.
     */
    errorMessage(){
        alert("Something wrong with http request...");
    }


}
export default WeatherAPI;