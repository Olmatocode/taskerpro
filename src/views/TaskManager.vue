<template>
  <div class="task-grid">
    <div class="grid-item" @click="goToTaskList()">
      <h2>Return to Task List</h2>
      <h3>More content TBC</h3>
    </div>
  </div>
  <br>
  <br>
  <div class="form">
    <form>
      <label for="taskId">Task ID:</label>
      <input type="text" id="taskId" v-model.number="allTasks.taskId" disabled>
      <input type="button" v-on:click="returnDelConfirm(allTasks.taskId)" value="Delete this task"/><br><br>

      <label for="clientId">Client ID:</label>
      <input type="text" id="clientId" v-model.number="allTasks.clientId" disabled><br><br>


      <label for="objId">Object ID:</label>
      <input type="text" id="objId" v-model.number="allTasks.objectId" disabled><br><br>

      <label for="taskName">Task Name:</label>
      <input type="text" id="taskName" v-model.number="allTasks.taskName" disabled>
      <input type="text" placeholder="Edit task name" v-model.number="localVar.taskName"><br><br>

      <label for="taskDesc">Task Description: </label>
      <textarea type="text" id="taskDesc" v-model.number="allTasks.taskDesc" disabled></textarea>
      <textarea type="text" placeholder="Edit task description" v-model.number="localVar.taskDesc"></textarea><br><br>

      <label for="objectAddress">Task Address: </label>
      <input type="text" id="objectAddress" v-model.number="allTasks.objectAddress" disabled>
      <input type="text" placeholder="Edit task address" v-model.number="localVar.objectAddress"><br><br>


      <label for="taskStart">Task Start Time: </label>
      <input type="text" id="taskStart" v-model.number="allTasks.taskStart" disabled>
      <input type="datetime-local" placeholder="Edit task start date" v-model="localVar.taskStart">

      <label for="taskEnd">Task End Time: </label>
      <input type="text" id="taskEnd" v-model.number="allTasks.taskEnd" disabled>
      <input type="datetime-local" placeholder="Edit task end time" v-model="localVar.taskEnd"><br><br>

      <input type="submit" v-on:click="returnConfirm()"/>

      <br><br>
      {{output}}
    </form>
  </div>
  <br><br><br><br><br><br>

</template>

<script>
import router from "@/router";
export default {
  data: function () {
    return {
      oneTask: {},
      clientId: "",
      taskId: "",
      taskName: "",
      taskDesc: "",
      taskStart: "",
      taskEnd: "",
      objectAddress: "",
      objectId: "",
      scId: "",
      output: "",
      actions: "",
      findTaskId: "",
      btnSubmit: "",
      localVar: {},
      allTasks: {}
    }
  },
  methods: {
    returnConfirm: function () {
      if (confirm('Are you sure?') == true) {
        console.log("tst")
        if (this.localVar.taskName) {
          this.editTaskName()
        }
        if (this.localVar.taskDesc) {
          this.editTaskDesc()
        }
        if (this.localVar.objectAddress) {
          this.editTaskAddress()
        }
        if (this.localVar.taskStart) {
          this.editTaskStart()
        }
        if (this.localVar.taskEnd) {
          this.editTaskEnd()
        }
        this.output = "Your changes have been implemented."
      } else {
        this.output = "No changes made."
      }
    },
    returnDelConfirm: function () {
      if (confirm('Do you want to delete this task?') == true) {
        if (confirm('Are you sure?') == true) {
          let localVar = this.allTasks
          this.deleteTask()
          alert("Your task has been deleted. Returning to task list.")
          this.goToTaskList(localVar.clientId);
        } else {
          this.output = "Task not deleted."
        }
      } else {
        this.output = "No changes made."
      }
    },
    getOneTask: function () {
      this.$http.get('api/tasker/dashboard/getOneTask/' + this.taskId)
          .then(response => {
            this.allTasks = response.data
          })
    },
    goToTaskList(id) {
      this.clientId = id
      router.push('/tasklist/')
    },
    refreshManager: function () {
      router.push('/taskmanager/' + this.taskId)
    },
    editTaskName: function () {
      this.allTasks.taskName = this.localVar.taskName
      this.localVar.taskName = ""
      this.$http.put("api/tasker/dashboard/updateTaskName", this.allTasks)
      /*          .then(response => {
                  this.output = response.data
                })*/
    },
    editTaskDesc: function () {
      this.allTasks.taskDesc = this.localVar.taskDesc
      this.localVar.taskDesc = ""
      this.$http.put("api/tasker/dashboard/updateTaskDesc", this.allTasks)
      /*          .then(response => {
                  this.output = response.data
                })*/
    },
    editTaskAddress: function () {
      this.allTasks.objectAddress = this.localVar.objectAddress
      this.localVar.objectAddress = ""
      this.$http.put("api/tasker/dashboard/updateObjectAddress", this.allTasks)
      /*          .then(response => {
                  this.output = response.data
                })*/
    },
    editTaskStart: function () {
      this.allTasks.taskStart = this.localVar.taskStart
      this.localVar.taskStart = ""
      this.$http.put("api/tasker/dashboard/updateTaskStart", this.allTasks)
      /*          .then(response => {
                  this.output = response.data
                })*/
    },
    editTaskEnd: function () {
      this.allTasks.taskEnd = this.localVar.taskEnd
      this.localVar.taskEnd = ""
      this.$http.put("api/tasker/dashboard/updateTaskEnd", this.allTasks)
      /*          .then(response => {
                  this.output = response.data
                })*/
    },
    deleteTask: function () {
      this.$http.delete('api/tasker/dashboard/delete/' + this.$route.params.id)
      console.log("deleted")
    },
  }
  ,
  mounted() {
    this.taskId = this.$route.params.id
    this.getOneTask()
  }
}
</script>

<style scoped>
.task-grid {
  display: grid;
  grid-template-columns: minmax(300px, 30%)minmax(300px, 30%)minmax(300px, 30%);
  gap: 30px;
  margin-right: 5%;
  margin-top: 2%;
}
.grid-item {
  border: 0px solid rgba(255, 250, 254, 0.27);
  border-radius: 20px;
  padding: 34px;
  position: relative;
  min-height: 60px;
  max-height: 60px;
  background-color: rgba(255, 250, 254, 0.4);
  box-shadow: 4px 3px 11px 3px rgba(0, 0, 0, 0.30);
}
.form {
  width: 800px;
  height: 380px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 0px solid rgba(255, 250, 254, 0.27);
  border-radius: 20px;
  background-color: rgba(255, 250, 254, 0.4);
  box-shadow: 4px 3px 11px 3px rgba(0, 0, 0, 0.30);
  resize: none;
}
label {
  display: inline-block;
  float: left;
  clear: left;
  width: 130px;
  text-align: left;
}
input {
  display: inline-block;
  float: left;
}
</style>