class MapGeoloc {
    constructor(){
        this.gpsPoint = {lat: 46.524542279877316, lng: 2.4557739321143313};
        this.savedMarker = null;
        
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
        if(this.savedMarker != null){
            this.setMapOnAll(null);
        }
        let marker = new google.maps.Marker({
            position: location,
            map: this.map
        });
        this.savedMarker = marker;
        this.savedMarker.setMap(this.map);
    }

    sendLngLat(location){
        const data = "lat="+location.lat()+"lng="+location.lng();
        const request = new RequestAPI(data, this.app);
        request.sendData();
    }

    placeMarkerLatLgn(lat, lng){
        if(this.savedMarker != null){
            this.setMapOnAll(null);
        }
        const myLatLng = {lat: parseFloat(lat), lng: parseFloat(lng)};
        const newMarker = new google.maps.Marker({
            position: myLatLng,
            map: this.map,
        });
        this.savedMarker = newMarker;
        newMarker.setMap(this.map);
    }

    setMapOnAll(map) {
        this.savedMarker.setMap(map);
    }

    getSavedMarker(){
        return this.savedMarker;
    }
    setSavedMarker(marker){
        this.savedMarker = marker;
    }
}

// Reduice the map size
function reduiceMap(){
    document.getElementById('mapDiv').className = "col-md-6";
}