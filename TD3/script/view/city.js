import CityHtmlBuilder from './cityHtmlBuilder.js';

/**
 * City class get weather data and display it.
 * @class
 */
class City{
    /**
     * Create an instance of City and create a {@link CityHtmlBuilder} instance to create HTML structure.
     * @param {int} id - City id. 
     * @param {JSON} data - {@link Data} instance. 
     */
    constructor(id, data){
        this.id = id;
        this.data = data;
        this.htmlBuilder = new CityHtmlBuilder(this.id);
    }

    // USEFUL
    /**
     * Get city latitude.
     * @returns {String} City latitude.
     */
    getCityLatitude(){
        return this.data.getCityLatitude();
    }
    /**
     * Get city longitude.
     * @returns {String} City longitude.
     */
    getCityLongitude(){
        return this.data.getCityLongitude();
    }

    /**
     * Clean all created objects.
     */
    clean(){
        this.htmlBuilder.deleteCard();
        delete this.htmlBuilder;
    }

   
    /* DISPLAYING FUNCTIONS */
    /**
     * Display weather informations.
     */
    display(){
        this.htmlBuilder.build();
        this.displayCityName();
        this.displayTodayWeather();
        this.displayWeekWeather();
        this.displayTimeSlots();
    }

    /**
     * Display city name.
     */
    displayCityName(){
        document.getElementById('cityName'+this.id).innerHTML = this.data.getCityName();
    }

    /**
     * Display current weather.
     */
    displayTodayWeather(){
        document.getElementById('todayName'+this.id).innerHTML = this.data.getCurrentDay();
        document.getElementById('hourName'+this.id).innerHTML  = this.data.getCurrentHour();
        if(document.getElementById('imgWeather'+this.id).childElementCount == 0){
            const img   = this.htmlBuilder.createOneElement('img', '', ''); 
            img.src     = this.data.getCurrentBigIcon();
            document.getElementById('imgWeather'+this.id).appendChild(img); 
        }
        document.getElementById('conditionName'+this.id).innerHTML  = this.data.getCurrentConditionName();
        document.getElementById('currentDeg'+this.id).innerHTML     = this.data.getCurrentTmp()+'°';
        document.getElementById('minTmp'+this.id).innerHTML         = " min: "+this.data.getTmpMin(0)+"°";
        document.getElementById('maxTmp'+this.id).innerHTML         = " max: "+this.data.getTmpMax(0)+"°";
        document.getElementById('wind'+this.id).innerHTML           = " vent: "+this.data.getCurrentWindSpeed()+"km/h";
        document.getElementById('windDir'+this.id).innerHTML        = this.data.getWindDirection();
    }

    /**
     * Display weather for 5 consecutive days.
     */
    displayWeekWeather(){
        for(let i = 0; i<5; i++){
            this.displayDayWeather(i);
        }
    }

    /**
     * Display weather of a specific day.
     * @param {int} numDay - Day num. 
     */
    displayDayWeather(numDay){
        const dayName    = "dayName_"+numDay+this.id;
        const dateName   = "dateName_"+numDay+this.id;
        const imgWeather = "imgWeather_"+numDay+this.id;
        const minMaxTmp  = "minMaxTmp_"+numDay+this.id;
        document.getElementById(dayName).innerHTML   = this.data.getDayLongName(numDay);
        document.getElementById(dateName).innerHTML  = this.data.getDayDate(numDay);
        document.getElementById(minMaxTmp).innerHTML = this.data.getTmpMin(numDay)+"° - "+this.data.getTmpMax(numDay)+"°";

        if(document.getElementById(imgWeather).childElementCount == 0){
            const img = this.htmlBuilder.createOneElement('img', '', ''); 
            img.src   = this.data.getDayIconSmall(numDay);
            document.getElementById(imgWeather).appendChild(img); 
        }
    }

    /**
     * Display hour weather.
     * @param {int} h - Hour. 
     * @param {*} mainDiv - Div to display weather into.
     */
    displayHourWeather(h, mainDiv){
        const divWeather = this.htmlBuilder.createOneElement('div', 'col', '');
        const img        = this.htmlBuilder.createOneElement('img', 'row', ''); 
        img.src          = this.data.getIconSmallByHour(0, h);
        divWeather.appendChild(img); 

        const hourText = this.htmlBuilder.createOneElement('span', 'bold row', '');
        hourText.innerHTML = h+"H00";
        
        const divTmp = this.htmlBuilder.createOneElement('div', 'row', '');
        const tempText = this.htmlBuilder.createOneElement('span', '', '');
        tempText.innerHTML = this.data.getTmpByHour(0, h)+"°c";
        
        // Append
        divWeather.appendChild(img); 
        divWeather.appendChild(hourText);
        divTmp.appendChild(tempText);
        divWeather.appendChild(divTmp);
        mainDiv.appendChild(divWeather);

    }

    /**
     * Display hour weather two by two.
     */
    displayTimeSlots(){
        const div = document.getElementById("displayHours"+this.id);
        for (let i=0; i<24; i+=2) {
            this.displayHourWeather(i, div);
        }
    }
    

}

export default City;