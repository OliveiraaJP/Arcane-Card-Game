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
cardNum = null;
StartGame()

let firstCard = null;
let secondCard = null;


function StartGame() {
    cardNum = parseInt(prompt('Com quantas cartas deseja jogar? \nSó aceitamos numeros pares entre 4 e 14.'))
    if (cardNum > 1 && cardNum < 15 && (cardNum % 2) == 0 && cardNum !== 2) {

        DispoeNaTela();
    } else {
        StartGame();
    }
}

function DispoeNaTela() {
    cardNum = images.length - (cardNum/2);
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
    
    // images.sort(comparador)
    // images.forEach(backImg => {
    //     cardHTML += `
    //     <div class="card">
    //         <img class="front-face" src="img/front.png">
    //         <img class="back-face" src="img/${backImg}">
    //     </div>    
    // `
    // });
    // cardBoard.innerHTML = cardHTML;
}



const allCards = document.querySelectorAll('.card');
allCards.forEach(card => card.addEventListener('click', flipCard));

function flipCard() {
    this.classList.toggle('flip')
}

function comparador() {
    return Math.random() - 0.5;
}

