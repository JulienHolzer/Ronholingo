import {wordsRef } from "./firebase-config.js";
import {onValue} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js"


// Languages selected by default
let selectedLanguage1 = 'english';
let selectedLanguage2 = 'french';


// HTML elements
const wordsListEl = document.getElementById('words-list');
const language1El = document.getElementById('sourceLanguage');
const language2El = document.getElementById('targetLanguage');


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
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = language;
    synth.speak(utterance);
}

// Display the words in the "words-list" section
function displayWords(words) {
    wordsListEl.innerHTML = '';

    // Loop through the words and display them with the selected languages
    for (let i = 0; i < words.length; i++) {
        const wordPair = document.createElement('div');
        wordPair.classList.add('word-pair');

        const lang1Word = words[i][1][selectedLanguage1];
        const lang2Word = words[i][1][selectedLanguage2];

        // Create word elements with click event to toggle definitions
        const lang1WordEl = document.createElement('span');
        lang1WordEl.textContent = lang1Word;
        lang1WordEl.classList.add('word');
        lang1WordEl.addEventListener('click', () => toggleDefinition(words[i][1], wordPair, selectedLanguage1));

        const lang2WordEl = document.createElement('span');
        lang2WordEl.textContent = lang2Word;
        lang2WordEl.classList.add('word');
        lang2WordEl.addEventListener('click', () => toggleDefinition(words[i][1], wordPair, selectedLanguage2));


        // Sound icons for pronunciation
        const soundIcon1 = document.createElement('img');
        soundIcon1.src = '../images/sound-icon.png';  // Path to your sound icon image
        soundIcon1.classList.add('sound-icon');
        soundIcon1.addEventListener('click', () => speak(lang1Word, selectedLanguage1));

        const soundIcon2 = document.createElement('img');
        soundIcon2.src = '../images/sound-icon.png';  // Path to your sound icon image
        soundIcon2.classList.add('sound-icon');
        soundIcon2.addEventListener('click', () => speak(lang2Word, selectedLanguage2));

        lang1WordEl.appendChild(soundIcon1);
        lang2WordEl.appendChild(soundIcon2);
        wordPair.appendChild(lang1WordEl);
        wordPair.appendChild(lang2WordEl);
        wordsListEl.appendChild(wordPair);
    }
}
/*
// Toggle definition display
function toggleDefinition(wordPair, language) {
    // Check if the definition already exists
    let definitionEl = wordPair.querySelector('.definition');

    if (definitionEl) {
        // If definition is already displayed, remove it with slide-up animation
        definitionEl.style.maxHeight = '0';
        setTimeout(() => {
            definitionEl.remove();
        }, 300);
    } else {
        // Otherwise, create a new definition element
        definitionEl = document.createElement('div');
        definitionEl.classList.add('definition');
        definitionEl.textContent = `Définition et exemple en ${language}
        Exsistit autem hoc loco quaedam quaestio subdifficilis, num quando amici novi, digni amicitia, veteribus sint anteponendi, ut equis vetulis teneros anteponere solemus. Indigna homine dubitatio! Non enim debent esse amicitiarum sicut aliarum rerum satietates; veterrima quaeque, ut ea vina, quae vetustatem ferunt, esse debet suavissima; verumque illud est, quod dicitur, multos modios salis simul edendos esse, ut amicitiae munus expletum sit.

Post hoc impie perpetratum quod in aliis quoque iam timebatur, tamquam licentia crudelitati indulta per suspicionum nebulas aestimati quidam noxii damnabantur. quorum pars necati, alii puniti bonorum multatione actique laribus suis extorres nullo sibi relicto praeter querelas et lacrimas, stipe conlaticia victitabant, et civili iustoque imperio ad voluntatem converso cruentam, claudebantur opulentae domus et clarae.
        `;

        // Append and animate slide-down effect
        wordPair.appendChild(definitionEl);
        setTimeout(() => {
            definitionEl.style.maxHeight = '100px'; // Or some appropriate height
        }, 10);
    }
}
*/

// Toggle definition display
function toggleDefinition(word, wordPair, language) {
    // Check if the definition already exists
    let definitionEl = wordPair.querySelector('.definition');

    if (definitionEl) {
        // If definition is already displayed, hide it

        if (definitionEl.style.display === "none") {
            definitionEl.style.display = "flex";
        } else {
            definitionEl.style.display = "none";
        }
    } else {
        // Otherwise, create a new definition element
        definitionEl = document.createElement('div');
        definitionEl.classList.add('definition');

        // Image
        const imgElement = document.createElement('img');
        //imgElement.src = `path_to_image/${language}_image.jpg`; // Remplacez par la source réelle de l'image
        imgElement.src = word.imageURL;
        imgElement.alt = word.english;
        // Text
        const textElement = document.createElement('div');
        textElement.textContent = `Définition et exemple en ${language}: Exsistit autem hoc loco quaedam quaestio subdifficilis.Exsistit autem hoc loco quaedam quaestio subdifficilis, num quando amici novi, digni amicitia, veteribus sint anteponendi, ut equis vetulis teneros anteponere solemus. Indigna homine dubitatio! Non enim debent esse amicitiarum sicut aliarum rerum satietates; veterrima quaeque, ut ea vina, quae vetustatem ferunt, esse debet suavissima; verumque illud est, quod dicitur, multos modios salis simul edendos esse, ut amicitiae munus expletum sit.

Post hoc impie perpetratum quod in aliis quoque iam timebatur, tamquam licentia crudelitati indulta per suspicionum nebulas aestimati quidam noxii damnabantur. quorum pars necati, alii puniti bonorum multatione actique laribus suis extorres nullo sibi relicto praeter querelas et lacrimas, stipe conlaticia victitabant, et civili iustoque imperio ad voluntatem converso cruentam, claudebantur opulentae domus et clarae.`;

        // Append image and text to the definition element
        definitionEl.appendChild(imgElement);
        definitionEl.appendChild(textElement);

        // Append the definition element below the words
        wordPair.appendChild(definitionEl);
        definitionEl.style.display = "flex"; // Afficher la définition
        setTimeout(() => {
            definitionEl.style.maxHeight = '100px'; // Or some appropriate height
        }, 10);


    }
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


