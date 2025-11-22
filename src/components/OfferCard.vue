<template>

  <div class="container" @click="$emit('click', dayName, gameTime, number)">

    <div class="day-game">
      <calendar-icon :size="22" :stroke="colors.accent" />
      <div class="colum">
        <span> {{ dayDate }} </span>
        <span class="dark-color"> {{ dayName }} </span>
      </div>
    </div>
    
    <div class="game-time">
      <clock-icon :stroke="colors.accent" />
      <span> {{ gameTime }} </span>
    </div>

    <div class="owner">
      <span> Responsável </span>
      <span class="dark-color"> {{ owner }} </span>
    </div>

    <div class="looking-for">
      <span> Procurando por: </span>
      <div class="player-position"> <span> {{ lookingFor }} </span> </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue';
import CalendarIcon from './icons/CalendarIcon.vue';
import ClockIcon from './icons/ClockIcon.vue';
import { colors } from '@/utils/color';
import { dayMap } from '@/utils/dayMap';

export default defineComponent({
  name: 'OfferCard',
  components: {
    CalendarIcon,
    ClockIcon,
  },
  props: {
    gameDate: { type: String, required: true },
    owner: { type: String, required: true },
    number: { type: String, required: true },
    lookingFor: { type: String, required: true },
  },
  setup(props) {
    const dayDate = ref('')
    const dayName = ref('')
    const gameTime = ref('')

    const formatDate = (dateStr: string): void => {
      const date = new Date(dateStr)

      const day = String(date.getDate()).padStart(2, '0')
      const month = String(date.getMonth() + 1).padStart(2, '0')

      const hr = String(date.getHours()).padStart(2, '0')
      const min = String(date.getMinutes()).padStart(2, '0')

      dayDate.value = `${day}/${month}/${date.getFullYear()}`
      dayName.value = dayMap[date.getDay()] ?? 'Domingo'
      gameTime.value = `${hr}:${min}`
    }

    onMounted(() => {
      formatDate(props.gameDate)
    })

    return {
      colors,
      dayDate,
      dayName,
      gameTime,
    }
  }
})
</script>

<style scoped>
* {
  color: var(--accent);
}

.container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
  padding: 24px;
  border-radius: 10px;
  font-size: 16px;
  transition: background-color 0.3s ease;
  background-color: var(--tertiary);
  cursor: pointer;

  &:hover {
    background-color: var(--hover-detail);
  }
}

.dark-color {
  font-weight: 400;
  color: var(--secondary);
}

.day-game .colum {
  display: flex;
  flex-direction: column;
}
.game-time {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
}

.looking-for,
.owner {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6px;
}

.player-position {
  padding: 10px;
  border-radius: 20px;
  background-color: var(--muted);
}

@media screen and (max-width: 768px) {
  .container {
    flex-direction: column;
    gap: 22px;
    height: 100%;
    align-items: center;
  }

  .colum,
  .day-game {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 8px;
  }
}
</style>