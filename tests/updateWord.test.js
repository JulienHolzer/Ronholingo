// Test for the database firebase

// Importations des fonctions Firebase pas directement utilisées dans le fichier car cela bug à cause des import CDN
const { initializeApp } = require("@firebase/app");
const { getDatabase, ref, get } = require("@firebase/database");

const {updateWordInDatabase} = require('../src/scripts/main.js')



// Firebase configuration
const appSettings = {
    databaseURL: "https://ronholingo-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings);
const database = getDatabase(app);
const wordsRef = ref(database, "words")
// ********************************************************************************************************************

// Test: Mettre à jour un mot de la base de données
describe("Update word in Firebase", () => {
    it("should update a word in the database", async () => {
        const wordID = "some-valid-word-id"; // Remplacer par un ID valide
        const updatedData = {
            english: "updated car",
            french: "voiture mise à jour"
        };

        await updateWordInDatabase(wordID, updatedData);

        // Vérifier la mise à jour
        const wordRef = ref(database, `words/${wordID}`);
        const snapshot = await get(wordRef);

        expect(snapshot.val().english).toBe("updated car");
        expect(snapshot.val().french).toBe("voiture mise à jour");
    });

    // Nettoyer après les tests
    afterAll(async () => {
        await database._delete(); // Ferme proprement l'application Firebase
    });
});