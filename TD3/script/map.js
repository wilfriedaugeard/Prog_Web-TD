class Map {
    constructor(latitude, longitude){
        this.gpsPoint = {lat: 46.524542279877316, lng: 2.4557739321143313};
        this.savedMarker = null;

        // this.map = new google.maps.Map(
        //     document.getElementById('map'), 
        //     {zoom: 5, center: this.gpsPoint}
        // );

        // google.maps.event.addListener(
        //     this.map, 
        //     'click', 
        //     function(event) {
        //         this.placeMarker(event.latLng);
        //     }
        // );
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
        const data = "lat="+location.lat()+"lng="+location.lng();
        sendData(data);
    }

    setMapOnAll(map) {
        this.savedMarker.setMap(map);
    }
}

function initMap(){
    return new Map(46.524542279877316, 2.4557739321143313);
}


// function initMap() {
//     let myLatlng = {lat: 46.524542279877316, lng: 2.4557739321143313};
//         map = new google.maps.Map(
//             document.getElementById('map'), {zoom: 5, center: myLatlng});
//             google.maps.event.addListener(map, 'click', function(event) {
//             placeMarker(map, event.latLng);
//         });
// }

// function placeMarker(map, location) {
//     if(savedMarker != null){
//         setMapOnAll(null);
//     }
//     let marker = new google.maps.Marker({
//         position: location,
//         map: map
//     });
//     savedMarker = marker;
//     const data = "lat="+location.lat()+"lng="+location.lng();
//     sendData(data);
// }
// function setMapOnAll(map) {
//     savedMarker.setMap(map);
// }
// Reduice the map size
function reduiceMap(){
    document.getElementById('mapDiv').className = "col-md-6";
}