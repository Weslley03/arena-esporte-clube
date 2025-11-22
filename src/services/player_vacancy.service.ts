import { PlayerVacancyDTO, UserDTO } from "@/dtos/PlayerVacancyDTO";
import { FirebaseService } from "./firebase.service";

export class PlayerVacancyDAO {
  private readonly firebase: FirebaseService
  private readonly collectionName: string

  constructor(firebaseService: FirebaseService) {
    this.firebase = firebaseService
    this.collectionName = 'player_vacancies'
  }

  async createPlayerVacancy(playerVacancy: PlayerVacancyDTO) {
    return await this.firebase.addData<PlayerVacancyDTO>(this.collectionName, playerVacancy)
  }

  async getAllPlayerVacancies() {
    const snapshot = await this.firebase.getAllData(this.collectionName)
    const vacancies: PlayerVacancyDTO[] = []

    snapshot.forEach((doc) => {
      const data = doc.data()

      const user = new UserDTO(data.user.name, data.user.number)
      const vacancy = new PlayerVacancyDTO(
        data.id,
        data.gameDate,
        user,
        data.lookingFor,
      )

      vacancies.push(vacancy)
    })

    return vacancies
  }

  async deletePlayerVacancy(playerVacancies: PlayerVacancyDTO[]) {
    const ids = playerVacancies.map((pv) => pv.id)
    return await this.firebase.delData(this.collectionName, ids)
  }
}