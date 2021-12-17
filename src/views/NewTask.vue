<template>
  <div class="newgrid">
  <div class="info-container">

    <input class="input btn" placeholder="Ülesanne" v-model="task.taskName">
    <select class="input btn" v-model="task.scId">

      <option disabled  selected hidden>Valige allhankijat</option>

    <option v-for="contractor in contractors" v-bind:value="contractor.scId">{{contractor.scName}}</option>
  </select>



    <select class="input btn" v-model="task.objectId">

      <option disabled  selected hidden>Valige objekt</option>
    <option v-for="object in objects" v-bind:value="object.objectId">{{object.objectName}}</option>
      </select>
    <button class="btn specbtn" @click="postNewTask">Lisa</button>
  </div>
  <div class="info-container desc fix"><div class="wrap"><div class="pull-tab"></div><textarea class="input btn task-desc" placeholder="Kirjeldus"
                                                 v-model="task.taskDesc"></textarea></div>
  </div>
  </div>

</template>

<script>
export default {
  name: "NewTask",
  data: function () {
    return {
      task: {},
      contractors: [],
      objects: [],
      user: ''
    }
  },
  methods: {
    postNewTask: function () {
     this.task.clientId = localStorage.getItem('user');
      this.$http.post('api/tasker/dashboard/newTask', this.task)
      .then(response => alert(response.data))
    },
    getContractors: function () {
    this.$http.get('api/tasker/dashboard/subcontractors')
      .then(response =>
      this.contractors = response.data)
    },
    getObjects: function () {
      this.user = localStorage.getItem('user')
      this.$http.get('api/tasker/dashboard/objects/' + this.user)
          .then(response =>
              this.objects = response.data)
    }
  },
  mounted() {
    this.getContractors();
    this.getObjects();
    // this.$http.get('api/tasker/dashboard/subcontractors')
    //     .then(response =>
    //         this.contractors = response.data)
  }
}
</script>

<style scoped>
.newgrid {
  display: block;
  grid-template-areas: "info-container info-container";
  grid-template-rows: auto auto;
  grid-template-columns: 400px;
  padding-left: 5%;
  padding-right: 70%;
}
.info-container {
  min-width: 600px;
}
.info-container.desc.fix {
  min-width: 600px;
}
.input.btn.task-desc {
  min-width: 600px;
}

</style>