//this file is a test for now !!!!!
// how to use firebase with js
import { wordsRef, database } from "./firebase-config.js";
import {ref, get, set, push, update, remove} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js"



// Words-list initialization:
export function addWordsToDatabase(english, french, spanish, vietnamese, japanese, german, italian, imgURL, category) {

    const newWordRef = push(wordsRef);
    //wordsID.push(newWordRef); // no need for this
    set(newWordRef, {
        english: english,
        french: french,
        spanish: spanish,
        vietnamese: vietnamese,
        japanese: japanese,
        german: german,
        italian: italian,
        imgURL: imgURL,
        category: category
    })
    return newWordRef;
}

// Fonction pour mettre à jour un mot
export async function updateWordInDatabase(wordID, updatedData) {
    const wordRef = ref(database, `words/${wordID}`);
    await update(wordRef, updatedData);
}

// Fonction pour supprimer un mot
export async function deleteWordFromDatabase(wordID) {
    const wordRef = ref(database, `words/${wordID}`);
    await remove(wordRef);
}

// Fonction pour lire un mot
export async function readWordFromDatabase(wordID) {
    const wordRef = ref(database, `words/${wordID}`);
    const snapshot = await get(wordRef);
    return snapshot.exists() ? snapshot.val() : null;
}



export function addWordsToDatabaseWithCheck(english, french, spanish, vietnamese, japanese, german, italian, imgURL, category) {
    const wordRef = ref(database, `words/${english}`);

    // Vérifie si l'identifiant existe déjà
    get(wordRef).then((snapshot) => {
        if (snapshot.exists()) {
            console.log("Cet identifiant (" + english +") existe déjà !");
        } else {

            // Ajoute les données si l'identifiant n'existe pas encore
            set(wordRef, {
                english: english,
                french: french,
                spanish: spanish,
                vietnamese: vietnamese,
                japanese: japanese,
                german: german,
                italian: italian,
                imgURL: imgURL,
                category: category
            });
        }
    });
}


/*
addWordsToDatabaseWithCheck("hello", "salut", "hola", "xin chao", "konichiwa", "guten tag", "ciao", "image.exemple.com", "greetings");
addWordsToDatabaseWithCheck("apple", "pomme", "manzana", "tao", "ringo", "apfel", "mela", "imageURL.com", "fruits");
console.log("ajout mots");

addWordsToDatabaseWithCheck(
    "car",
    "voiture",
    "coche",
    "xe ô tô",
    "車",
    "Auto",
    "auto",
    "https://images.unsplash.com/photo-1549921296-3fd64f46b111",
    "vehicle"
);

addWordsToDatabaseWithCheck(
    "bicycle",
    "vélo",
    "bicicleta",
    "xe đạp",
    "自転車",
    "Fahrrad",
    "bicicletta",
    "https://images.unsplash.com/photo-1520684453380-d7ffb5dc8c36",
    "vehicle"
);

addWordsToDatabaseWithCheck(
    "motorcycle",
    "moto",
    "motocicleta",
    "xe máy",
    "オートバイ",
    "Motorrad",
    "motocicletta",
    "https://images.unsplash.com/photo-1563720228441-d7ffb5dc8c36",
    "vehicle"
);

addWordsToDatabaseWithCheck(
    "truck",
    "camion",
    "camión",
    "xe tải",
    "トラック",
    "LKW",
    "camion",
    "https://images.unsplash.com/photo-1616096237977-2d19e8db4c96",
    "vehicle"
);

addWordsToDatabaseWithCheck(
    "bus",
    "bus",
    "autobús",
    "xe buýt",
    "バス",
    "Bus",
    "autobus",
    "https://images.unsplash.com/photo-1563547291872-d7ffb5dc8c36",
    "vehicle"
);

*/


//addWordsToDatabase("grape", "raisin", "uva", "nho", "budou", "traube", "uva", "image.exemple.com", "fruits");
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

/*
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
*/
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
/*
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

*/



// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!DO NOT DELETE THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

/*
// Adding words to the database

// Fruits
addWordsToDatabaseWithCheck("apple", "pomme", "manzana", "quả táo", "りんご", "apfel", "mela", "ExempleImgUrl", "fruits");
addWordsToDatabaseWithCheck("banana", "banane", "plátano", "chuối", "バナナ", "banane", "banana", "ExempleImgUrl", "fruits");
addWordsToDatabaseWithCheck("orange", "orange", "naranja", "cam màu", "オレンジ", "orange", "arancia", "ExempleImgUrl", "fruits");
addWordsToDatabaseWithCheck("grape", "raisin", "uva", "nho", "ぶどう", "traube", "uva", "ExempleImgUrl", "fruits");
addWordsToDatabaseWithCheck("pear", "poire", "pera", "lê", "なし", "birne", "pera", "ExempleImgUrl", "fruits");
addWordsToDatabaseWithCheck("strawberry", "fraise", "fresa", "dâu tây", "いちご", "erdbeere", "fragola", "ExempleImgUrl", "fruits");
addWordsToDatabaseWithCheck("pineapple", "ananas", "piña", "dứa", "パイナップル", "ananas", "ananas", "ExempleImgUrl", "fruits");
addWordsToDatabaseWithCheck("peach", "pêche", "durazno", "đào", "もも", "pfirsich", "pesca", "ExempleImgUrl", "fruits");
addWordsToDatabaseWithCheck("watermelon", "pastèque", "sandía", "dưa hấu", "スイカ", "wassermelone", "anguria", "ExempleImgUrl", "fruits");
addWordsToDatabaseWithCheck("kiwi", "kiwi", "kiwi", "kiwi", "キウイ", "kiwi", "kiwi", "ExempleImgUrl", "fruits");
addWordsToDatabaseWithCheck("mango", "mangue", "mango", "xoài", "マンゴー", "mango", "mango", "ExempleImgUrl", "fruits");
addWordsToDatabaseWithCheck("plum", "prune", "ciruela", "mận", "プラム", "pflaume", "prugna", "ExempleImgUrl", "fruits");
addWordsToDatabaseWithCheck("cherry", "cerise", "cereza", "quả anh đào", "さくらんぼ", "kirsche", "ciliegia", "ExempleImgUrl", "fruits");
addWordsToDatabaseWithCheck("blueberry", "myrtille", "arándano", "việt quất", "ブルーベリー", "heidelbeere", "mirtillo", "ExempleImgUrl", "fruits");
addWordsToDatabaseWithCheck("raspberry", "framboise", "frambuesa", "mâm xôi", "ラズベリー", "himbeere", "lampone", "ExempleImgUrl", "fruits");

// Vegetables
addWordsToDatabaseWithCheck("carrot", "carotte", "zanahoria", "cà rốt", "にんじん", "karotte", "carota", "ExempleImgUrl", "vegetables");
addWordsToDatabaseWithCheck("potato", "pomme de terre", "patata", "khoai tây", "じゃがいも", "kartoffel", "patata", "ExempleImgUrl", "vegetables");
addWordsToDatabaseWithCheck("tomato", "tomate", "tomate", "cà chua", "トマト", "tomate", "pomodoro", "ExempleImgUrl", "vegetables");
addWordsToDatabaseWithCheck("onion", "oignon", "cebolla", "hành", "たまねぎ", "zwiebel", "cipolla", "ExempleImgUrl", "vegetables");
addWordsToDatabaseWithCheck("broccoli", "brocoli", "brócoli", "bông cải xanh", "ブロッコリー", "brokkoli", "broccoli", "ExempleImgUrl", "vegetables");
addWordsToDatabaseWithCheck("spinach", "épinard", "espinaca", "rau chân vịt", "ほうれん草", "spinat", "spinaci", "ExempleImgUrl", "vegetables");
addWordsToDatabaseWithCheck("cucumber", "concombre", "pepino", "dưa chuột", "きゅうり", "gurke", "cetriolo", "ExempleImgUrl", "vegetables");
addWordsToDatabaseWithCheck("lettuce", "laitue", "lechuga", "xà lách", "レタス", "kopfsalat", "lattuga", "ExempleImgUrl", "vegetables");
addWordsToDatabaseWithCheck("pepper", "poivron", "pimiento", "ớt", "ピーマン", "paprika", "peperone", "ExempleImgUrl", "vegetables");
addWordsToDatabaseWithCheck("corn", "maïs", "maíz", "ngô", "トウモロコシ", "mais", "mais", "ExempleImgUrl", "vegetables");
addWordsToDatabaseWithCheck("cauliflower", "chou-fleur", "coliflor", "súp lơ", "カリフラワー", "blumenkohl", "cavolfiore", "ExempleImgUrl", "vegetables");
addWordsToDatabaseWithCheck("zucchini", "courgette", "calabacín", "bí ngòi", "ズッキーニ", "zucchini", "zucchini", "ExempleImgUrl", "vegetables");
addWordsToDatabaseWithCheck("beetroot", "betterave", "remolacha", "củ dền", "ビートルート", "rote bete", "barbabietola", "ExempleImgUrl", "vegetables");
addWordsToDatabaseWithCheck("eggplant", "aubergine", "berenjena", "cà tím", "なす", "aubergine", "melanzana", "ExempleImgUrl", "vegetables");
addWordsToDatabaseWithCheck("garlic", "ail", "ajo", "tỏi", "にんにく", "knoblauch", "aglio", "ExempleImgUrl", "vegetables");
addWordsToDatabaseWithCheck("radish", "radis", "rábano", "củ cải", "ラディッシュ", "rettich", "ravanello", "ExempleImgUrl", "vegetables");

// Vehicle
addWordsToDatabaseWithCheck("car", "voiture", "coche", "xe hơi", "くるま", "Auto", "auto", "ExempleImgUrl", "vehicles");
addWordsToDatabaseWithCheck("bicycle", "vélo", "bicicleta", "xe đạp", "じてんしゃ", "Fahrrad", "bicicletta", "ExempleImgUrl", "vehicles");
addWordsToDatabaseWithCheck("motorcycle", "moto", "motocicleta", "xe máy", "バイク", "Motorrad", "moto", "ExempleImgUrl", "vehicles");
addWordsToDatabaseWithCheck("truck", "camion", "camión", "xe tải", "トラック", "Lkw", "camion", "ExempleImgUrl", "vehicles");
addWordsToDatabaseWithCheck("bus", "autobus", "autobús", "xe buýt", "バス", "Bus", "autobus", "ExempleImgUrl", "vehicles");
addWordsToDatabaseWithCheck("train", "train", "tren", "tàu", "でんしゃ", "Zug", "treno", "ExempleImgUrl", "vehicles");
addWordsToDatabaseWithCheck("airplane", "avion", "avión", "máy bay", "ひこうき", "Flugzeug", "aereo", "ExempleImgUrl", "vehicles");
addWordsToDatabaseWithCheck("boat", "bateau", "barco", "thuyền", "ボート", "Boot", "barca", "ExempleImgUrl", "vehicles");
addWordsToDatabaseWithCheck("submarine", "sous-marin", "submarino", "tàu ngầm", "せんすいかん", "U-Boot", "sottomarino", "ExempleImgUrl", "vehicles");
addWordsToDatabaseWithCheck("helicopter", "hélicoptère", "helicóptero", "trực thăng", "ヘリコプター", "Hubschrauber", "elicottero", "ExempleImgUrl", "vehicles");
addWordsToDatabaseWithCheck("scooter", "scooter", "scooter", "xe tay ga", "スクーター", "Roller", "scooter", "ExempleImgUrl", "vehicles");
addWordsToDatabaseWithCheck("van", "fourgon", "furgón", "xe van", "バン", "Transporter", "furgone", "ExempleImgUrl", "vehicles");
addWordsToDatabaseWithCheck("tractor", "tracteur", "tractor", "máy kéo", "トラクター", "Traktor", "trattore", "ExempleImgUrl", "vehicles");
addWordsToDatabaseWithCheck("limousine", "limousine", "limusina", "limousine", "リムジン", "Limousine", "limousine", "ExempleImgUrl", "vehicles");
addWordsToDatabaseWithCheck("tank", "char", "tanque", "xe tăng", "戦車", "Panzer", "carro armato", "ExempleImgUrl", "vehicles");
addWordsToDatabaseWithCheck("ambulance", "ambulance", "ambulancia", "xe cứu thương", "救急車", "Krankenwagen", "ambulanza", "ExempleImgUrl", "vehicles");
addWordsToDatabaseWithCheck("snowmobile", "motoneige", "moto de nieve", "xe trượt tuyết", "スノーモービル", "Schneemobil", "motoslitta", "ExempleImgUrl", "vehicles");

// Greetings
addWordsToDatabaseWithCheck("hello", "bonjour", "hola", "xin chào", "こんにちは", "hallo", "ciao", "ExempleImgUrl", "greetings");
addWordsToDatabaseWithCheck("goodbye", "au revoir", "adiós", "tạm biệt", "さようなら", "auf wiedersehen", "addio", "ExempleImgUrl", "greetings");
addWordsToDatabaseWithCheck("please", "s'il vous plaît", "por favor", "làm ơn", "お願いします", "bitte", "per favore", "ExempleImgUrl", "greetings");
addWordsToDatabaseWithCheck("thank you", "merci", "gracias", "cảm ơn", "ありがとう", "danke", "grazie", "ExempleImgUrl", "greetings");
addWordsToDatabaseWithCheck("sorry", "désolé", "lo siento", "xin lỗi", "ごめんなさい", "es tut mir leid", "mi dispiace", "ExempleImgUrl", "greetings");
addWordsToDatabaseWithCheck("excuse me", "excusez-moi", "perdón", "xin lỗi", "すみません", "entschuldigung", "scusa", "ExempleImgUrl", "greetings");
addWordsToDatabaseWithCheck("good morning", "bonjour", "buenos días", "chào buổi sáng", "おはようございます", "guten morgen", "buongiorno", "ExempleImgUrl", "greetings");
addWordsToDatabaseWithCheck("good night", "bonne nuit", "buenas noches", "chúc ngủ ngon", "おやすみなさい", "gute nacht", "buonanotte", "ExempleImgUrl", "greetings");
addWordsToDatabaseWithCheck("how are you", "comment ça va", "cómo estás", "bạn khỏe không", "お元気ですか", "wie geht es dir", "come stai", "ExempleImgUrl", "greetings");
addWordsToDatabaseWithCheck("see you later", "à plus tard", "hasta luego", "hẹn gặp lại", "じゃね", "bis später", "a dopo", "ExempleImgUrl", "greetings");
addWordsToDatabaseWithCheck("congratulations", "félicitations", "felicidades", "chúc mừng", "おめでとうございます", "herzlichen glückwunsch", "congratulazioni", "ExempleImgUrl", "greetings");
addWordsToDatabaseWithCheck("welcome", "bienvenue", "bienvenido", "chào mừng", "ようこそ", "willkommen", "benvenuto", "ExempleImgUrl", "greetings");
addWordsToDatabaseWithCheck("good luck", "bonne chance", "buena suerte", "chúc may mắn", "頑張ってください", "viel glück", "buona fortuna", "ExempleImgUrl", "greetings");
addWordsToDatabaseWithCheck("I love you", "je t'aime", "te quiero", "tôi yêu bạn", "愛しています", "ich liebe dich", "ti amo", "ExempleImgUrl", "greetings");
addWordsToDatabaseWithCheck("happy birthday", "joyeux anniversaire", "feliz cumpleaños", "chúc mừng sinh nhật", "お誕生日おめでとう", "alles gute zum geburtstag", "buon compleanno", "ExempleImgUrl", "greetings");
addWordsToDatabaseWithCheck("see you soon", "à bientôt", "hasta pronto", "hẹn gặp sớm", "またね", "bis bald", "a presto", "ExempleImgUrl", "greetings");
addWordsToDatabaseWithCheck("goodbye", "au revoir", "adiós", "tạm biệt", "さようなら", "auf wiedersehen", "addio", "ExempleImgUrl", "greetings");
addWordsToDatabaseWithCheck("yes", "oui", "sí", "vâng", "はい", "ja", "sì", "ExempleImgUrl", "greetings");
addWordsToDatabaseWithCheck("no", "non", "no", "không", "いいえ", "nein", "no", "ExempleImgUrl", "greetings");

// Animals
addWordsToDatabaseWithCheck("cat", "chat", "gato", "mèo", "ねこ", "Katze", "gatto", "ExempleImgUrl", "animals");
addWordsToDatabaseWithCheck("dog", "chien", "perro", "chó", "いぬ", "Hund", "cane", "ExempleImgUrl", "animals");
addWordsToDatabaseWithCheck("horse", "cheval", "caballo", "ngựa", "うま", "Pferd", "cavallo", "ExempleImgUrl", "animals");
addWordsToDatabaseWithCheck("elephant", "éléphant", "elefante", "voi", "ぞう", "Elefant", "elefante", "ExempleImgUrl", "animals");
addWordsToDatabaseWithCheck("lion", "lion", "león", "sư tử", "ライオン", "Löwe", "leone", "ExempleImgUrl", "animals");
addWordsToDatabaseWithCheck("tiger", "tigre", "tigre", "hổ", "とら", "Tiger", "tigre", "ExempleImgUrl", "animals");
addWordsToDatabaseWithCheck("bear", "ours", "oso", "gấu", "くま", "Bär", "orso", "ExempleImgUrl", "animals");
addWordsToDatabaseWithCheck("monkey", "singe", "mono", "khỉ", "さる", "Affe", "scimmia", "ExempleImgUrl", "animals");
addWordsToDatabaseWithCheck("zebra", "zèbre", "cebra", "ngựa vằn", "シマウマ", "Zebra", "zebra", "ExempleImgUrl", "animals");
addWordsToDatabaseWithCheck("giraffe", "girafe", "jirafa", "hươu cao cổ", "きりん", "Giraffe", "giraffa", "ExempleImgUrl", "animals");
addWordsToDatabaseWithCheck("deer", "cerf", "ciervo", "hươu", "しか", "Reh", "cervo", "ExempleImgUrl", "animals");
addWordsToDatabaseWithCheck("rabbit", "lapin", "conejo", "thỏ", "うさぎ", "Kaninchen", "coniglio", "ExempleImgUrl", "animals");
addWordsToDatabaseWithCheck("fox", "renard", "zorro", "cáo", "きつね", "Fuchs", "volpe", "ExempleImgUrl", "animals");
addWordsToDatabaseWithCheck("wolf", "loup", "lobo", "sói", "おおかみ", "Wolf", "lupo", "ExempleImgUrl", "animals");
addWordsToDatabaseWithCheck("eagle", "aigle", "águila", "đại bàng", "わし", "Adler", "aquila", "ExempleImgUrl", "animals");
addWordsToDatabaseWithCheck("dolphin", "dauphin", "delfín", "cá heo", "イルカ", "Delfin", "delfino", "ExempleImgUrl", "animals");

// Body
addWordsToDatabaseWithCheck("head", "tête", "cabeza", "đầu", "あたま", "Kopf", "testa", "ExempleImgUrl", "body");
addWordsToDatabaseWithCheck("arm", "bras", "brazo", "cánh tay", "うで", "Arm", "braccio", "ExempleImgUrl", "body");
addWordsToDatabaseWithCheck("leg", "jambe", "pierna", "chân", "あし", "Bein", "gamba", "ExempleImgUrl", "body");
addWordsToDatabaseWithCheck("hand", "main", "mano", "tay", "て", "Hand", "mano", "ExempleImgUrl", "body");
addWordsToDatabaseWithCheck("foot", "pied", "pie", "chân", "あし", "Fuß", "piede", "ExempleImgUrl", "body");
addWordsToDatabaseWithCheck("eye", "œil", "ojo", "mắt", "目", "Auge", "occhio", "ExempleImgUrl", "body");
addWordsToDatabaseWithCheck("ear", "oreille", "oreja", "tai", "耳", "Ohr", "orecchio", "ExempleImgUrl", "body");
addWordsToDatabaseWithCheck("nose", "nez", "nariz", "mũi", "鼻", "Nase", "naso", "ExempleImgUrl", "body");
addWordsToDatabaseWithCheck("mouth", "bouche", "boca", "miệng", "口", "Mund", "bocca", "ExempleImgUrl", "body");
addWordsToDatabaseWithCheck("shoulder", "épaule", "hombro", "vai", "肩", "Schulter", "spalla", "ExempleImgUrl", "body");
addWordsToDatabaseWithCheck("back", "dos", "espalda", "lưng", "背中", "Rücken", "schiena", "ExempleImgUrl", "body");
addWordsToDatabaseWithCheck("chest", "poitrine", "pecho", "ngực", "胸", "Brust", "petto", "ExempleImgUrl", "body");
addWordsToDatabaseWithCheck("stomach", "estomac", "estómago", "dạ dày", "おなか", "Magen", "stomaco", "ExempleImgUrl", "body");
addWordsToDatabaseWithCheck("waist", "taille", "cintura", "eo", "ウエスト", "Taille", "vita", "ExempleImgUrl", "body");
addWordsToDatabaseWithCheck("knee", "genou", "rodilla", "gối", "ひざ", "Knie", "ginocchio", "ExempleImgUrl", "body");
addWordsToDatabaseWithCheck("elbow", "coude", "codo", "khuỷu tay", "ひじ", "Ellenbogen", "gomito", "ExempleImgUrl", "body");
addWordsToDatabaseWithCheck("ankle", "cheville", "tobillo", "cổ chân", "足首", "Knöchel", "caviglia", "ExempleImgUrl", "body");
addWordsToDatabaseWithCheck("finger", "doigt", "dedo", "ngón tay", "指", "Finger", "dito", "ExempleImgUrl", "body");
addWordsToDatabaseWithCheck("toe", "orteil", "dedo del pie", "ngón chân", "足の指", "Zehe", "alluce", "ExempleImgUrl", "body");

// Clothes
addWordsToDatabaseWithCheck("shirt", "chemise", "camisa", "áo sơ mi", "シャツ", "Hemd", "camicia", "ExempleImgUrl", "clothes");
addWordsToDatabaseWithCheck("pants", "pantalon", "pantalones", "quần dài", "ズボン", "Hose", "pantaloni", "ExempleImgUrl", "clothes");
addWordsToDatabaseWithCheck("dress", "robe", "vestido", "váy", "ドレス", "Kleid", "abito", "ExempleImgUrl", "clothes");
addWordsToDatabaseWithCheck("jacket", "veste", "chaqueta", "áo khoác", "ジャケット", "Jacke", "giacca", "ExempleImgUrl", "clothes");
addWordsToDatabaseWithCheck("shoes", "chaussures", "zapatos", "giày", "靴", "Schuhe", "scarpe", "ExempleImgUrl", "clothes");
addWordsToDatabaseWithCheck("hat", "chapeau", "sombrero", "mũ", "帽子", "Hut", "cappello", "ExempleImgUrl", "clothes");
addWordsToDatabaseWithCheck("socks", "chaussettes", "calcetines", "vớ", "靴下", "Socken", "calzini", "ExempleImgUrl", "clothes");
addWordsToDatabaseWithCheck("scarf", "écharpe", "bufanda", "khăn quàng cổ", "スカーフ", "Schal", "sciarpa", "ExempleImgUrl", "clothes");
addWordsToDatabaseWithCheck("gloves", "gants", "guantes", "găng tay", "手袋", "Handschuhe", "guanti", "ExempleImgUrl", "clothes");
addWordsToDatabaseWithCheck("belt", "ceinture", "cinturón", "thắt lưng", "ベルト", "Gürtel", "cintura", "ExempleImgUrl", "clothes");
addWordsToDatabaseWithCheck("shorts", "shorts", "pantalones cortos", "quần short", "ショーツ", "Shorts", "shorts", "ExempleImgUrl", "clothes");
addWordsToDatabaseWithCheck("sweater", "pull", "suéter", "áo len", "セーター", "Pullover", "maglione", "ExempleImgUrl", "clothes");
addWordsToDatabaseWithCheck("suit", "costume", "traje", "comple", "スーツ", "Anzug", "abito", "ExempleImgUrl", "clothes");
addWordsToDatabaseWithCheck("coat", "manteau", "abrigo", "áo khoác dài", "コート", "Mantel", "cappotto", "ExempleImgUrl", "clothes");
addWordsToDatabaseWithCheck("sunglasses", "lunettes de soleil", "gafas de sol", "kính mát", "サングラス", "Sonnenbrille", "occhiali da sole", "ExempleImgUrl", "clothes");
addWordsToDatabaseWithCheck("pajamas", "pyjama", "pijamas", "đồ ngủ", "パジャマ", "Schlafanzug", "pigiama", "ExempleImgUrl", "clothes");

// House
addWordsToDatabaseWithCheck("house", "maison", "casa", "nhà", "家", "Haus", "casa", "ExempleImgUrl", "house");
addWordsToDatabaseWithCheck("door", "porte", "puerta", "cửa", "ドア", "Tür", "porta", "ExempleImgUrl", "house");
addWordsToDatabaseWithCheck("window", "fenêtre", "ventana", "cửa sổ", "窓", "Fenster", "finestra", "ExempleImgUrl", "house");
addWordsToDatabaseWithCheck("roof", "toit", "techo", "mái nhà", "屋根", "Dach", "tetto", "ExempleImgUrl", "house");
addWordsToDatabaseWithCheck("floor", "sol", "suelo", "sàn nhà", "床", "Boden", "pavimento", "ExempleImgUrl", "house");
addWordsToDatabaseWithCheck("kitchen", "cuisine", "cocina", "nhà bếp", "キッチン", "Küche", "cucina", "ExempleImgUrl", "house");
addWordsToDatabaseWithCheck("living room", "salon", "sala de estar", "phòng khách", "リビングルーム", "Wohnzimmer", "soggiorno", "ExempleImgUrl", "house");
addWordsToDatabaseWithCheck("bedroom", "chambre", "dormitorio", "phòng ngủ", "寝室", "Schlafzimmer", "camera da letto", "ExempleImgUrl", "house");
addWordsToDatabaseWithCheck("bathroom", "salle de bain", "baño", "phòng tắm", "バスルーム", "Badezimmer", "bagno", "ExempleImgUrl", "house");
addWordsToDatabaseWithCheck("garage", "garage", "garaje", "gara", "ガレージ", "Garage", "garage", "ExempleImgUrl", "house");
addWordsToDatabaseWithCheck("garden", "jardin", "jardín", "vườn", "庭", "Garten", "giardino", "ExempleImgUrl", "house");
addWordsToDatabaseWithCheck("hallway", "couloir", "pasillo", "hành lang", "廊下", "Flur", "corridoio", "ExempleImgUrl", "house");
addWordsToDatabaseWithCheck("stairs", "escalier", "escalera", "cầu thang", "階段", "Treppe", "scala", "ExempleImgUrl", "house");
addWordsToDatabaseWithCheck("ceiling", "plafond", "techo", "trần nhà", "天井", "Decke", "soffitto", "ExempleImgUrl", "house");
addWordsToDatabaseWithCheck("furniture", "meubles", "muebles", "đồ nội thất", "家具", "Möbel", "mobili", "ExempleImgUrl", "house");
addWordsToDatabaseWithCheck("chimney", "cheminée", "chimenea", "ống khói", "煙突", "Schornstein", "camino", "ExempleImgUrl", "house");
addWordsToDatabaseWithCheck("balcony", "balcon", "balcón", "ban công", "バルコニー", "Balkon", "balcone", "ExempleImgUrl", "house");
addWordsToDatabaseWithCheck("attic", "grenier", "ático", "gác mái", "屋根裏部屋", "Dachboden", "soffitta", "ExempleImgUrl", "house");
*/