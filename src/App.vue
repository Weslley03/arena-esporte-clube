<template>
  <modal v-if="appStore.showForm"
    @click-outside="appStore.setShowForm(false)">
    <form-add-vagancy @save-data="publishVagancy" />
  </modal>

  <section>
    <div class="header">
      <div class="title">
        <calendar-icon :size="42" class="calendar" />
        <span> Tá afim de jogar essa semana? Segue alguns horários precisando de um ATLETA. </span>
      </div>
      <div class="offer">
        <span> {{ weekText }} </span>
        <span> - </span>
        <default-button :text="'divulgar uma vaga'" :classes="['offer-button']" @click="appStore.setShowForm(true)" />
      </div>
    </div>

    <div class="content">
      <loading-spinner v-if="onSpinner" />
      <template v-else-if="Object.keys(groupsByDay).length && !onSpinner">
        <template v-for="(cards, dayName) in groupsByDay" :key="dayName">
          <index-colum :label="dayName" />
          <offer-card
            v-for="card in cards"
            :key="card.id"
            :game-date="card.gameDate"
            :owner="card.user.name"
            :number="card.user.number"
            :looking-for="card.lookingFor"
            @click="openCard"
          />
        </template>
      </template>
      <span v-else> Nenhuma vaga disponível esta semana. </span>
    </div>
  </section>

  <footer class="app-footer" v-if="!onSpinner && Object.keys(groupsByDay).length"> desenvolvido por wef-tecnologia </footer>
</template>

<script lang="ts">
import { defineComponent, onMounted, openBlock, ref } from 'vue';
import CalendarIcon from './components/icons/CalendarIcon.vue';
import DefaultButton from './components/button/DefaultButton.vue';
import IndexColum from './components/IndexColum.vue';
import OfferCard from './components/OfferCard.vue';
import { PlayerVacancyDTO, UserDTO } from './dtos/PlayerVacancyDTO';
import { dayMap } from './utils/dayMap';
import { firebase, playerVacancyDAO } from './services/api.service';
import Modal from './components/modal/Modal.vue';
import FormAddVagancy from './components/modal/FormAddVagancy.vue';
import { useAppStore } from './stores/app.store';
import type { AddVacancyFormDataDTO } from './dtos/AddVacancyFormDataDTO';
import LoadingSpinner from './components/spinner/LoadingSpinner.vue';
import { createToast } from './utils/createToast';

export default defineComponent({
  name: 'App',
  components: {
    CalendarIcon,
    DefaultButton,
    IndexColum,
    OfferCard,
    Modal,
    FormAddVagancy,
    LoadingSpinner,
  },
  setup() {
    const appStore = useAppStore()
    const groupsByDay = ref<Record<string, PlayerVacancyDTO[]>>({})
    const offerCards = ref<PlayerVacancyDTO[]>([])
    const weekText = ref<string>('Semana...')
    const dates = ref<{ monday: Date | null, sunday: Date | null }>({ monday: null, sunday: null })
    const onSpinner = ref<boolean>(true)
    const WA_ME_TEXT = 'https://wa.me'

    const weekInterval = () => {
      const current = new Date();
      const day = current.getDay();

      const diffToMonday = day === 0 ? -6 : 1 - day;

      const monday = new Date(current);
      monday.setHours(0, 0, 0, 0);
      monday.setDate(current.getDate() + diffToMonday);

      const sunday = new Date(monday);
      sunday.setDate(monday.getDate() + 6);
      sunday.setHours(23, 59, 59, 999);

      dates.value.monday = monday
      dates.value.sunday = sunday

      const format = (d: Date) =>
        String(d.getDate()).padStart(2, "0") + "/" +
        String(d.getMonth() + 1).padStart(2, "0");

      return `Semana de ${format(monday)} a ${format(sunday)}`;
    }

    const filterVacanciesThisWeek = (playerVacancies: PlayerVacancyDTO[]) => {
      const pastVacancies: PlayerVacancyDTO[] = []
      const currentVacancies: PlayerVacancyDTO[] = []

      if (!dates.value.monday || !dates.value.sunday) return

      for (const vacancy of playerVacancies) {
        const vacancyDate = new Date(vacancy.gameDate)

        const current = new Date()
        if (vacancyDate < current) {
          pastVacancies.push(vacancy)
        } else if (vacancyDate >= dates.value.monday && vacancyDate <= dates.value.sunday) {
          currentVacancies.push(vacancy)
        }
      }

      playerVacancyDAO.deletePlayerVacancy(pastVacancies)
      offerCards.value = currentVacancies.sort((a, b) => new Date(a.gameDate).getTime() - new Date(b.gameDate).getTime())
    }

    const buildGroupByDay = () => {
      groupsByDay.value = {}

      if (!offerCards.value.length) return

      for (const offer of offerCards.value) {
        const date = new Date(offer.gameDate)
        const day = date.getDay()

        const dayName = dayMap[day];

        if (dayName) {
          if (!groupsByDay.value[dayName]) {
            groupsByDay.value[dayName] = []
          }

          groupsByDay.value[dayName].push(offer);
        }
      }
    }

    const openCard = (dayName: string, gameTime: string, number: string) => {
      const text = `Fala aí chefe! Vi no site que tá faltando gente pro fut de ${dayName} às ${gameTime}. Qual o esquema?!`
      const encoded = encodeURIComponent(text)

      window.open(`${WA_ME_TEXT}/55${number}?text=${encoded}`, "_blank")
    }


    const publishVagancy = async (data: AddVacancyFormDataDTO) => {
      const { name, number, gameDate, gameTime, lookingForOptions } = data

      const dateTimeString = `${gameDate}T${gameTime}:00`
      const position = lookingForOptions.find((option) => option.selected === true)?.position ?? 'TANTO FAZ'

      const user = new UserDTO(name, number)
      const playerVancancy = new PlayerVacancyDTO(Date.now(), dateTimeString, user, position)

      try {
        const result = await playerVacancyDAO.createPlayerVacancy(playerVancancy)
        if (result) {
          createToast('Vaga publicada!', 'success')
        }
      } catch (err) {
        if (err instanceof Error)
          createToast(err.message, 'error')
        else
          createToast('Ocorreu um problema interno.', 'error')
      } finally {
        fetchData()
        appStore.setShowForm(false)
      }
    }

    const fetchData = async () => {
      const playerVacancies = await playerVacancyDAO.getAllPlayerVacancies()
      filterVacanciesThisWeek(playerVacancies)
      buildGroupByDay()
    }

    const initComponent = async () => {
      weekText.value = weekInterval()
      await firebase.login() 
      await fetchData()
      onSpinner.value = false
    }

    onMounted(() => {
      initComponent()
    })

    return {
      appStore,
      weekText,
      groupsByDay,
      publishVagancy,
      onSpinner,
      openCard,
    }
  }
})
</script>

<style scoped>
* {
  color: var(--secondary);
}

section {
  padding: 0 20%;
}

.header {
  display: flex;
  flex-direction: column;
}
.title,
.offer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;

  .offer-button {
    transition: all 0.3s;
    &:hover {
      background-color: var(--muted);
    }
  }
}

.calendar {
  transition: transform 0.2s ease;
  &:hover {
    cursor: pointer;
    transform: scale(1.1);
  }
}

.content {
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 100%;
  gap: 12px;
  margin: 10px 0;
}

@media screen and (max-width: 768px) {
  .section {
    padding: 2%;
  }

  .header {
    gap: 12px;
  }
  .title,
  .offer {
    width: 100%;
    text-align: center;
    flex-wrap: wrap;
  }
}

.app-footer {
  text-align: center;
  padding: 12px 0;
  font-size: 12px;
  color: var(--muted);
  cursor: pointer;
}
</style>
