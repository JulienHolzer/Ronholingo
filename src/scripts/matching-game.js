import { database } from "./firebase-config.js";
import {ref, get, set, push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js"

const wordsInDB = ref(database, "words")


let wordsList = [];
let currentLanguage = 'english';
let currentWord = null;
let score = 0;

// Références aux éléments HTML
const languageSelect = document.getElementById('language-select');
const wordElement = document.getElementById('word');
const imagesContainer = document.getElementById('images');
const scoreElement = document.getElementById('score');
const messageElement = document.getElementById('message');

// Écouter les modifications de la sélection de la langue
languageSelect.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    startGame();
});


onValue(wordsInDB, function(snapshot){
    if (snapshot.exists()) {
        wordsList = Object.entries(snapshot.val())
        console.log("words : ");
        console.log(wordsList);
        startGame()
    }
    else{
        wordElement.textContent = "No words found...";
    }
})

// Démarrer le jeu
function startGame() {
    score = 0;
    scoreElement.textContent = `Score : ${score}`;
    messageElement.textContent = '';
    showNewWord();
}

// Afficher un nouveau mot et des images
function showNewWord() {
    if (wordsList.length === 0) return;
    // Sélectionner un mot aléatoire
    const randomIndex = Math.floor(Math.random() * wordsList.length);
    currentWord = wordsList[randomIndex];
    wordElement.textContent = currentWord[1][currentLanguage];


    // Mélanger les images
    const shuffledWords = [...wordsList].sort(() => 0.5 - Math.random());
    const options = shuffledWords.slice(0, 4);

    // S'assurer que l'image correcte est dans les options
    if (!options.includes(currentWord)) {
        options.pop();
        options.push(currentWord);
    }

    // Mélanger à nouveau les options
    options.sort(() => 0.5 - Math.random());

    // Afficher les images
    imagesContainer.innerHTML = '';
    options.forEach((word) => {
        const imgElement = document.createElement('img');
        imgElement.src = word[1].imageURL;
        imgElement.alt = word[1][currentLanguage];
        imgElement.addEventListener('click', () => checkAnswer(word));
        imagesContainer.appendChild(imgElement);
    });
}

// Vérifier la réponse sélectionnée
function checkAnswer(selectedWord) {
    if (selectedWord === currentWord) {
        score++;
        scoreElement.textContent = `Score : ${score}`;
        messageElement.textContent = 'Correct !';
        setTimeout(() => {
            messageElement.textContent = '';
            showNewWord();
        }, 1000);
    } else {
        messageElement.textContent = 'Incorrect ! Fin de la partie !';
        setTimeout(startGame, 2000);
    }
}