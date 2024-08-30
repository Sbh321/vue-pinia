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
    favCount() {
      return this.tasks.reduce((p, c) => {
        return c.isFav ? p + 1 : p;
      }, 0);
    },
    // totalCount() {
    //   return this.tasks.reduce((p, c) => {
    //     return p + 1;
    //   }, 0);
    // },
    totalCount: (state) => {
      return state.tasks.length;
    },
  },
});
