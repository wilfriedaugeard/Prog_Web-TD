/**
 * CityHtmlBuilder class create HTML structure to display city data.
 * @class
 */
class CityHtmlBuilder{
    /**
     * Create a CityHtmlBuilder instance.
     * @param {int} id - City id. 
     */
    constructor(id){
        this.id = id;
        this.card = null;
    }

    /**
     * Build html structure.
     */
    build(){
        const mainDiv = document.getElementById("data");
        this.closeAllCollapse();
        this.card = this.createCard();
        mainDiv.childElementCount == 0 ? mainDiv.appendChild(this.card) : mainDiv.prepend(this.card);
    }

    /* CARD */

    /**
     * Create card element.
     * @returns {Object} Created card.
     */
    createCard(){
        const cardDiv = document.createElement('div');
        cardDiv.className="card pulse";
        cardDiv.appendChild(this.createHeaderCard());
        cardDiv.appendChild(this.createContentCard());
        return cardDiv;
    }

    /**
     * Delete card element.
     */
    deleteCard(){
        this.card.remove();
    }
    
    /**
     * Create header card.
     * @returns {Object} Created header.
     */
    createHeaderCard(){
        const cardHeader = this.createOneElement('div', 'card-header', 'heading'+this.id);
        const collapseDiv = this.createOneElement('div', 'row', 'collapseDiv'+this.id);
        collapseDiv.setAttribute("data-toggle", "collapse");
        collapseDiv.setAttribute("data-target", "#collapse"+this.id);
        collapseDiv.setAttribute("aria-controls", "collapse"+this.id);
        collapseDiv.setAttribute("aria-expanded", "true");
        
        const cityNameDiv = this.createOneElement('div', "cityName", '');
        const pinLogo = this.createOneElement('i', 'fa fa-map-marker', '');
        const spanCityName = this.createOneElement('span', 'cityName', 'cityName'+this.id);

        // Append
        cityNameDiv.appendChild(pinLogo);
        cityNameDiv.appendChild(spanCityName);
        collapseDiv.appendChild(cityNameDiv);
        cardHeader.appendChild(collapseDiv);

        return cardHeader;
    }


    /**
     * Create content card.
     * @returns {Object} Created content.
     */
    createContentCard(){
        const cardCentent = this.createOneElement('div', 'collapse show', 'collapse'+this.id);
        cardCentent.setAttribute("aria-labelledby", "heading"+this.id);
        cardCentent.setAttribute("data-parent","#data");

        const cardBody      = this.createOneElement('div', 'card-body', '');
        const weekInfo      = this.createOneElement('div', 'row weekInfo', '');
        
        // Append
        weekInfo.appendChild(this.createTopLeftInfo());
        weekInfo.appendChild(this.createTopRightInfo());
        weekInfo.appendChild(this.createBottomInfo());
        cardBody.appendChild(weekInfo);
        cardCentent.appendChild(cardBody);

        return cardCentent;
    }

    /**
     * Create top left data: global current weather data.
     * @returns {Object} Created element.
     */
    createTopLeftInfo(){
        const colMd6        = this.createOneElement('div', 'col-md-6 fadeInLeft', '');
        const rowDiv1       = this.createOneElement('div', 'row', '');
        const colMd8        = this.createOneElement('div', 'col', '');
        const rowDiv2       = this.createOneElement('div', 'row', '');
        const vertCenter    = this.createOneElement('div', 'col-md-6', '');
        const todayName     = this.createOneElement('div', 'todayName row', 'todayName'+this.id);
        const hourName      = this.createOneElement('div', 'hourName row', 'hourName'+this.id);
        const colMd6_3      = this.createOneElement('div', 'col-md-6', '');
        const currentDeg    = this.createOneElement('div', 'currentDeg', 'currentDeg'+this.id);
        const rowDiv3       = this.createOneElement('div', 'row', '');
        const colMd6Tmp     = this.createOneElement('div', 'col-md-6 tmp', '');
        const tmpMinLogo    = this.createOneElement('i', 'fa fa-thermometer-half', '');
        const tmpMin        = this.createOneElement('span', '', 'minTmp'+this.id);
        const br            = this.createOneElement('br', '', '');
        const tmpMaxLogo    = this.createOneElement('i', 'fa fa-thermometer-half', '');
        const tmpMax        = this.createOneElement('span', '', 'maxTmp'+this.id);
        const colMd6Tmp2    = this.createOneElement('div', 'col-md-6 tmp', '');
        const wind          = this.createOneElement('div', '', 'wind'+this.id);
        const windDir       = this.createOneElement('div', '', 'windDir'+this.id);
        const itemInfo      = this.createOneElement('div', 'col itemInfo', '');
        const weatherCard   = this.createOneElement('div', 'weatherCard vertical-center', '');
        const imgWeather    = this.createOneElement('div', 'imgWeather', 'imgWeather'+this.id);
        const conditionName = this.createOneElement('div', 'conditionName', 'conditionName'+this.id);

        // Append
        colMd6Tmp2.appendChild(wind);
        colMd6Tmp2.appendChild(windDir);

        colMd6Tmp.appendChild(tmpMinLogo);
        colMd6Tmp.appendChild(tmpMin);
        colMd6Tmp.appendChild(br);
        colMd6Tmp.appendChild(tmpMaxLogo);
        colMd6Tmp.appendChild(tmpMax);

        rowDiv3.appendChild(colMd6Tmp);
        rowDiv3.appendChild(colMd6Tmp2);

        colMd6_3.appendChild(currentDeg);

        vertCenter.appendChild(todayName);
        vertCenter.appendChild(hourName);
        //colMd6_2.appendChild(vertCenter);

        rowDiv2.appendChild(vertCenter);
        rowDiv2.appendChild(colMd6_3);

        colMd8.appendChild(rowDiv2);
        colMd8.appendChild(rowDiv3);

        weatherCard.appendChild(imgWeather);
        weatherCard.appendChild(conditionName);
        itemInfo.appendChild(weatherCard);

        rowDiv1.appendChild(colMd8);
        rowDiv1.appendChild(itemInfo);
        colMd6.appendChild(rowDiv1);

        return colMd6;
    }

    /**
     * Create top right data: caroussel with week weather.
     * @returns {Object} Created element.
     */
    createTopRightInfo(){
        const colMd6        = this.createOneElement('div', 'col-md-6 fadeInRight', '');
        const carousselDiv  = this.createOneElement('div', 'carousel slide carousselDiv', 'carousselDiv'+this.id);
        carousselDiv.setAttribute('data-ride','carousel');

        const ul            = this.createOneElement('ul', 'carousel-indicators', '');
        const li1           = this.createOneElement('li', 'active', '');
        const li2           = this.createOneElement('li', '', '');
        li1.setAttribute('data-target','#carousselDiv'+this.id);
        li1.setAttribute('data-slide-to','0');
        li2.setAttribute('data-target','#carousselDiv'+this.id);
        li2.setAttribute('data-slide-to','1');

        const carouselInner = this.createOneElement('div', 'carousel-inner', '');
        const itemActive    = this.createOneElement('div', 'carousel-item active', '');
        const item          = this.createOneElement('div', 'carousel-item', '');
        
        const prevLink      = this.createOneElement('a', 'carousel-control-prev', '');
        prevLink.setAttribute('href','#carousselDiv'+this.id);
        prevLink.setAttribute('data-slide','prev');

        const nextLink      = this.createOneElement('a', 'carousel-control-next', '');
        nextLink.setAttribute('href','#carousselDiv'+this.id);
        nextLink.setAttribute('data-slide','next');

        const spanPrev      = this.createOneElement('span', 'carousel-control-prev-icon', '');
        const spanNext      = this.createOneElement('span', 'carousel-control-next-icon', '');

        // Append
        ul.appendChild(li1);
        ul.appendChild(li2);
        carousselDiv.appendChild(ul);

        itemActive.appendChild(this.createOneContentItem([0,1,2]));
        item.appendChild(this.createOneContentItem([3,4]));
        carouselInner.appendChild(itemActive);
        carouselInner.appendChild(item);
        carousselDiv.appendChild(carouselInner);

        prevLink.appendChild(spanPrev);
        nextLink.appendChild(spanNext);

        carousselDiv.appendChild(prevLink);
        carousselDiv.appendChild(nextLink);
        colMd6.appendChild(carousselDiv);

        return colMd6;
    }

    /**
     * Create a caroussel 'frame' with data weather.
     * @param {List} numList - List of day to add. 
     * @returns {Object} Created element.
     */
    createOneContentItem(numList){
        const row = this.createOneElement('div', 'row', '');
        numList.forEach(num => {
            const colMd4        = this.createOneElement('div', 'col-md-4', '');
            const dayInfoBold   = this.createOneElement('div', 'dayInfo bold', '');
            const daySpan       = this.createOneElement('span', '', 'dayName_'+num+this.id);
            const dayInfoSmall  = this.createOneElement('div', 'dayInfo small', '');
            const dateSpan      = this.createOneElement('span', '', 'dateName_'+num+this.id); 
            const tmpDiv        = this.createOneElement('div', '', '');
            const imgName       = 'imgWeather_'+num;
            const img           = this.createOneElement('div','',imgName+this.id);
            const minMaxTmp     = this.createOneElement('span', 'small bold', 'minMaxTmp_'+num+this.id);

            // Append
            tmpDiv.appendChild(img);
            tmpDiv.appendChild(minMaxTmp);
            dayInfoSmall.appendChild(dateSpan);
            dayInfoBold.appendChild(daySpan);

            colMd4.appendChild(dayInfoBold);
            colMd4.appendChild(dayInfoSmall);
            colMd4.appendChild(tmpDiv);
            row.appendChild(colMd4);
        });
        
        return row;
    }

    /**
     * Create bottom data: weather by hour.
     * @returns {Object} Created element.
     */
    createBottomInfo(){
        const row = this.createOneElement('div', 'row displayHours zoomIn', 'displayHours'+this.id);
        return row;
    } 


    /* USEFUL */

    /**
     * Create a DOM element.
     * @param {String} element - The DOM element name. 
     * @param {Strinf} className - List of classes. 
     * @param {String} id - element id.
     * @returns {Object} Created element.
     */
    createOneElement(element, className, id){
        const el = document.createElement(element);
        (className != '') ? el.className = className: null;
        (id != '') ? el.id = id : null;
        return el;
    }

    /**
     * Close all collapse.
     */
    closeAllCollapse(){
        for(let i = 0; i<this.id; i++){
            const collapseDiv = document.getElementById('collapse'+i);
            if(collapseDiv.classList.contains("show")){
                collapseDiv.classList.remove("show");
            }
        }
    }  
}
export default CityHtmlBuilder;