//this file is a test for now !!!!!
// how to use firebase with js


import {initializeApp} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js"
import {getDatabase, ref, set, push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js"


// Firebase configuration
const appSettings = {
    databaseURL: "https://ronholingo-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const wordsInDB = ref(database, "words")

let wordsList = [];


// Words-list initialization:
function addWordsToDatabase(english, french, spanish) {

    const newWordRef = push(wordsInDB);
    wordsID.push(newWordRef);
    set(newWordRef, {
        english: english,
        french: french,
        spanish: spanish
    })
}

//addWordsToDatabase("Hello", "Salut", "Hola");
//addWordsToDatabase("cat", "chat", "gato");

/*
addWordsToDatabase("apple", "pomme", "manzana");
addWordsToDatabase("grape", "raisin", "uva");
addWordsToDatabase("strawberry", "fraise", "fresa");
addWordsToDatabase("banana", "banane", "plátano");
addWordsToDatabase("lemon", "citron", "limón");
console.log("ajout mots");
*/



// afficher words-list
//const wordsListEl = document.getElementById("words-list")

// Fonction pour afficher les mots dans la section "words-list"
/*
function displayWords(words) {
    const wordsListEl = document.getElementById('words-list');
    wordsListEl.innerHTML = ''; // Vider la liste existante

    for (let key in words) {
        const wordPair = document.createElement('div');
        wordPair.classList.add('word-pair');
        wordPair.innerHTML = `<strong>${words[key].english}</strong> - ${words[key].french}`;
        wordsListEl.appendChild(wordPair);
    }
}
*/

/*
//première version (avant changement choix langue)
function displayWords(words) {
    const wordsListEl = document.getElementById('words-list');
    wordsListEl.innerHTML = ''; // Vider la liste existante

    //test affichage
    console.log("words : ");
    console.log(words);

    console.log("tout les words[1] : ");
    for (let i = 0; i < words.length; i++) {
        console.log(words[i][1].english);
    }

    for (let i = 0; i < words.length; i++) {
        const wordPair = document.createElement('div');
        wordPair.classList.add('word-pair');
        wordPair.innerHTML = `<strong>${words[i][1].english}</strong>${words[i][1].french}`;
        wordsListEl.appendChild(wordPair);
    }
}
*/
// Fonction pour afficher les mots dans la section "words-list"
function displayWords(words) {
    const wordsListEl = document.getElementById('words-list');
    wordsListEl.innerHTML = ''; // Vider la liste existante

    // Obtenez les langues sélectionnées
    const language1 = document.getElementById('language1').value;
    const language2 = document.getElementById('language2').value;

    for (let i = 0; i < words.length; i++) {
        const wordPair = document.createElement('div');
        wordPair.classList.add('word-pair');

        // Ajoutez les mots dans les langues sélectionnées
        const lang1Word = words[i][1][language1];
        const lang2Word = words[i][1][language2];

        wordPair.innerHTML = `
            <div>
                <strong>${lang1Word}</strong> - ${lang2Word}
            </div>
        `;

        wordsListEl.appendChild(wordPair);
    }
}

/*
//test de mettre des bouton de def et exemple
// fonction obsolète et moche et marche pas
function displayWords(words) {
    const wordsListEl = document.getElementById('words-list');
    wordsListEl.innerHTML = ''; // Vider la liste existante

    // Obtenez les langues sélectionnées
    const language1 = document.getElementById('language1').value;
    const language2 = document.getElementById('language2').value;

    for (let i = 0; i < words.length; i++) {
        const wordPair = document.createElement('div');
        wordPair.classList.add('word-pair');

        // Ajoutez les mots dans les langues sélectionnées
        const lang1Word = words[i][1][language1];
        const lang2Word = words[i][1][language2];

        wordPair.innerHTML = `
            <div>
                <strong>${lang1Word}</strong> - ${lang2Word}
            </div>
            <button class="definition-btn">Definition</button>
            <button class="example-btn">Example</button>
            <div class="additional-info"></div>
        `;

        wordsListEl.appendChild(wordPair);
    }


    // Ajouter des écouteurs d'événements pour les boutons
    const definitionButtons = document.querySelectorAll('.definition-btn');
    const exampleButtons = document.querySelectorAll('.example-btn');

    definitionButtons.forEach((button, index) => {
        button.addEventListener('click', () => showDefinition(words[index][1][language1], button));
    });

    exampleButtons.forEach((button, index) => {
        button.addEventListener('click', () => showExample(words[index][1][language1], button));
    });
}

function showDefinition(word, button) {
    const infoDiv = button.nextElementSibling;
    infoDiv.textContent = `Voici la définition de '${word}'`;
    infoDiv.classList.toggle('show'); // Toggle visibility
}

function showExample(word, button) {
    const infoDiv = button.nextElementSibling;
    infoDiv.textContent = `Voici un exemple d'utilisation de '${word}'`;
    infoDiv.classList.toggle('show'); // Toggle visibility
}
*/

// Mise à jour de l'affichage des mots lors de la sélection des langues
document.getElementById('language1').addEventListener('change', displayWords(wordsList));
document.getElementById('language2').addEventListener('change', displayWords(wordsList));

onValue(wordsInDB, function(snapshot){
    if (snapshot.exists()) {
        wordsList = Object.entries(snapshot.val())
        displayWords(wordsList);
    }
    else{
        wordsListEl.innerHTML = "No words found...";
    }
})

