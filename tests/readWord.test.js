// Test for the database firebase

// Importations des fonctions Firebase pas directement utilisées dans le fichier car cela bug à cause des import CDN
const { initializeApp } = require("@firebase/app");
const { getDatabase} = require("@firebase/database");
const { describe, it, expect, afterAll } = require('@jest/globals');

const {addWordsToDatabase} = require('../src/scripts/main.js')
const {readWordFromDatabase} = require('../src/scripts/main.js')



// Firebase configuration
const appSettings = {
    databaseURL: "https://ronholingo-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings);
const database = getDatabase(app);
// ********************************************************************************************************************


// Test: Lire un mot de la base de données
describe("Read word from Firebase", () => {
    let addedWordID;

    it("should read a word from the database", async () => {

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

        const word = await readWordFromDatabase(addedWordID);

        expect(word).not.toBeNull();
        expect(word.english).toBe("robot");

        const deletedWord = await readWordFromDatabase(addedWordID);
    });

    // Nettoyer après les tests
    afterAll(async () => {
        await database._delete(); // Ferme proprement l'application Firebase
    });
});