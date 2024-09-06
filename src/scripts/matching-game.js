import { database } from "./firebase-config.js";
import {ref, onValue} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js"

const wordsInDB = ref(database, "words")


let wordsList = [];
let currentLanguage = 'english';
let currentWord = null;
let score = 0;

let selectedCategory = 'animals';  // Default category


// Références aux éléments HTML
const languageSelect = document.getElementById('language-select');
const wordElement = document.getElementById('word');
const imagesContainer = document.getElementById('images');
const scoreElement = document.getElementById('score');
const messageElement = document.getElementById('message');
const categoryEl = document.getElementById('category');  // New category selector


// Écouter les modifications de la sélection de la langue
languageSelect.addEventListener('change', (e) => {
    currentLanguage = e.target.value;
    startGame();
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

    // Filter words based on selected category
    const filteredWords = wordsList.filter(word => word[1].category === selectedCategory || selectedCategory === 'allCategories');
    if (filteredWords.length === 0) return;
    // Sélectionner un mot aléatoire
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    currentWord = filteredWords[randomIndex];


    // Mélanger les images
    const shuffledWords = [...filteredWords].sort(() => 0.5 - Math.random());
    const options = shuffledWords.slice(0, 4);

    // S'assurer que l'image correcte est dans les options
    if (!options.includes(currentWord)) {
        options.pop();
        options.push(currentWord);
    }

    // Mélanger à nouveau les options
    options.sort(() => 0.5 - Math.random());


    // Créer un fragment pour regrouper les images
    const fragment = document.createDocumentFragment();

    // Précharger les images
    const preloadImages = options.map(word => {
        return new Promise((resolve) => {
            const imgElement = new Image();
            imgElement.src = word[1].imgURL;
            imgElement.alt = word[1][currentLanguage];
            imgElement.addEventListener('click', () => checkAnswer(word));
            imgElement.onload = () => resolve(imgElement);
        });
    });

    // Une fois toutes les images préchargées, les ajouter au DOM
    Promise.all(preloadImages).then(images => {
        imagesContainer.innerHTML = ''; // Clear previous images
        images.forEach(img => {
            fragment.appendChild(img);
        });
        imagesContainer.appendChild(fragment); // Append all images at once
        wordElement.textContent = currentWord[1][currentLanguage];
        messageElement.textContent = '';
    });
}

// Vérifier la réponse sélectionnée
function checkAnswer(selectedWord) {
    if (selectedWord === currentWord) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
        messageElement.textContent = 'Correct answer!';
        messageElement.style.color = ''; // Réinitialiser la couleur (par défaut ou autre)
        setTimeout(() => {
            //messageElement.textContent = '';
            showNewWord();
        }, 10);
    } else {
        messageElement.textContent = 'Incorrect! End of the game!';
        messageElement.style.color = 'red'; // Appliquer la couleur rouge directement
        setTimeout(startGame, 5000);
    }
}