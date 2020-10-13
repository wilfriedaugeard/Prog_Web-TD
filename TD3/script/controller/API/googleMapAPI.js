export default class GoogleMapAPI{
    constructor(map){
        this.key = 'AIzaSyDT0YsL9GMNRr2mxvbV2ATADymr3AYJK3c';
        this.map = map;
    }

    buildUrl(lat, lng){
        let url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng='+lat+','+lng+'&key='+this.key;
        return url;
    }

    sendRequest(location){
        const lat = location.lat();
        const lng = location.lng();
        fetch(this.buildUrl(lat, lng))
        .then(res => res.json(), res => this.errorMessage())
        .then(json => this.callBack(location, json))
        .catch(err => console.log("HTTP error: "+err)); 
    }

    callBack(location, data){
        const moreInfo = {description: data.results['0'].formatted_address};
        this.map.sendData(location, moreInfo);
    }
    
    errorMessage(){
        alert("Something wrong with http request...");
    }
}