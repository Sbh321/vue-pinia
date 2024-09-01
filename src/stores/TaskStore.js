import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [],
    isLoading: false,
    error: null,
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
  actions: {
    async getTasks() {
      this.isLoading = true;
      this.error = null;
      try {
        const res = await fetch("http://localhost:3000/tasks");
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        const data = await res.json();
        this.tasks = data;
      } catch (error) {
        this.error = error.message;
        console.error("Failed to fetch tasks: ", error);
      } finally {
        this.isLoading = false;
      }
    },
    async addTask(task) {
      this.isLoading = true;
      this.error = null;
      try {
        const res = await fetch("http://localhost:3000/tasks", {
          method: "POST",
          body: JSON.stringify(task),
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }
        this.tasks.push(await res.json());
      } catch (error) {
        this.error = error.message;
        console.error("Failed to add tasks: ", error);
      } finally {
        this.isLoading = false;
      }
    },
    async deleteTask(id) {
      this.isLoading = true;
      this.error = null;

      try {
        const res = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: "DELETE",
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        this.tasks = this.tasks.filter((t) => t.id !== id);
      } catch (error) {
        this.error = error.message;
        console.error("Failed to delete task: ", error);
      } finally {
        this.isLoading = false;
      }
    },
    async toggleFav(id) {
      const task = this.tasks.find((t) => t.id === id);

      this.isLoading = true;
      this.error = null;

      try {
        const res = await fetch(`http://localhost:3000/tasks/${id}`, {
          method: "PATCH",
          body: JSON.stringify({ isFav: task.isFav }),
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error(`Error: ${res.status} ${res.statusText}`);
        }

        task.isFav = !task.isFav;
      } catch (error) {
        this.error = error.message;
        console.error("Failed to favorite the task: ", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
});
