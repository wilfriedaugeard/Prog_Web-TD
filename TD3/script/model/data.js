/**
 * Extract all weather data
 * @class
 */
class Data {
    /**
     * Create a Data instance.
     * @param {JSON} json - JSON weather data. 
     * @param {Object} moreJson - Complementary data.
     */
    constructor(json, moreJson){
        this.data = json;
        this.moreData = moreJson;
    }

    /**
     * Add num day to string 'fcst_day_'.
     * @param {int} n - Day num. 
     * @returns {String} The created string. 
     */
    createFcst_day(n){return "fcst_day_"+n;}
    
    /**
     * Create a hour of type 'XH00'.
     * @param {*} n - Hour
     * @returns {String} The created string.
     */
    createHour(n){return n+"H00";}

    
    /**
     * Extract city name and choose precisest name.
     * @returns {String} City name.
     */
    getCityName(){
        const cityName = this.data.city_info.name;
        return (cityName != 'NA') ? cityName+' ,'+this.getCountryName() : this.moreData.description;
    }
    
    /**
     * Extract country name.
     * @returns {String} Country name.
     */
    getCountryName(){return this.data.city_info.country;}
    
    /**
     * Extract latitude.
     * @returns {String} Latitude.
     */
    getCityLatitude(){return this.data.city_info.latitude;}
    /**
     * Extract longitude.
     * @returns {String} Longitude.
     */
    getCityLongitude(){return this.data.city_info.longitude;}

    /**
     * Extract current date.
     * @returns {String} Current date.
     */
    getCurrentDay(){return this.data.current_condition.date;}
    
    /**
     * Extract current hour.
     * @returns {String} Current hour.
     */
    getCurrentHour(){return this.data.current_condition.hour;}
     
    /**
     * Extract current condition big icon.
     * @returns {String} Url of current condition big icon.
     */
    getCurrentBigIcon(){return this.data.current_condition.icon_big;}
     
    /**
     * Extract current condition name.
     * @returns {String} Condition name.
     */
    getCurrentConditionName(){return this.data.current_condition.condition;}
     
    /**
     * Extract current temperature.
     * @returns {String} Current temperature.
     */
    getCurrentTmp(){return this.data.current_condition.tmp;}
     
    /**
     * Extract current wind speed.
     * @returns {String} Current wind speed.
     */
    getCurrentWindSpeed(){return this.data.current_condition.wnd_spd;}

    /**
     * Extract current wind direction name and complete it.
     * @returns {String} Current wind direction.
     */
    getWindDirection(){
        const dir = this.data.current_condition.wnd_dir;
        switch(dir){
            case 'N':
                return "Nord";
            case 'E':
                return "Est";
            case 'O':
                return "Ouest";
            case 'S':
                return "Sud";
            case 'NE':
               return "Nord-Est";
            case 'NO':
                return "Nord-Ouest";
            case 'SE':
                return "Sud-Est";
            case 'SO':
                return "Sud-Ouest";
            default:
                return "Inconnu";
        }
    }

    /**
     * Extract minimum temperature of given day.
     * @param {int} day - Day num. 
     * @returns {String} Minimum temperature of given day.
     */
    getTmpMin(day){return this.data[this.createFcst_day(day)].tmin;}

    /**
     * Extract maximum temperature of given day.
     * @param {int} day - Day num. 
     * @returns {String} Maximum temperature of given day.
     */
    getTmpMax(day){return this.data[this.createFcst_day(day)].tmax;}
    
    /**
     * Extract full name of given day.
     * @param {int} day - Day num. 
     * @returns {String} Full name of given day.
     */
    getDayLongName(day){return this.data[this.createFcst_day(day)].day_long;};

    /**
     * Extract date of given day.
     * @param {int} day - Day num. 
     * @returns {String} Date of given day.
     */
    getDayDate(day){return this.data[this.createFcst_day(day)].date;};

    /**
     * Extract small weather icon of given day.
     * @param {int} day - Day num. 
     * @returns {String} Weather icon of given day.
     */
    getDayIconSmall(day){return this.data[this.createFcst_day(day)].icon;};

    /**
     * Extract small weather icon of given hour.
     * @param {int} day - Day num. 
     * @param {int} hour - Hour num.
     * @returns {String} Weather icon of given hour.
     */
    getIconSmallByHour(day, hour){return this.data[this.createFcst_day(day)].hourly_data[this.createHour(hour)].ICON;}

    /**
     * Extract temperature of given hour.
     * @param {int} day - Day num. 
     * @param {int} hour - Hour num.
     * @returns {String} Temperature of given hour.
     */
    getTmpByHour(day, hour){return this.data[this.createFcst_day(day)].hourly_data[this.createHour(hour)].TMP2m;}
    
}
export default Data;


