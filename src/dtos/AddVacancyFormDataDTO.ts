export type LookingForOptions = {
  position: string;
  selected: boolean;
}

export type AddVacancyFormDataDTO = {
  name: string;
  number: string;
  gameDate: string;
  gameTime: string;
  lookingForOptions: LookingForOptions[];
}