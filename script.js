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
let cardsInGame = [];
cardNum = false;
StartGame()

let firstCard = null;
let secondCard = null;
let blockCards = null;


function StartGame() {
    cardNum = parseInt(prompt('Com quantas cartas deseja jogar? \nSó aceitamos numeros pares entre 4 e 14.'))
    if (cardNum > 1 && cardNum < 15 && (cardNum % 2) == 0 && cardNum !== 2) {

        DispoeNaTela();
    } else {
        StartGame();
    }
}

function DispoeNaTela() {
    cardNum = images.length - (cardNum / 2);
    images.splice(0, cardNum);
    images = [...images, ...images];
    images.sort(comparador)
    images.forEach(backImg => {
        cardHTML += `
        <div class="card">
            <img class="front-face" src="img/logo.jpg">
            <img class="back-face" src="img/${backImg}">
        </div>    
    `
    });
    cardBoard.innerHTML = cardHTML;
}



const allCards = document.querySelectorAll('.card');
allCards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
    if (blockCards) return false ;

    this.classList.add('flip')

    if (firstCard == null) {
        firstCard = this;

        return false;
    }

    secondCard = this;

    checkCards()
}

function checkCards() {
    let isMatch = firstCard.childNodes[3].src === secondCard.childNodes[3].src

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
    }, 1500)
}

function resetCards(equalCards){
    if(equalCards == true){
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
    }
    
    firstCard = null;
    secondCard = null;
    blockCards = false;
}


function comparador() {
    return Math.random() - 0.5;
}

