const cardBoard = document.querySelector('.cards')
let images = [
    'caitlyn.jpg',
    'ekko.jpg',
    'jayce.jpg',
    'jinx.jpg',
    'medarda.jpg',
    'vi.jpg',
    'viktor.jpg'
];
images.sort(comparador)
let cardHTML = [];
cardNum = false;
let firstCard = null;
let secondCard = null;
let blockCards = null;
let jogadas = 0;
let sec = 0;

startGame()

const timer = document.querySelector('.timer');
function incrementSeconds() {
    sec++
    timer.innerHTML = `Time: ${sec}s`
}

function startGame() {
    cardNum = parseInt(prompt('Com quantas cartas deseja jogar? \nSó aceitamos numeros pares entre 4 e 14.'))
    if (cardNum > 1 && cardNum < 15 && (cardNum % 2) == 0 && cardNum !== 2) {
        createGame();
    } else {
        startGame();
    }
}

function createGame() {
    timePlayed = setInterval(incrementSeconds, 1000);
    cardNum = images.length - (cardNum / 2);
    images.splice(0, cardNum);
    images = [...images, ...images];
    images.sort(comparador)
    victory = images.length;
    images.forEach(backImg => {
        cardHTML += `
        <div class="card" data-identifier="card">
            <img class="front-face" src="img/logo.jpg" data-identifier="back-face">
            <img class="back-face" src="img/${backImg}" data-identifier="front-face">
        </div>    
    `
    });
    cardBoard.innerHTML = cardHTML;
}

const allCards = document.querySelectorAll('.card');
allCards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
    if (blockCards) return false;
    this.classList.add('flip')
    if (firstCard == null) {
        firstCard = this;
        jogadas++
        firstCard.removeEventListener('click', flipCard);
        return false;
    }
    secondCard = this;
    jogadas++
    secondCard.removeEventListener('click', flipCard);
    checkCards()
}

function checkCards() {
    let isMatch = firstCard.childNodes[3].src === secondCard.childNodes[3].src
    firstCard.addEventListener('click', flipCard);
    secondCard.addEventListener('click', flipCard);
    if (isMatch == false) {
        disableCards()
    } else {
        resetCards(isMatch);
    }
}

function disableCards() {
    blockCards = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetCards();
    }, 1000)
}

function resetCards(equalCards) {
    if (equalCards == true) {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        victory = victory - 2;
        if (victory == 0) {
            setTimeout(winner, 1200)
        }
    }
    firstCard = null;
    secondCard = null;
    blockCards = false;
}

function comparador() {
    return Math.random() - 0.5;
}

function winner() {
    clearInterval(timePlayed);
    alert(`Você ganhou em ${jogadas} jogadas!\nTempo: ${sec} segundos`);
    let restart = prompt('Deseja reiniciar a partida?\nsim ou nao?')
    restart = restart.toUpperCase()
    if (restart === 'SIM' || restart === 'S' || restart === 'SI') {
        window.location.reload();
    }
}