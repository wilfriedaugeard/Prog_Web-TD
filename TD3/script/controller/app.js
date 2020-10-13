import Data from '../model/data.js';
import City from '../view/city.js';
import WeatherAPI from './API/weatherAPI.js';
import InputCityAPI from './API/inputCityAPI.js';

/**
 * App objects manage map, data and user events.
 * @class
 * @classdesc App objects manage map, data and user events.
 */

export default class App {
    constructor(map){
        this.map = map;
        this.data = null;
        this.cityDisplay = 0;
        this.cities = new Array();
        this.input  = new InputCityAPI(this);
        this.cityTmpData = null;
    }
    

    /* EVENT LISTENER */
    activeAllListeners(){
        this.activeInputCityListener();
        this.activeRemoveBtnListener();
        this.input.activeListener();
    }

    activeInputCityListener(){
        const that = this;
        document.getElementById("submitBtn").addEventListener("click", function(e) {
            e.preventDefault();
            const cityValue ="lat="+that.data.location.lat+"lng="+that.data.location.lng;
            const request = new WeatherAPI(cityValue, that);
            request.sendData(that.data);
        });
    }

    activeRemoveBtnListener(){
        const that = this;
        document.getElementById("initalizeMap").addEventListener("click", function(e) {
            that.removeAllCities();
        });
    }


    /* DATA */
    dataTreatment(data, moreInfo){
        if(data){
            data.errors ? this.errorMessage() : this.validData(data, moreInfo);
        }
    }

    inputDataTreatment(jsonData){
        this.data = jsonData;
    }


    /* DISPLAYING */
    validData(data, moreInfo){
        const newCity = new City(this.cityDisplay++, new Data(data, moreInfo));
        this.cities.push(newCity);

        this.map.placeMarkerLatLgn(newCity.getCityLatitude(), newCity.getCityLongitude());
        newCity.display();

    }

    errorMessage(){
        alert("Please enter a valid city name or pick the map.");
    }

    /* CLEAN */
    removeAllCities(){
        for(let i = 0; i<this.cities.length; i++){
            this.cities[i].clean();
            delete this.cities[i];
        }
        this.cities = new Array();
        this.cityDisplay = 0;
        this.map.cleanMap();
    }

}
