<template>
  <div class="task-grid">
    <div class="grid-item">
      <router-link to="/newTask">
        <div style="display: flex; justify-content: center;">
          <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 24 24" fill="none"
               stroke="currentColor" stroke-width="2" stroke-linecap="round" color="#FFFFFF" stroke-linejoin="round"
               class="feather feather-plus-circle">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="16"></line>
            <line x1="8" y1="12" x2="16" y2="12"></line>
          </svg>
        </div>
      </router-link>
    </div>
    <div class="grid-item" v-for="clientTask in clientTasks" @click="goToTask(clientTask.taskId)">
      <h2>{{ clientTask.taskName }}</h2>
      <h3>{{ clientTask.objectAddress }}</h3>
      <h4>{{ clipTimeStamp(clientTask.taskStart) }}</h4>
    </div>
  </div>

</template>

<script>
import router from "@/router";

export default {
  name: "TaskList",
  data: function () {
    return {
      clientTasks: [],
      userId: '',
      token: ''
    }
  },
  methods: {
    clipTimeStamp: function (v) {
      return v.substr(0, 10);
    },
    getClientTasks: function (id) {
      this.$http.get('api/tasker/dashboard/', id)
          .then(response =>
              this.clientTasks = response.data)
    },
    goToTask: function (id) {
      router.push({path: '/task/' + id})
    }
  },
  mounted() {
    this.userId = localStorage.getItem('user');
    this.token = localStorage.getItem('jwt');


    this.$http.get('api/tasker/dashboard/' + this.userId)
        .then(response => {
          this.clientTasks = response.data
        })
  }
}
</script>

<style scoped>
.gridster {
  display: grid;
  grid-template-columns: 300px;
  grid-template-rows: auto;
}
</style>