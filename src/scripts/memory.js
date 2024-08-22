import { database } from "./firebase-config.js";
import {ref, get, set, push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js"

const wordsInDB = ref(database, "words")


let wordsList = [];
let selectedLanguage1 = 'english';
let selectedLanguage2 = 'french';
let flippedCards = [];
let matchedPairs = 0;

let selectedCategory = 'animals';  // Default category


// Références aux éléments HTML
const lang1Select = document.getElementById('lang1-select');
const lang2Select = document.getElementById('lang2-select');
const startGameButton = document.getElementById('start-game');
const gameBoard = document.getElementById('game-board');
const messageElement = document.getElementById('message');
const categoryEl = document.getElementById('category');  // New category selector


// Écouter les modifications de la sélection des langues
lang1Select.addEventListener('change', (e) => {
    selectedLanguage1 = e.target.value;
    console.log(selectedLanguage1);
    startGame()
});

lang2Select.addEventListener('change', (e) => {
    selectedLanguage2 = e.target.value;
    console.log(selectedLanguage2);
    startGame()
});

// Listen for changes in the selected category
categoryEl.addEventListener('change', function(){
    selectedCategory = categoryEl.value;
    startGame()
});



onValue(wordsInDB, function(snapshot){
    if (snapshot.exists()) {
        wordsList = Object.entries(snapshot.val())
        startGame()
    }
    else{
        messageElement.textContent = "No words found...";
    }
})

// Démarrer le jeu
function startGame() {
    if (selectedLanguage1 === selectedLanguage2) {
        messageElement.textContent = "Veuillez sélectionner deux langues différentes.";
        return;
    }
    messageElement.textContent = '';
    matchedPairs = 0;
    gameBoard.innerHTML = '';
    createBoard();
}

// Créer le plateau de jeu
function createBoard() {

    // Filter words based on selected category
    const filteredWords = wordsList.filter(word => word[1].category === selectedCategory || selectedCategory === "allCategories");

    const selectedPairs = filteredWords.slice(0, 8); // Sélectionner 8 paires de mots
    const cardsArray = [];

    selectedPairs.forEach(word => {
        //cardsArray.push({ text: word[1][selectedLanguage1], id: word[selectedLanguage1] });
        //cardsArray.push({ text: word[1][selectedLanguage2], id: word[selectedLanguage1] });
        cardsArray.push({ text: word[1][selectedLanguage1], id: word[0] });
        cardsArray.push({ text: word[1][selectedLanguage2], id: word[0] });
    });

    // Mélanger les cartes
    cardsArray.sort(() => 0.5 - Math.random());

    // Créer les cartes et les ajouter au plateau
    cardsArray.forEach(card => {
        const cardElement = createCardElement(card);
        gameBoard.appendChild(cardElement);
    });
}

// Créer un élément de carte
function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.id = card.id;

    const frontFace = document.createElement('div');
    frontFace.classList.add('front');
    cardElement.appendChild(frontFace);

    const backFace = document.createElement('div');
    backFace.classList.add('back');
    backFace.textContent = card.text;
    cardElement.appendChild(backFace);

    cardElement.addEventListener('click', () => flipCard(cardElement));

    return cardElement;
}

// Gérer le retournement des cartes
function flipCard(cardElement) {
    if (flippedCards.length < 2 && !cardElement.classList.contains('flip')) {
        cardElement.classList.add('flip');
        flippedCards.push(cardElement);

        if (flippedCards.length === 2) {
            setTimeout(checkForMatch, 1000);
        }
    }
}

// Vérifier si deux cartes forment une paire
function checkForMatch() {
    const [card1, card2] = flippedCards;

    if (card1.dataset.id === card2.dataset.id) {
        card1.style.visibility = 'hidden';
        card2.style.visibility = 'hidden';
        matchedPairs++;
        if (matchedPairs === 8) {
            messageElement.textContent = 'Congratulations, you found all the pairs!';
        }
    } else {
        card1.classList.remove('flip');
        card2.classList.remove('flip');
    }

    flippedCards = [];
}
