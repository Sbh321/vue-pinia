<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <div class="task-list">
      <h2>All Tasks</h2>
      <div v-for="task in taskStore.tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list">
      <h2>Favorite Tasks</h2>
      <div v-for="task in taskStore.favs" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script setup>
import TaskDetails from "./components/TaskDetails.vue";
import { useTaskStore } from "./stores/TaskStore";

const taskStore = useTaskStore();
</script>

<style lang="scss" scoped></style>
