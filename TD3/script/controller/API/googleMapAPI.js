/**
 * The GoogleMapAPI class is used to get a precise city name from latitude and longitude.
 * @class
 */
class GoogleMapAPI{
    /**
     * Create a GoogleMapAPI instance with private key.
     * @param {MapGeoloc} map - The geolocalisation map. 
     */
    constructor(map){
        this.key = 'AIzaSyDT0YsL9GMNRr2mxvbV2ATADymr3AYJK3c';
        this.map = map;
    }

    /**
     * Build an url with latitude and longitude parameters.
     * @param {Float} lat - Latitude.
     * @param {Float} lng - Longitude.
     * @returns {String} builded url.
     */
    buildUrl(lat, lng){
        let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key='+this.key;
        return url;
    }

    /**
     * Send url request with location informations.
     * @param {Object} location - Associative array with latitude and longitude. 
     */
    sendRequest(location){
        const lat = location.lat();
        const lng = location.lng();
        fetch(this.buildUrl(lat, lng))
        .then(res => res.json(), res => this.errorMessage())
        .then(json => this.callBack(location, json))
        .catch(err => console.log("HTTP error: "+err)); 
    }

    /**
     * Create an object with precise address and send it to map.
     * @param {Object} location - Associative array with latitude and longitude. 
     * @param {JSON} data - JSON info.
     */
    callBack(location, data){
        const moreInfo = {description: data.results['0'].formatted_address};
        this.map.sendData(location, moreInfo);
    }
    
    /**
     * Create an alert box with an error message.
     */
    errorMessage(){
        alert("Something wrong with http request...");
    }
}
export default GoogleMapAPI;