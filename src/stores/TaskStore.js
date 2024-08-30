import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [
      { id: 1, title: "Have a meal", isFav: false },
      { id: 1, title: "Bath", isFav: true },
    ],
  }),
  getters: {
    favs() {
      return this.tasks.filter((t) => t.isFav);
    },
  },
});
