function addCard(name){
    var img = document.createElement('img'); 
    img.src = getRandomCard(name); 
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
            var pts = i < 8 ? i+2 : 10;
            cardsValue[pos] = pts;
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

function getRandomCard(name){
    i = Math.floor(Math.random() * cards.length);
    c = cards[i]; 
    v = cardsValue[i];
    removeElement(cards, c);
    removeElement(cardsValue, v);
    name == "playerCard" ? valuePlayer+=v : valueBank+=v; 
    return c;
}

function computePlayerScore(){
    document.getElementById('score').innerHTML = valuePlayer;
}

function computeBankScore(){
    document.getElementById('scoreBank').innerHTML = valueBank;
}


function playerTurn(){
    document.getElementById("blindInput").readOnly = true;
    blind = parseInt(document.getElementById("blindInput").value);
    addCard("playerCard");
    computePlayerScore();
    if(valuePlayer > 21){
        displayGameOverScreen();
    }
}

function hideAll(){
    // Hide elements
    var divsToHide = document.getElementsByClassName("container-fluid"); //divsToHide is an array
    for(var i = 0; i < divsToHide.length; i++){
        divsToHide[i].style.display = "none"; // depending on what you're doing
    }
    // Bg color
    var style = document.createElement('style');
    document.head.appendChild(style);
    style.sheet.insertRule('body {background-color: rgba(200,200,200,.5);}');
}


function displayEndScreen(message){
    hideAll();    
    // Div
    var d = document.createElement("div");
    d.style.textAlign = "center;";
    d.style.margin = "5em auto;";

    // Create text
    var h = document.createElement("h1");
    var t = document.createTextNode(message);
    h.appendChild(t);
    t = document.createElement("p");
    t.innerHTML = "Your score: "+valuePlayer+" | Bank score: "+valueBank;
    d.appendChild(h);
    d.appendChild(t);
    d.className = "centered";

    // Create Button
    var btn = document.createElement("input");
    btn.type = "button";
    btn.value = "Replay";
    btn.className = "btn btn-success";
    if(myMoney-blind <=0){
        btn.value = "No Money ! Start a party";
    }
    d.appendChild(btn);
    document.body.appendChild(d);
    

    btn.addEventListener ("click", function() {
        var divsToHide = document.getElementsByClassName("container-fluid");
        for(var i = 0; i < divsToHide.length; i++){
            divsToHide[i].style.display = "block";
        }
        var style = document.createElement('style');
        document.head.appendChild(style);
        d.style.display = 'None';
        var cards = document.getElementsByTagName("img");
        for(var i = 0; i < divsToHide.length; i++){
            cards[i].remove(); 
        }
        
        cardsValue   = [];
        cards        = [];
        cardList     = [];
        bankList = [];
        valuePlayer  = 0;
        valueBank    = 0;
        var finalBlind = 0;
        message == "Winner !" ? finalBlind += blind : finalBlind -= blind;
        myMoney     += finalBlind; 
        bankMoney   -= finalBlind;
        if(myMoney <=0){
            myMoney = 100;
            bankMoney = 100;
        }
        document.getElementById("blindInput").readOnly = false;
        document.getElementById("blindInput").max = myMoney;
        document.getElementById("blindInput").value = 10;
        initGame();
        

    });
    // Display bank card
    t = document.createElement("p");
    t.innerHTML = "BANK CARDS";
    t.className = "mediumText";
    d.appendChild(t);
    for(var i=0; i<bankList.length; i++){
        d.appendChild(bankList[i]); 
    }
    // Display player card
    t2 = document.createElement("p");
    t2.innerHTML = "PLAYER CARDS";
    t2.className = "mediumText";
    d.appendChild(t2);
    for(var i=0; i<cardList.length; i++){
        d.appendChild(cardList[i]); 
    }
   

}

function displayWinScreen(){
    displayEndScreen("Winner !")
}

function displayGameOverScreen(){
    displayEndScreen("Game over !");
}

function createNumInput(){
    var spanBlind = document.getElementById('blind');
    var input = document.createElement("input");
    input.type = "number";
    input.value = "10";
    input.min = "1";
    input.max = "100";
    input.id = "blindInput";
    spanBlind.appendChild(input);
}


function addColorMoney(id, money){
    var color = "greenColor";
    if(money < 50){
        color = "redColor";
    }else{
        if(money < 100){
            color = "orangeColor";
        }
    }
    document.getElementById(id).className = color;
}


function initMoney(){
    document.getElementById('myMoney').innerHTML    = myMoney;
    document.getElementById('bankMoney').innerHTML  = bankMoney;
    addColorMoney('myMoney', myMoney);
    addColorMoney('bankMoney', bankMoney);

}

function initGame(){
    initDeck();
    initMoney();
    addCard("bankCard");
    addCard("playerCard");
    addCard("playerCard");
    computePlayerScore();
    computeBankScore();
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
    

async function bankTurn(){
    while(valueBank < 17){
        await sleep(500);
        addCard("bankCard");
        computeBankScore();
    }
    (valuePlayer > valueBank || valueBank > 21) ? displayWinScreen() : displayGameOverScreen();
}

var blind           = 10;
var bankMoney       = 100;
var myMoney         = 100;

var cardsValue      = [];
var cards           = [];
var cardList        = [];
var bankList        = [];
valuePlayer = 0;
valueBank   = 0;
createNumInput();
initGame();