function addCard(name){
    var img = document.createElement('img'); 
    img.src = getRandomCard(); 
    document.getElementById(name).appendChild(img); 
    if(name == "playerCard"){
        cardList.push(img);
    }
    if(name == "bankCard"){
        bankList.push(img);
    }
}

function initDeck(){
    var num = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
    var fam = ['c','d','h','s'];
    var pos = 0;
    for(var i=0; i<num.length; i++){
        for(var j=0; j<fam.length; j++){
            cards[pos] = 'assets/cartes-gif/'+num[i]+fam[j]+'.gif';
            cardsValue[pos] = i+2;
            pos+=1;
        }
    }
}

function removeElement(array, elem) {
    var index = array.indexOf(elem);
    if (index > -1) {
        array.splice(index, 1);
    }
}

function getRandomCard(){
    i = Math.floor(Math.random() * cards.length);
    c = cards[i]; 
    v = cardsValue[i];
    removeElement(cards, c);
    removeElement(cardsValue, v);
    value+=v;
    return c;
}

function computePlayerScore(){
    document.getElementById('score').innerHTML = value;
}

function playerTurn(){
    addCard("playerCard");
    computePlayerScore();
    if(value > 21){
        displayGameOverScreen();
    }
}

function displayGameOverScreen(){
    // Hide elements
    var divsToHide = document.getElementsByClassName("container-fluid"); //divsToHide is an array
    for(var i = 0; i < divsToHide.length; i++){
        divsToHide[i].style.display = "none"; // depending on what you're doing
    }
    // Bg color
    var style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet.insertRule('body {background-color: rgba(200,200,200,.5);}');

    // Div
    var d = document.createElement("div");
    d.style.textAlign = "center;";
    d.style.margin = "5em auto;";

    // Create text
    var h = document.createElement("h1");
    var t = document.createTextNode("Game Over ! Your score: "+value);
    h.appendChild(t);
    d.appendChild(h);

    // Create Button
    var btn = document.createElement("input");
    btn.type = "button";
    btn.value = "Replay";
    d.appendChild(btn);
    document.body.appendChild(d);

    btn.addEventListener ("click", function() {
        var divsToHide = document.getElementsByClassName("container-fluid"); //divsToHide is an array
        for(var i = 0; i < divsToHide.length; i++){
            divsToHide[i].style.display = "block"; // depending on what you're doing
        }
        var style = document.createElement('style');
        document.head.appendChild(style);
        style.sheet.insertRule('body {background-color: white;}');
        d.style.display = 'None';
        var cards = document.getElementsByTagName("img");
        for(var i = 0; i < divsToHide.length; i++){
            cards[i].style.display = "None"; // depending on what you're doing
        }
        cardsValue  = [];
        cards       = [];
        cardList    = [];
        value       = 0;
        initDeck();
        addCard("bankCard");
        value = 0;
        addCard("playerCard");
        computePlayerScore();

    });

    // Display player card
    var br = document.createElement("br");
    d.appendChild(br);
    for(var i=0; i<cardList.length; i++){
        d.appendChild(cardList[i]); 
    }

}



var cardsValue  = [];
var cards       = [];
var cardList    = [];
var bankList    = [];
var value       = 0;

initDeck();
addCard("bankCard");
value = 0;
addCard("playerCard");
computePlayerScore();