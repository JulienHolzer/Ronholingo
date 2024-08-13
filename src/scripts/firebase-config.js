import {initializeApp} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js"
import {getDatabase, ref} from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js"


// Firebase configuration
const appSettings = {
    databaseURL: "https://ronholingo-default-rtdb.europe-west1.firebasedatabase.app/"
}
const app = initializeApp(appSettings)
export const database = getDatabase(app)


// Export the wordsRef from the database to import it in other files
export const wordsRef = ref(database, "words")
