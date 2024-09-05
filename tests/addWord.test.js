// Test for the database firebase

// Importations des fonctions Firebase pas directement utilisées dans le fichier car cela bug à cause des import CDN
const { initializeApp } = require("@firebase/app");
const { getDatabase, ref, get} = require("@firebase/database");

const {addWordsToDatabase} = require('../src/scripts/main.js')



// Firebase configuration
const appSettings = {
    databaseURL: "https://ronholingo-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings);
const database = getDatabase(app);
const wordsRef = ref(database, "words")
// ********************************************************************************************************************

// Test: Ajouter un mot à la base de données
describe("Create word in Firebase", () => {
    let addedWordID;

    it("should add a word to the database", async () => {
        const newWordRef = await addWordsToDatabase(
            "car",
            "voiture",
            "coche",
            "xe ô tô",
            "車",
            "Auto",
            "auto",
            "https://example.com/car.jpg",
            "vehicle"
        );
        addedWordID = newWordRef.key;

        // Vérifier si le mot a été ajouté
        const wordRef = ref(database, `words/${addedWordID}`);
        const snapshot = await get(wordRef);
        expect(snapshot.exists()).toBe(true);
        expect(snapshot.val().english).toBe("car");
    });

    // Nettoyer après les tests
    afterAll(async () => {
        await database._delete(); // Ferme proprement l'application Firebase
    });
});