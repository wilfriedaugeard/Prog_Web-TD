class Data {
    constructor(json){
        this.data = json;
    }

    createFcst_day(n){return "fcst_day_"+n;}
    createHour(n){return n+"H00";}

    getCityName(){return this.data.city_info.name;}
    getCountryName(){return this.data.city_info.country;}
    getCityLatitude(){return this.data.city_info.latitude;}
    getCityLongitude(){return this.data.city_info.longitude;}

    getCurrentDay(){return this.data.current_condition.date;}
    getCurrentHour(){return this.data.current_condition.hour;}
    getCurrentBigIcon(){return this.data.current_condition.icon_big;}
    getCurrentConditionName(){return this.data.current_condition.condition;}
    getCurrentTmp(){return this.data.current_condition.tmp;}
    getCurrentWindSpeed(){return this.data.current_condition.wnd_spd;}

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

    getTmpMin(day){return this.data[this.createFcst_day(day)].tmin;}
    getTmpMax(day){return this.data[this.createFcst_day(day)].tmax;}
    

    getDayLongName(day){return this.data[this.createFcst_day(day)].day_long;};
    getDayDate(day){return this.data[this.createFcst_day(day)].date;};
    getDayIconSmall(day){return this.data[this.createFcst_day(day)].icon;};

    getIconSmallByHour(day, hour){return this.data[this.createFcst_day(day)].hourly_data[this.createHour(hour)].ICON;}
    
}



