<template>
  <section>
    <div class="header">
      <div class="title">
        <calendar-icon :size="42" class="calendar" />
        <span> Tá afim de jogar essa semana? Segue alguns horários precisando de um ATLETA. </span>
      </div>
      <div class="offer">
        <span> {{ weekText }} </span>
        <span> - </span>
        <default-button :text="'divulgar uma vaga'" :classes="['offer-button']" />
      </div>
    </div>

    <div class="content">
      <template v-if="Object.keys(groupsByDay).length">
        <template v-for="(cards, dayName) in groupsByDay" :key="dayName">
          <index-colum :label="dayName" />
          <offer-card
            v-for="card in cards"
            :key="card.id"
            :game-date="card.gameDate"
            :owner="card.user.name"
            :looking-for="card.lookingFor"
          />
        </template>
      </template>
      <span v-else> nenhuma vaga disponível esta semana. </span>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import CalendarIcon from './components/icons/CalendarIcon.vue';
import DefaultButton from './components/button/DefaultButton.vue';
import IndexColum from './components/IndexColum.vue';
import OfferCard from './components/OfferCard.vue';
import type { PlayerVacancyDTO } from './dtos/PlayerVacancyDTO';
import { mockPlayerVacancies } from './utils/mocks';
import { dayMap } from './utils/dayMap';
import { firebase, playerVacancyDAO } from './services/api.service';

export default defineComponent({
  name: 'App',
  components: {
    CalendarIcon,
    DefaultButton,
    IndexColum,
    OfferCard,
  },
  setup() {
    const groupsByDay = ref<Record<string, PlayerVacancyDTO[]>>({})
    const offerCards = ref<PlayerVacancyDTO[]>([])
    const weekText = ref<string>('Semana...')
    const dates = ref<{ monday: Date | null, sunday: Date| null }>({monday: null, sunday: null })

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

        if (vacancyDate < dates.value.monday) {
          pastVacancies.push(vacancy)
        } else if (vacancyDate >= dates.value.monday && vacancyDate <= dates.value.sunday) {
          currentVacancies.push(vacancy)
        }
      }

      if (currentVacancies.length > 0) return offerCards.value = currentVacancies
    }

    const buildGroupByDay = () => {
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

    const initComponent = async () => {
      weekText.value = weekInterval()
      await firebase.login() 
      const playerVacancies = await playerVacancyDAO.getAllPlayerVacancies()
      filterVacanciesThisWeek(playerVacancies)
      buildGroupByDay()
    }

    onMounted(() => {
      initComponent()
    })

    return {
      weekText,
      groupsByDay,
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
</style>
