import {wordsRef } from "./firebase-config.js";
import {onValue} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js"
import {addWordsToDatabaseWithCheck} from "./main.js";


// Languages selected by default
let selectedLanguage1 = 'english';
let selectedLanguage2 = 'french';

let selectedCategory = 'animals';  // Default category



// HTML elements
const wordsListEl = document.getElementById('words-list');
const language1El = document.getElementById('sourceLanguage');
const language2El = document.getElementById('targetLanguage');
const categoryEl = document.getElementById('category');  // New category selector
const inputContainer = document.getElementById("inputContainer");
const addWordBtn = document.getElementById("addButton");



// Get the words from the database and display them
let wordsInDB = [];
onValue(wordsRef, function(snapshot){
    if (snapshot.exists()) {
        wordsInDB = Object.entries(snapshot.val())
        displayWords(wordsInDB)
    }
    else{
        console.log("No words found...");
    }
})


// Function to read aloud a word
function speak(word, language) {
    switch(language) {
        case "english":
            language = "en";
            break;
        case "french":
            language = "fr";
            break;
        case "german":
            language = "de";
            break;
        case "italian":
            language = "it";
            break;
        case "japanese":
            language = "ja";
            break;
        case "spanish":
            language = "es";
            break;
        case "vietnamese":
            language = "vi";
            break;
        default:
            language = "en";
    }
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = language;
    synth.speak(utterance);
}

// Display the words in the "words-list" section
function displayWords(words) {
    wordsListEl.innerHTML = '';

    // Filter words based on selected category
    const filteredWords = words.filter(word => word[1].category === selectedCategory || selectedCategory === "allCategories");


    // Loop through the words and display them with the selected languages
    for (let i = 0; i < filteredWords.length; i++) {
        const wordPair = document.createElement('div');
        wordPair.classList.add('word-pair');

        const lang1Word = filteredWords[i][1][language1El.value];
        const lang2Word = filteredWords[i][1][language2El.value];

        // Create word elements with click event to toggle definitions
        const lang1WordEl = document.createElement('span');
        lang1WordEl.textContent = lang1Word;
        lang1WordEl.classList.add('word');
        lang1WordEl.addEventListener('click', () => toggleDefinition(filteredWords[i][1], wordPair, selectedLanguage1));

        const lang2WordEl = document.createElement('span');
        lang2WordEl.textContent = lang2Word;
        lang2WordEl.classList.add('word');
        lang2WordEl.addEventListener('click', () => toggleDefinition(filteredWords[i][1], wordPair, selectedLanguage2));


        // Sound icons for pronunciation
        const soundIcon1 = document.createElement('img');
        soundIcon1.src = '../images/sound-icon.png';  // Path to your sound icon image
        soundIcon1.classList.add('sound-icon');
        soundIcon1.addEventListener('click', () => speak(lang1Word, selectedLanguage1));

        const soundIcon2 = document.createElement('img');
        soundIcon2.src = '../images/sound-icon.png';  // Path to your sound icon image
        soundIcon2.classList.add('sound-icon');
        soundIcon2.addEventListener('click', function(){speak(lang2Word, selectedLanguage2);
            console.log("yay")})

        lang1WordEl.appendChild(soundIcon1);
        lang2WordEl.appendChild(soundIcon2);
        wordPair.appendChild(lang1WordEl);
        wordPair.appendChild(lang2WordEl);
        wordsListEl.appendChild(wordPair);
    }
    addSoundIconEventListeners();
}


function toggleDefinition(word, wordPair, language) {
    // Vérifie si la définition existe déjà
    let definitionEl = wordPair.querySelector('.definition');

    if (definitionEl) {
        // Toggle l'affichage avec une animation de slide-up/down
        if (definitionEl.style.maxHeight === "0px" || !definitionEl.style.maxHeight) {
            definitionEl.style.maxHeight = definitionEl.scrollHeight + "px";
            definitionEl.style.padding =  "15px";

        } else {
            definitionEl.style.maxHeight = "0px"; // Masque complètement la définition
            setTimeout(() => {
                definitionEl.style.padding = "0px";            }, 300);
        }
    } else {
        // Sinon, crée un nouvel élément de définition
        definitionEl = document.createElement('div');
        definitionEl.classList.add('definition');

        // Image
        const imgElement = document.createElement('img');
        imgElement.src = word.imgURL;
        imgElement.alt = word.english;

        // Texte
        const textElement = document.createElement('div');
        textElement.textContent = `Définition et exemple en ${language}: Exsistit autem hoc loco quaedam quaestio subdifficilis...`;

        // Ajoute l'image et le texte à l'élément de définition
        definitionEl.appendChild(imgElement);
        definitionEl.appendChild(textElement);

        // Ajoute l'élément de définition en dessous des mots
        wordPair.appendChild(definitionEl);

        // Attendre que l'image soit complètement chargée avant de déclencher l'animation
        imgElement.onload = () => {
            // Déclenche la transition en définissant la max-height à la hauteur du contenu
            definitionEl.style.maxHeight = definitionEl.scrollHeight + "px";
            definitionEl.style.padding =  "15px";
        };
    }
}

function preventToggle(event) {
    event.stopPropagation();
}

// Add event listener to stop sound icon clicks from toggling the definition
function addSoundIconEventListeners() {
    const soundIcons = document.querySelectorAll('.sound-icon');
    soundIcons.forEach(icon => {
        icon.addEventListener('click', preventToggle);
    });
}




// Listen for changes in the selected languages
language1El.addEventListener('change', function(){
    selectedLanguage1 = language1El.value;
    displayWords(wordsInDB);
});
language2El.addEventListener('change', function(){
    selectedLanguage2 = language2El.value;
    displayWords(wordsInDB);
});

// Listen for changes in the selected category
categoryEl.addEventListener('change', function(){
    selectedCategory = categoryEl.value;
    displayWords(wordsInDB);

    // if the selected category is "myWords", enable the input container
    if (selectedCategory === "myWords") {
        inputContainer.style.display = "flex"; // Afficher le conteneur si la catégorie est "myWords"
    } else {
        inputContainer.style.display = "none"; // Cacher le conteneur sinon
    }

});


//ajout des mots personnalisés:

// Simulation de l'appel API pour obtenir les traductions dans les autres langues
function getTranslations(word, language) {
    // Remplacez par l'appel à l'API OpenAI dans la version finale
    return {
        french: word + "Fr",
        english: word + "En",
        spanish: word + "Sp",
        vietnamese: word + "Vn",
        japanese: word + "Jp",
        german: word + "Gr",
        italian: word + "It"
    };
}

addWordBtn.addEventListener("click", addWord);

// Fonction pour ajouter un mot
function addWord() {
    const language = document.getElementById("languageInput").value.trim();
    const word = document.getElementById("wordInput").value.trim();
    const imgUrl = document.getElementById("urlInput").value.trim();
    const category = categoryEl.value;
console.log("in the addWord function")
    if (language && word && imgUrl && category === "myWords") {
        // Simuler l'obtention des traductions
        const translations = getTranslations(word, language);

        // Appeler la fonction pour ajouter les mots à la base de données
        addWordsToDatabaseWithCheck(
            translations.french,
            translations.english,
            translations.spanish,
            translations.vietnamese,
            translations.japanese,
            translations.german,
            translations.italian,
            imgUrl,
            category
        );

        // Réinitialiser les champs d'entrée
        document.getElementById("languageInput").value = "";
        document.getElementById("wordInput").value = "";
        document.getElementById("urlInput").value = "";
    } else {
        alert("Please fill in all the input fields");
    }
}