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
        console.log(this.weather);
        this.map.placeMarkerLatLgn(this.weather.getCityLatitude(), this.weather.getCityLongitude());
        this.reduiceMap();
        this.displayData();
    }

    displayData(){
        this.showDataVisibility();
        this.displayCityName();
        this.displayTodayWeather();
        this.displayWeekWeather();
        this.loadHoursData();
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
        document.getElementById('minTmp').innerHTML         = " min: "+this.weather.getTmpMin(0)+"°";
        document.getElementById('maxTmp').innerHTML         = " max: "+this.weather.getTmpMax(0)+"°";
        document.getElementById('wind').innerHTML           = "vent: "+this.weather.getCurrentWindSpeed()+"km/h";
        document.getElementById('windDir').innerHTML        = this.weather.getWindDirection();
    }

    displayWeekWeather(){
        for(let i = 0; i<5; i++){
            this.displayDayWeather(i);
        }
    }

    displayDayWeather(numDay){
        const dayName    = "dayName_"+numDay;
        const dateName   = "dateName_"+numDay;
        const imgWeather = "imgWeather_"+numDay;
        const minMaxTmp  = "minMaxTmp_"+numDay;
        document.getElementById(dayName).innerHTML   = this.weather.getDayLongName(numDay);
        document.getElementById(dateName).innerHTML  = this.weather.getDayDate(numDay);
        document.getElementById(minMaxTmp).innerHTML = this.weather.getTmpMin(numDay)+"° - "+this.weather.getTmpMax(numDay)+"°";
    
        if(document.getElementById(imgWeather).childElementCount == 0){
            const img = document.createElement('img'); 
            img.src   = this.weather.getDayIconSmall(numDay);
            document.getElementById(imgWeather).appendChild(img); 
        }
    }

    displayHourWeather(h, mainDiv){
       

        const divWeather = document.createElement('div');
        divWeather.className="col bold";

        const img = document.createElement('img'); 
        img.src   = this.weather.getIconSmallByHour(0, h);

        divWeather.appendChild(img); 

        const hourText = document.createElement('span');
        hourText.innerHTML = h+"H00";
        divWeather.appendChild(hourText);


        mainDiv.appendChild(divWeather);

    }


    loadFirstRawHours(){
        const node1 = document.getElementById("firstHourRaw");
        if(node1.childElementCount != 0){
            while (node1.firstChild) {
                node1.removeChild(node1.lastChild);
              }
        }
        //data.fcst_day_0.hourly_data["0H00"].CONDITION_KEY;
        for (let i=0; i<12; i++) {
            this.displayHourWeather(i, node1);
        }
        const node2 = document.getElementById("secondHourRaw");
        if(node2.childElementCount != 0){
            while (node2.firstChild) {
                node2.removeChild(node2.lastChild);
              }
        }
        for (let i=12; i<24; i++) {
            this.displayHourWeather(i, node2);
        }
          
    }
    
    loadHoursData(){
        this.loadFirstRawHours();
    }
}



function main(){
    const map = new MapGeoloc();
    const app = new App(map);
    map.activeListener(app);
    app.activeListener();
    
    
}

