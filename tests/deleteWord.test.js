// Test for the database firebase

// Importations des fonctions Firebase pas directement utilisées dans le fichier car cela bug à cause des import CDN
const { initializeApp } = require("@firebase/app");
const { getDatabase, ref, get} = require("@firebase/database");

const {deleteWordFromDatabase} = require('../src/scripts/main.js')


const { describe, it, expect, afterAll } = require('@jest/globals');
const {addWordsToDatabase} = require("../src/scripts/main");


// Firebase configuration
const appSettings = {
    databaseURL: "https://ronholingo-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings);
const database = getDatabase(app);
// ********************************************************************************************************************



// Test: Supprimer un mot de la base de données
describe("Delete word from Firebase", () => {
    it("should delete a word from the database", async () => {

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

        const wordID = newWordRef.key;

        await deleteWordFromDatabase(wordID);

        // Vérifier si le mot a été supprimé
        const wordRef = ref(database, `words/${wordID}`);
        const snapshot = await get(wordRef);
        expect(snapshot.exists()).toBe(false);
    });

    // Nettoyer après les tests
    afterAll(async () => {
        await database._delete(); // Ferme proprement l'application Firebase
    });
});