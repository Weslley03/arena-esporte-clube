export class UserDTO {
  name: string
  number: string

  constructor(name: string, number: string) {
    this.name = name
    this.number = number
  }
}

export class PlayerVacancyDTO {
  id: number;
  gameDate: string;
  user: UserDTO;
  lookingFor: string;

  constructor(id: number, gameDate: string, user: UserDTO, lookingFor: string) {
    this.id = id
    this.gameDate = gameDate
    this.user = user
    this.lookingFor = lookingFor
  }
}
