<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <div class="new-task-form">
      <TaskForm />
    </div>

    <nav class="filter">
      <button
        @click="filter = 'all'"
        :class="{ 'btn-active': filter === 'all' }"
      >
        All
      </button>
      <button
        @click="filter = 'favs'"
        :class="{ 'btn-active': filter === 'favs' }"
      >
        Favorite
      </button>
    </nav>

    <div v-if="taskStore.isLoading" class="loading">loading...</div>

    <div v-if="taskStore.error" class="loading">{{ taskStore.error }}</div>

    <div v-if="filter === 'all'" class="task-list">
      <h2>All Tasks ({{ taskStore.totalCount }})</h2>
      <div v-for="task in taskStore.tasks" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favs'">
      <h2>Favorite Tasks ({{ taskStore.favCount }})</h2>
      <div v-for="task in taskStore.favs" :key="task.id">
        <TaskDetails :task="task" />
      </div>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import TaskDetails from "./components/TaskDetails.vue";
import TaskForm from "./components/TaskForm.vue";
import { useTaskStore } from "./stores/TaskStore";

const taskStore = useTaskStore();

// fetch the tasks from json-server api using pinia actions
taskStore.getTasks();

const filter = ref("all");
</script>

<style lang="scss" scoped></style>
