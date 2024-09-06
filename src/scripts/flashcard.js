import {wordsRef} from "./firebase-config.js";
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
const categoryEl = document.getElementById('category');  // New category selector
const hintButton = document.getElementById('hintButton');
const hintText = document.getElementById('hintText');

let selectedCategory = 'animals';  // Default category



// Get the words from the database and display them
let wordsInDB = [];
let filteredWords = [];
onValue(wordsRef, function(snapshot){
    if (snapshot.exists()) {
        wordsInDB = Object.entries(snapshot.val())

        filteredWords = wordsInDB.filter(word => word[1].category === selectedCategory || selectedCategory === 'allCategories');

        updateFlashcard(filteredWords)
    }
    else{
        console.log("No words found...");
    }
})



// Variables for the flashcard
let currentWordIndex = 0;
let knownWordsCount = 0;


// Update the flashcard with the next word
function updateFlashcard(words) {

    //const filteredWords = words.filter(word => word[1].category === selectedCategory);

    if (currentWordIndex < filteredWords.length) {
        const currentWord = filteredWords[currentWordIndex][1];
        const sourceLanguage = sourceLanguageSelect.value;
        const targetLanguage = targetLanguageSelect.value;

        if (sourceLanguage === targetLanguage) {
            backText.textContent = "Please select different languages.";
        } else {

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

        scoreText.textContent = `Known cards: ${knownWordsCount}/${filteredWords.length}`;

        // Réinitialiser l'état de la carte à la face avant sans animation de retournement
        flashcard.classList.remove('flip', 'fly-away', 'move-back');
    } else {
        flashcard.style.display = 'none';
        scoreText.textContent = `Finished, well done! Final score: ${knownWordsCount}/${filteredWords.length}`;
    }
}


// gestion du click sur la carte, retourne le mot
flashcard.addEventListener('click', () => {
    console.log("flashcard clicked");
    flashcard.classList.toggle('flip');
});


// Gestion du bouton "Je connais le mot"
knowButton.addEventListener('click', () => {
    if (currentWordIndex < filteredWords.length) {
        flashcard.classList.add('fly-away');
        setTimeout(() => {
            knownWordsCount++;
            currentWordIndex++;
            updateFlashcard(filteredWords);
        }, 600); // Attendre que l'animation se termine
    }
    hintText.classList.remove('show');
});

// Gestion du bouton "Étudier encore"
studyAgainButton.addEventListener('click', () => {
    if (currentWordIndex < filteredWords.length) {
        // Déplacer la carte actuelle à la fin de la liste
        const currentWord = filteredWords.splice(currentWordIndex, 1)[0];
        filteredWords.push(currentWord);
        flashcard.classList.add('move-back');
        setTimeout(() => {
            updateFlashcard(filteredWords);
        }, 600); // Attendre que l'animation se termine
    }
    hintText.classList.remove('show');
});


// Update the flashcard when the language changes
[sourceLanguageSelect, targetLanguageSelect].forEach(select => {
    select.addEventListener('change', () => {
        updateFlashcard(filteredWords);
    });
});

// Listen for changes in the selected category
categoryEl.addEventListener('change', function(){
    selectedCategory = categoryEl.value;
    filteredWords = wordsInDB.filter(word => word[1].category === selectedCategory || selectedCategory === 'allCategories');

    updateFlashcard(filteredWords);
});



 hintButton.addEventListener('click', async () => {
    const currentWord = filteredWords[currentWordIndex][1];
    const sourceLanguage = sourceLanguageSelect.value;
    const targetLanguage = targetLanguageSelect.value;

    // Mettre à jour le texte d'indice
    hintText.textContent = await getHint(currentWord[sourceLanguage], targetLanguage, selectedCategory , sourceLanguage);

    // Ajouter la classe pour l'animation
    hintText.classList.add('show');

    // Supprimer la classe après un délai pour réinitialiser l'animation lors du prochain clic
    setTimeout(() => {
        hintText.classList.remove('show');
    }, 20000); // Garder l'indice visible pendant 20 secondes
});

async function getHint(word, language, category, sourceLanguage) {
    // Use a netlify function to get the definition from the API

    try {
        const response = await fetch('/.netlify/functions/hint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                word,
                targetLanguage: language,
                sourceLanguage,
                category : categoryEl.value,
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.hint;
    } catch (error) {
        console.error('Error:', error);
        return 'Hint not found';
    }
}