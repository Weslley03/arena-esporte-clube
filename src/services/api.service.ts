import { FirebaseService } from "./firebase.service";
import { PlayerVacancyDAO } from "./player_vacancy.service";

const firebase = new FirebaseService()
const playerVacancyDAO = new PlayerVacancyDAO(firebase)

export { firebase, playerVacancyDAO }
