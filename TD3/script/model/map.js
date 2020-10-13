import WeatherAPI from '../controller/API/weatherAPI.js';
import GoogleMapAPI from '../controller/API/googleMapAPI.js';


export default class MapGeoloc {
    constructor(){
        this.gpsPoint = {lat: 46.524542279877316, lng: 2.4557739321143313};
        this.savedMarker = new Array();
        this.googleAPI = new GoogleMapAPI(this);

        this.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 5, 
            center: this.gpsPoint
        });
        
    }

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
   
    placeMarker(location) {
        let marker = new google.maps.Marker({
            position: location,
            map: this.map
        });
        this.savedMarker.push(marker);
        marker.setMap(this.map);
    }

    sendLngLat(location){
        this.googleAPI.sendRequest(location);
    }

    sendData(location, moreInfo){
        const lat = location.lat();
        const lng = location.lng();
        const data = "lat="+lat+"lng="+lng;
        const request = new WeatherAPI(data, this.app);
        request.sendData(moreInfo);
    }

    placeMarkerLatLgn(lat, lng){
        const myLatLng = {lat: parseFloat(lat), lng: parseFloat(lng)};
        const newMarker = new google.maps.Marker({
            position: myLatLng,
            map: this.map,
        });
        this.savedMarker.push(newMarker);
        newMarker.setMap(this.map);
    }

    cleanMap() {
        this.savedMarker.forEach(marker => {
            marker.setMap(null);
        });
        this.savedMarker = new Array();
    }

    getSavedMarker(){
        return this.savedMarker;
    }
    setSavedMarker(marker){
        this.savedMarker = marker;
    }
}
