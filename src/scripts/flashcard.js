import { wordsRef } from "./firebase-config.js";
import {onValue} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js"


// HTML elements
const flashcard = document.getElementById('flashcard');
const frontText = document.getElementById('front-text');
const backText = document.getElementById('back-text');
const scoreText = document.getElementById('score');
const knowButton = document.getElementById('knowButton');
const studyAgainButton = document.getElementById('studyAgainButton');
const sourceLanguageSelect = document.getElementById('sourceLanguage');
const targetLanguageSelect = document.getElementById('targetLanguage');

// Get the words from the database and display them
let wordsInDB = [];
onValue(wordsRef, function(snapshot){
    if (snapshot.exists()) {
        wordsInDB = Object.entries(snapshot.val())
        updateFlashcard(wordsInDB)
    }
    else{
        console.log("No words found...");
    }
})

// Variables for the flashcard
let currentWordIndex = 0;
let knownWordsCount = 0;


// Update the flashcard with the next word
function updateFlashcard(wordsList) {
    if (currentWordIndex < wordsList.length) {
        const currentWord = wordsList[currentWordIndex][1];
        const sourceLanguage = sourceLanguageSelect.value;
        const targetLanguage = targetLanguageSelect.value;

        if (sourceLanguage === targetLanguage) {
            backText.textContent = "Please select different languages.";
        } else {
            /*
            // Set the front text as the word in the source language and the back text as the target language's translation
            frontText.textContent = currentWord[sourceLanguage];
            backText.textContent = currentWord[targetLanguage];
*/

            // Désactiver les transitions temporairement
            flashcard.style.transition = 'none';
            frontText.style.transition = 'none';
            backText.style.transition = 'none';

            // Réinitialiser l'état de la carte à la face avant sans animation de retournement
            flashcard.classList.remove('flip', 'fly-away', 'move-back');

            // Mettre à jour le contenu de la carte
            frontText.textContent = currentWord[sourceLanguage];
            backText.textContent = currentWord[targetLanguage];

            // Forcer le reflow pour que le navigateur applique les changements immédiatement
            flashcard.offsetHeight;

            // Réactiver les transitions
            flashcard.style.transition = '';
            frontText.style.transition = '';
            backText.style.transition = '';
        }

        scoreText.textContent = `Cartes Connues : ${knownWordsCount}/${wordsList.length}`;

        // Réinitialiser l'état de la carte à la face avant sans animation de retournement
        flashcard.classList.remove('flip', 'fly-away', 'move-back');
    } else {
        flashcard.style.display = 'none';
        scoreText.textContent = `Terminé ! Score final : ${knownWordsCount}/${wordsList.length}`;
    }
}


// gestion du click sur la carte, retourne le mot
flashcard.addEventListener('click', () => {
    console.log("flashcard clicked");
    flashcard.classList.toggle('flip');
});


// Gestion du bouton "Je connais le mot"
knowButton.addEventListener('click', () => {
    if (currentWordIndex < wordsInDB.length) {
        flashcard.classList.add('fly-away');
        setTimeout(() => {
            knownWordsCount++;
            currentWordIndex++;
            updateFlashcard(wordsInDB);
        }, 600); // Attendre que l'animation se termine
    }
});

// Gestion du bouton "Étudier encore"
studyAgainButton.addEventListener('click', () => {
    if (currentWordIndex < wordsInDB.length) {
        // Déplacer la carte actuelle à la fin de la liste
        const currentWord = wordsInDB.splice(currentWordIndex, 1)[0];
        wordsInDB.push(currentWord);
        flashcard.classList.add('move-back');
        setTimeout(() => {
            updateFlashcard(wordsInDB);
        }, 600); // Attendre que l'animation se termine
    }
});


// Update the flashcard when the language changes
[sourceLanguageSelect, targetLanguageSelect].forEach(select => {
    select.addEventListener('change', () => {
        updateFlashcard(wordsInDB);
    });
});
