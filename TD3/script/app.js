class App {
    constructor(map){
        this.map = map;
        this.data = null;
        this.weather = null;
    }
    
    activeListener(){
        const that = this;
        document.getElementById("submitBtn").addEventListener("click", function() {
            const cityValue = document.getElementById('inputCity').value;
            const request = new RequestAPI(cityValue, that);
            request.sendData();
        });
    }

    dataTreatment(data){
        this.data = data;
        if(this.data){
            this.data.errors ? this.errorMessage() : this.validData();
        }
    }

    errorMessage(){alert("Please enter a valid city name or pick the map.");}

    showDataVisibility(){document.getElementById('data').style.display = "block";}

    reduiceMap(){document.getElementById('mapDiv').className = "col-md-6";}

    validData(){
        this.weather = new Data(this.data);
        this.reduiceMap();
        this.displayData();
    }

    displayData(){
        // if(savedMarker != null){
        //     setMapOnAll(null);
        // }
        // let myLatLng = {lat: parseFloat(data.city_info.latitude), lng: parseFloat(data.city_info.longitude)};
        // let newMarker = new google.maps.Marker({
        //     position: myLatLng,
        //     map: map,
        // });
        // savedMarker = newMarker;
        // newMarker.setMap(map);
        this.showDataVisibility();
        this.displayCityName();
        this.displayTodayWeather();
        //displayWeekWeather();
        //loadHoursData();
    }

    displayCityName(){
        document.getElementById('cityName').innerHTML = this.weather.getCityName()+", "+this.weather.getCountryName();
    }
    displayTodayWeather(){
        document.getElementById('todayName').innerHTML = this.weather.getCurrentDay();
        document.getElementById('hourName').innerHTML  = this.weather.getCurrentHour();
        if(document.getElementById('imgWeather').childElementCount == 0){
            const img   = document.createElement('img'); 
            img.src     = this.weather.getCurrentBigIcon();
            document.getElementById('imgWeather').appendChild(img); 
        }
        document.getElementById('conditionName').innerHTML  = this.weather.getCurrentConditionName();
        document.getElementById('currentDeg').innerHTML     = this.weather.getCurrentTmp();
        //document.getElementById('minTmp').innerHTML         = " min: "+data.fcst_day_0.tmin+"°";
        //document.getElementById('maxTmp').innerHTML         = " max: "+data.fcst_day_0.tmax+"°";
        document.getElementById('wind').innerHTML           = "vent: "+this.weather.getCurrentWindSpeed()+"km/h";
        getWindDirection();
    }
}



function main(){
    const app = new App(initMap());
    app.activeListener();
    //app.dataTreatment();
}

main();