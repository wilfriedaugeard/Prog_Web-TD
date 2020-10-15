import Data from '../model/data.js';
import City from '../view/city.js';
import WeatherAPI from './API/weatherAPI.js';
import InputCityAPI from './API/inputCityAPI.js';

/**
 * The App class is used to manage map, data and user events.
 * @class
 */
class App {
    /**
     * Create an app instance. Create an {@link InputCityAPI} instance.
    * @param {MapGeoloc} map - The geolocation map.
     */
    constructor(map){
        this.map = map;
        this.data = null;
        this.cityDisplay = 0;
        this.cities = new Array();
        this.input  = new InputCityAPI(this);
        this.cityTmpData = null;
    }
    

    /* EVENT LISTENER */
    /**
     * Active all listeners: validate input button, input autocompletion, remove button.
     */
    activeAllListeners(){
        this.activeInputCityListener();
        this.activeRemoveBtnListener();
        this.input.activeListener();
    }
    /**
     * Active validate input button listener. On click that get latitude and longitude to create an send a request with a new instance of {@link WeatherAPI}.
     */
    activeInputCityListener(){
        const that = this;
        document.getElementById("submitBtn").addEventListener("click", function(e) {
            e.preventDefault();
            const cityValue ="lat="+that.data.location.lat+"lng="+that.data.location.lng;
            const request = new WeatherAPI(cityValue, that);
            request.sendData(that.data);
        });
    }
    /**
     * Active remove button listener. On click that remove all saved cities.
     */
    activeRemoveBtnListener(){
        const that = this;
        document.getElementById("initalizeMap").addEventListener("click", function(e) {
            that.removeAllCities();
        });
    }


    /* DATA */
    /**
     * Check data validity.
     * @param {JSON} data - Main data retreive by {@link WeatherAPI}.
     * @param {Object} moreInfo - Complementary data.
     */
    dataTreatment(data, moreInfo){
        if(data){
            data.errors ? this.errorMessage() : this.validData(data, moreInfo);
        }
    }

    /**
     * Save complementary data retreive by {@link InputCityAPI}.
     * @param {JSON} jsonData - Complementary JSON data.
     */
    inputDataTreatment(jsonData){
        this.data = jsonData;
    }


    /* DISPLAYING */
    /**
     * Create a new City instance with given data. Actualize map and display weather informations.
     * @param {JSON} data - Main data retreive by {@link WeatherAPI}.
     * @param {Object} moreInfo - Complementary data.
     */
    validData(data, moreInfo){
        const newCity = new City(this.cityDisplay++, new Data(data, moreInfo));
        this.cities.push(newCity);

        this.map.placeMarkerLatLgn(newCity.getCityLatitude(), newCity.getCityLongitude());
        newCity.display();

    }
    /**
     * Create an alert box with an error message.
     */
    errorMessage(){
        alert("Please enter a valid city name or pick the map.");
    }

    /* CLEAN */
    /**
     * Remove all saved cities and clean the map.
     */
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

export default App;
