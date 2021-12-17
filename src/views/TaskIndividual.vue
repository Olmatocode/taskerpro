<template>
  <div class="info-container task-desc">
  <div className="task-grid">
    <div ><button  className="specbtn btn" @click="goToTaskList">Return to Task List</button>
      <button className="specbtn btn" @click="getAllTasks(allTasks.clientId)">See all tasks</button>
      <input className="input btn" v-on:keyup.enter="findOneTask()" placeholder="Enter here to find another task by ID"
             v-model.number="findTaskId"/>
      <br>
      Your client ID is: {{ allTasks.clientId }}<br>
      Your task ID is: {{ allTasks.taskId }}<br>
      <br>
    </div>
  </div>
  </div>

  <div>

    <table className="table">
      <tr>
        <th>Task ID</th>
        <th>Task Name</th>
        <th>Task Desc</th>
        <th>Task Address</th>
        <th>Task Start</th>
        <th>Task End</th>
        <th>Client ID</th>
        <th>Subcontractor ID</th>
        <th>Object ID</th>
        <th>
        </th>
      </tr>
      <tr>
        <td style="max-width: 40px">{{ allTasks.taskId }}</td>
        <td>{{ allTasks.taskName }}</td>
        <td>{{ allTasks.taskDesc }}</td>
        <td>{{ allTasks.objectAddress }}</td>
        <td>{{allTasks.taskStart}}
        </td>
        <td>{{ allTasks.taskEnd }}</td>
        <td>{{ allTasks.clientId }}</td>
        <td>{{ allTasks.scId }}</td>
        <td>{{ allTasks.objectId }}</td>
        <td>
          <button className="specbtn btn" @click="goToEdit(allTasks.taskId)">Edit</button>
        </td>
      </tr>
    </table>
  </div>
  <div v-show="oneTask.length>0">
    <table className="table">
      <tr>
        <th>Task ID</th>
        <th>Task Name</th>
        <th>Task Desc</th>
        <th>Task Address</th>
        <th>Task Start</th>
        <th>Task End</th>
        <th>Client ID</th>
        <th>Subcontractor ID</th>
        <th>Object ID</th>
      </tr>
      <tr v-for="row in oneTask">
        <td>{{ row.taskId }}</td>
        <td>{{ row.taskName }}</td>
        <td>{{ row.taskDesc }}</td>
        <td>{{ row.objectAddress }}</td>
        <td>{{ row.taskStart }}</td>
        <td>{{ row.taskEnd }}</td>
        <td>{{ row.clientId }}</td>
        <td>{{ row.scId }}</td>
        <td>{{ row.objectId }}</td>
        <td>
          <button className="specbtn btn" @click="goToEdit(row.taskId)">Edit</button>
        </td>
        <!--        <td>
                  <select v-model="row.selected">
                    <option v-for="action in actions" v-bind:value="action.value">
                      {{}}
                    </option>
                    <option value="1">Edit Task Name</option>
                    <option value="2">Edit Description</option>
                    <option value="3">Edit Object Address</option>
                    <option value="4">Edit Start Time</option>
                    <option value="5">Edit End Time</option>
                    <option value="6">Edit Client</option>
                    <option value="7">Edit Subcontractor</option>
                    <option value="8">Edit Object</option>
                  </select>
                </td>
                <td>
                  <button v-on:click="action(row)">OK</button>
                </td>-->
      </tr>
    </table>
  </div>


  <br><br> <br><br> <br><br>
  <br><br> <br><br> <br><br>OUTPUT:<br><br> {{ this.output }}

</template>

<script>
import router from "@/router";
import axios from "axios";

export default {
  name: 'TaskIndividual',
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
      allTasks: [],
      str:''
    }
  },
  methods: {
    goToTaskList(id) {
      router.push('/tasklist/')
    },
    action: function (selection) {
      alert(selection.selected);
      router.push('/taskmanager/' + selection.taskId)
    },
    goToEdit: function (id) {
      router.push('/taskmanager/' + id)
    },
    getOneTask: function () {
      this.token = localStorage.getItem('jwt');
      axios.defaults.headers.common['Authorization'] = this.token
      this.$http.get('api/tasker/dashboard/getOneTask/' + this.$route.params.id)
          .then(response => {
            this.allTasks = response.data
            this.allTasks.TaskStart = this.spliceTaskStart(allTasks.TaskStart)
          })
          .catch(error => {
            this.output = error.response.data.message;
          })
    },
    findOneTask: function () {
      this.$http.get('api/tasker/dashboard/getOneTask/' + this.findTaskId)
          .then(response => {
            this.allTasks = response.data
          }).catch(error => {
        this.output = error.response.data.message;
      })
    },
    getAllTasks: function (id) {
      this.$http.get('api/tasker/dashboard/' + id)
          .then(response => {
            this.oneTask = response.data
          }).catch(error => {
        this.output = error.response.data.message;
      })
    },
    deleteTask: function () {
      this.$http.delete('api/tasker/dashboard/delete/' + this.$route.params.id)
          .then(response => this.oneTask = response.data)
    },
    spliceTaskStart: function (str) {
      this.str = this.str.slice(0, 10)
    }
  },
  mounted() {
    this.getOneTask();

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

.grid-item h2 {
  margin: 0;
  position: absolute;
  top: 25%;
  left: 20px;
  transform: translate(-5%, -5%);
}

.grid-item h3 {
  margin: 0;
  position: absolute;
  top: 90%;
  left: 10%;
  transform: translate(-5%, -100%);
}

.grid-item h4 {
  margin: 0;
  position: absolute;
  top: 75%;
  left: 25px;
  transform: translate(-5%, -5%);
}

.table {
  border: 0.5px double rgba(255, 250, 254, 100%);
  gap: 50px;
  padding: 10px;
  margin-right: 5%;
  margin-top: 2%;
  position: center;
  text-align: center;
  vertical-align: middle;
  width: fit-content;
}

th, td {
  border-bottom: 1px solid #ddd;
  gap: 10px;
  padding: 2px;
  margin-right: 1%;
  margin-top: 2%;
  position: center;
  text-align: center;
  vertical-align: middle;
  width: fit-content;
}

.button {
  border: 0px solid rgba(255, 250, 254, 0.27);
  border-radius: 20px;
  padding: 5px;
  position: relative;
  color: white;
  font-weight: normal;
  letter-spacing: 0.2px;
  min-width: 60px;
  min-height: 10px;
  max-height: 60px;
  background-color: rgba(255, 250, 254, 0.4);
  box-shadow: 4px 3px 11px 3px rgba(0, 0, 0, 0.30);
}

/*.input {*/
/*  border: 0px solid rgba(255, 250, 254, 0.27);*/
/*  border-radius: 20px;*/
/*  padding: 5px;*/
/*  position: relative;*/
/*  color: white;*/
/*  font-weight: normal;*/
/*  letter-spacing: 0.2px;*/
/*  color: white;*/
/*  width: 230px;*/
/*  min-height: 5px;*/
/*  max-height: 60px;*/
/*  background-color: rgba(255, 250, 254, 0.6);*/
/*  box-shadow: 4px 3px 11px 3px rgba(0, 0, 0, 0.30);*/
/*}*/

tr:hover {
  background-color: rgba(255, 255, 224, 0.2);
}
</style>