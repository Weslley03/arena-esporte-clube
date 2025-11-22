import { defineStore } from "pinia";

export const useAppStore = defineStore('app', {
  state: () => ({
    showForm: false,
  }),
  getters: {
    isShowForm(state): boolean {
      return state.showForm
    },
  },
  actions: {
    setShowForm(value: boolean): void {
      this.showForm = value
    },
  },
})