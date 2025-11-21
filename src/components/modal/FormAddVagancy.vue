<template>
  <div>
    <div class="section">
      <plus-icon :size="32" />
      <span style="font-size: 16px;"> Divulgar Vaga de Jogador </span>
    </div>

    <div class="inputs">
      <div class="floor">
        <div class="input-area">
          <div class="label">
            <user-icon />
            <span> Seu nome </span>
          </div>
          <input-generic v-model="formData.name" :place-holder="'ex: Weslley'" />
        </div>
      
        <div class="input-area">
          <div class="label">
            <phone-icon />
            <span> WhatsApp </span>
          </div>
          <input-generic v-model="formData.number" :place-holder="'449...'" />
          <div v-if="whatsappValidation && whatsappValidation.error" class="input-error">{{ whatsappValidation.error }}</div>
        </div>
      </div>

      <div class="floor">
        <div class="input-area">
          <div class="label">
            <calendar-icon :size="24" />
            <span> Data do Jogo </span>
          </div>
          <input-generic v-model="formData.gameDate" :type="'date'" />
        </div>

        <div class="input-area">
          <div class="label">
            <clock-icon :size="24" />
            <span> Horário </span>
          </div>
          <input-generic v-model="formData.gameTime" :type="'time'" />
        </div>
      </div>

      <div class="section">
        <target-icon />
        <span style="font-size: 16px;"> Procurando por </span>
      </div>

      <div class="positions">
        <div :class="['option', { selected: option.selected }]"
          v-for="option in formData.lookingForOptions"
          :key="option.position" @click="lookingForSelect(option.position)">
          <span> {{ option.position }} </span>
        </div>
      </div>

      <default-button :classes="['submit-button']" :text="'Publicar vaga'" @click="submitForm" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from "vue";
import { validateWhatsApp } from "@/utils/validations";
import PlusIcon from "../icons/PlusIcon.vue";
import InputGeneric from "../input/InputGeneric.vue";
import UserIcon from "../icons/UserIcon.vue";
import PhoneIcon from "../icons/PhoneIcon.vue";
import CalendarIcon from "../icons/CalendarIcon.vue";
import ClockIcon from "../icons/ClockIcon.vue";
import TargetIcon from "../icons/TargetIcon.vue";
import DefaultButton from "../button/DefaultButton.vue";
import { useAppStore } from "@/stores/app.store";

export default defineComponent({
  name: 'FormAddVagancy',
  components: {
    PlusIcon,
    InputGeneric,
    UserIcon,
    PhoneIcon,
    CalendarIcon,
    ClockIcon,
    TargetIcon,
    DefaultButton,
  },
  emits: ['save-data'],
  setup(_, { emit }) {
    const appStore = useAppStore()

    const formData = reactive({
      name: '',
      number: '',
      gameDate: '',
      gameTime: '',
      lookingForOptions: [
        { position: 'GOLEIRO', selected: false },
        { position: 'LINHA', selected: false },
        { position: 'TANTO FAZ', selected: true },
      ]
    })

    const lookingForSelect = (position: string) => {
      formData.lookingForOptions.forEach((p) => {
        p.selected = (p.position.toUpperCase() === position.toUpperCase())
      })
    }

    const whatsappValidation = computed(() => validateWhatsApp(formData.number))

    const submitForm = () => {
      const allComplet =
        !!(formData.name && formData.number && whatsappValidation.value.valid && formData.gameDate && formData.gameTime)
      if (!allComplet) return alert('Preencha o formulario!')
      emit('save-data', formData)
    }

    return {
      appStore,
      formData,
      lookingForSelect,
      whatsappValidation,
      submitForm,
    }
  },
})
</script>

<style scoped>
.section {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 12px;
}

.inputs {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.floor {
  display: flex;
  gap: 16px;
  margin-top: 20px;
  margin-bottom: 20px;
}
.input-area {
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
}
.label {
  display: flex;
  align-items: center;
  gap: 8px;
}
.input-error {
  font-size: 12px;
}

.positions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 22px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.option {
  text-align: center;
  padding: 10px;
  width: 100%;
  box-sizing: border-box;
  max-width: 100%;
  min-width: 0;
  border-radius: 6px;
  border: 1px solid var(--accent);

  &:hover {
    border-color: var(--secondary);
  }
}
.option.selected {
  color: var(--primary);
  background-color: var(--secondary);
  border-color: var(--secondary);
}

.submit-button {
  color: var(--primary);
  background-color: var(--secondary);
  border-radius: 4px;
  height: 44px;
  margin-top: 10px;
  font-size: 18px;
  font-weight: 400;

  &:hover {
    background-color: var(--accent);
  }
}

@media screen and (max-width: 768px) {
  .positions,
  .floor {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>