//sätter globala variabler
let roundsPlayed = 1;
let headline = document.querySelector('h2');
let rules = document.querySelector('p');
let welcomeMessage = document.querySelector('h3');
let diceNumber = document.querySelector('#dice');
let currentRound = document.querySelector('#currentRound');
let currentRoundPoints = 0;
let comments = document.querySelector('#comments');
let totalPoints = document.querySelector('#totalPoints');
let nrOfRounds = document.querySelector('#nrOfRounds');
const btnDice = document.querySelector('#rollDice');
btnDice.addEventListener('click', rollDice);
const btnFreeze = document.querySelector('#freeze');
btnFreeze.addEventListener('click', freeze);
let total = 0;

function startup(){
headline.innerText = 'Hej och välkommen';
welcomeMessage.innerText = 'Mata in ditt namn för att BÖRJA SPELA';
btnDice.disabled=true;
btnFreeze.disabled=true;
document.body.style.backgroundColor = 'white'; 
}

startup();

//hämtar in spelarens namn för att dra igång omgången
const formEl = document.querySelector('form');
formEl.addEventListener('submit', startGame);
formEl.reset();

function startGame(event){
    event.preventDefault();
    const enteredName = formEl.querySelector('input').value;
    welcomeMessage.innerText = `TACK, nu kör vi ${enteredName}`;
    rules.innerHTML = 'Nu ska vi spela gris. Målet är att komma till 100 poäng. Varje omgång går till så att <br> du slår tärningen. Får du siffrorna 2-6 är det bara att fortsätta, de sparas men slår du en etta förlorar du poängen. <br> När som helst kan du spara dina poäng, då går turen över till nästa spelare';
    diceNumber.innerText = 'Här syns tärningen';
    currentRound.innerText = 'här kommer aktuella rundan';
    formEl.style.display = 'none';
    btnDice.disabled=false;
    formEl.reset();
    btnFreeze.disabled=false;
}

function rollDice(event){
    const randomNumber = Math.ceil( Math.random()*6);
    event.preventDefault();
    diceNumber.innerText = (randomNumber);
    comments.innerText =' ';
    btnDice.innerText = 'SLÅ TÄRNINGEN';
    nrOfRounds.innerText = `Antal rundor spelade: ${roundsPlayed}`;
    if (randomNumber == 1){
        roundsPlayed++;
        comments.innerText = 'Otur, du fick en etta, inga poäng denna rundan';
        btnDice.innerText = 'starta om';
        currentRoundPoints = 0;
        btnFreeze.disabled=true;
    } else {
        currentRoundPoints = (currentRoundPoints + randomNumber);
        console.log(`poängen just denna rundan är ${currentRoundPoints}`);
        currentRound.innerText = `poängen denna runda är ${currentRoundPoints}`;
        btnFreeze.disabled=false;
    }
}

function freeze (event){
    event.preventDefault();
    total = total + currentRoundPoints;
    btnDice.innerText = 'starta om';
    comments.innerText = 'Din poäng är sparad, fortsätt spela';
    console.log(`du har totalt ${total} poäng`);
    console.log(`du har spelat ${roundsPlayed} rundor`);
    currentRoundPoints = 0;
    totalPoints.innerText = `din totala poäng är ` + total;
    roundsPlayed++;  
    if (total>=100){
        checkWin();
    }
}
    
function checkWin(){
    rules.innerHTML = `Grattis, du klarade det på <h2> ${roundsPlayed}</h2> rundor, vill du spela igen , uppdatera sidan`;
    document.body.style.backgroundColor = 'lightgreen';
    btnDice.disabled=true;
    btnFreeze.disabled=true;
    headline.innerText = `YEEES BRA JOBBAT `;
    welcomeMessage.innerText = 'VAD DUKTIG DU ÄR';
    comments.style.display = 'none';
}
