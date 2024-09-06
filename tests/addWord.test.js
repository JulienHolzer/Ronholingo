// Test for the database firebase

// Importations des fonctions Firebase pas directement utilisées dans le fichier car cela bug à cause des import CDN
const { initializeApp } = require("@firebase/app");
const { getDatabase, ref, get} = require("@firebase/database");
const { describe, it, expect, afterAll } = require('@jest/globals');

const {addWordsToDatabase} = require('../src/scripts/main.js')
const {readWordFromDatabase} = require("../src/scripts/main");



// Firebase configuration
const appSettings = {
    databaseURL: "https://ronholingo-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings);
const database = getDatabase(app);

// ********************************************************************************************************************

// Test: Ajouter un mot à la base de données
describe("Create word in Firebase", () => {
    let addedWordID;

    it("should add a word to the database", async () => {
        const newWordRef = await addWordsToDatabase(
            "robot",
            "robot",
            "robot",
            "người máy",
            "ロボット",
            "Roboter",
            "robot",
            "https://img.freepik.com/vecteurs-libre/robot-flottant_78370-3669.jpg",
            "technology"
        );
        addedWordID = newWordRef.key;

        // Vérifier si le mot a été ajouté
        const wordRef = ref(database, `words/${addedWordID}`);
        const snapshot = await get(wordRef);

        const deletedWord = await readWordFromDatabase(addedWordID);

        expect(snapshot.exists()).toBe(true);
        expect(snapshot.val().english).toBe("robot");
    });

    // Nettoyer après les tests
    afterAll(async () => {
        await database._delete(); // Ferme proprement l'application Firebase
    });
});