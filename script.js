let cardNum = null;
let cardsArray = [];



StartGame()

function StartGame() {
    cardNum = parseInt(prompt('Com quantas cartas deseja jogar?Só aceitamos numeros pares e abaixo de 14.'))
    if (cardNum > 1 && cardNum < 15 && (cardNum % 2) == 0) {
        cardsArray = document.querySelectorAll('.card')
        // cardsArray.sort(comparador);
        CreateGame();
    } else {
        StartGame();
    }
}

function CreateGame() {
    for (let i = 0; i < cardNum; i++) {
        console.log('evelyn')
        cardsArray[i].classList.add('showCard')
    }
}


// minhaArray.sort(comparador); // Após esta linha, a minhaArray estará embaralhada


// Esta função pode ficar separada do código acima, onde você preferir
function comparador() { 
	return Math.random() - 0.5; 
}