const cards = document.querySelectorAll('.memory-card');
let hasFlipCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
    if(lockBoard)
     return;
    if(this === firstCard) 
     return;
    this.classList.add('flip');
    if(!hasFlipCard ){
        hasFlipCard=true;
        firstCard = this;
        return;
    }
    secondCard = this;
    checkForMatch();    
}

let checkForMatch = () =>{
    let isMatch = firstCard.dataset.frame === secondCard.dataset.frame;
    isMatch ? disableCards() : unFlipCards();
}

function unFlipCards(){
    lockBoard =true;
    setTimeout(()=>{
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        // lockBoard = false;
        resetBoard();
    } , 1000);
}


function disableCards() {
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);
    resetBoard();
}

function resetBoard(){
    [hasFlipCard,lockBoard] = [false,false];
    [firstCard, secondCard] = [null,null];
}

(function shuffleCards(){
    cards.forEach(card => {
        let randomPics = Math.floor(Math.random()*12);
        card.style.order = randomPics;
    });
}) ();

cards.forEach(card => card.addEventListener('click', flipCard));
