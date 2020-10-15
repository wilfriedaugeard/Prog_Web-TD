import WeatherAPI from '../controller/API/weatherAPI.js';
import GoogleMapAPI from '../controller/API/googleMapAPI.js';

/**
 * Create, display map with google map and manage pins.
 * @class
 */
class MapGeoloc {
    /**
     * Create a MapGeoloc instance. Define default gps points (Paris). Create a {@link GoogleMapAPI} instance and initialise the map.
     */
    constructor(){
        this.gpsPoint = {lat: 46.524542279877316, lng: 2.4557739321143313};
        this.savedMarker = new Array();
        this.googleAPI = new GoogleMapAPI(this);

        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 5, 
            center: this.gpsPoint
        });
        
    }

    /**
     * Active click listener on map. On click that place a marker and send latitude/longitude data to sendLngLat method.
     * @param {App} app - The main App instance. 
     */
    activeListener(app){
        this.app = app;
        let that = this;
        google.maps.event.addListener(
            that.map, 
            'click', 
            function(event) {
                that.placeMarker(event.latLng);
                that.sendLngLat(event.latLng);
            }
        );
    }
   
    /**
     * Create and place a new marker on map.
     * @param {Object} location - Contains latitude and longitude data. 
     */
    placeMarker(location) {
        let marker = new google.maps.Marker({
            position: location,
            map: this.map
        });
        this.savedMarker.push(marker);
        marker.setMap(this.map);
    }

    /**
     * Send a request with {@link GoogleMapAPI}.
     * @param {Object} location - Contains latitude and longitude data. 
     */
    sendLngLat(location){
        this.googleAPI.sendRequest(location);
    }

    /**
     * Create a new instance of {@link WeatherAPI} and send data.
     * @param {Object} location - Contains latitude and longitude data. 
     * @param {Object} moreInfo - Complementary data.
     */
    sendData(location, moreInfo){
        const lat = location.lat();
        const lng = location.lng();
        const data = "lat="+lat+"lng="+lng;
        const request = new WeatherAPI(data, this.app);
        request.sendData(moreInfo);
    }

    /**
     * Create and place a new marker on map.
     * @param {String} lat - Latitude.
     * @param {String} lng - Longitude. 
     */
    placeMarkerLatLgn(lat, lng){
        const myLatLng = {lat: parseFloat(lat), lng: parseFloat(lng)};
        const newMarker = new google.maps.Marker({
            position: myLatLng,
            map: this.map,
        });
        this.savedMarker.push(newMarker);
        newMarker.setMap(this.map);
    }

    /**
     * Clean map and remove saved markers.
     */
    cleanMap() {
        this.savedMarker.forEach(marker => {
            marker.setMap(null);
        });
        this.savedMarker = new Array();
    }

    /**
     * Get saved markers list.
     * @returns {Array} Saved markers list.
     */
    getSavedMarker(){
        return this.savedMarker;
    }

    /**
     * Set saved markers list.
     * @param {Array} Saved markers list.
     */
    setSavedMarker(marker){
        this.savedMarker = marker;
    }
}
export default MapGeoloc;