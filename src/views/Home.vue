<template>
  <div style="margin-top: 10px">
    <input placeholder="client id" v-model="clientId"/>
    <button @click="goToTaskList(clientId)"
            style="width: 100px; height: 35px; border-radius: 5px; background-color: whitesmoke; opacity: 50%">Go to
      task list
    </button>
  </div>
  <br><br>
  <div>
    <button class="text">Not a Client yet?</button>
    <button class="button" v-on:click="addOne()"> Sign up </button>
    <br>
  </div>
</template>

<script>
import router from "@/router";
export default {
  name: 'Home',
  data: function () {
    return {
      clientId: ''
    }
  }
  ,
  methods: {
    goToTaskList(id) {
      router.push('/tasklist/' + id)
    },
    addOne: function () {
      router.push({name: 'Register'})
    },
  }
}
</script>

<style>
.grid-item {
  border: 0px solid rgba(255, 250, 254, 0.27);
  border-radius: 20px;
  padding: 100px;
  position: relative;
  text-align-all: center;
  left: 50%;
  top: 50%;
  color: white;
  font-weight: normal;
  font-size: xxx-large;
  width: 500px;
  height: 500px;
  background-color: rgba(255, 250, 254, 0.4);
  box-shadow: 4px 3px 11px 3px rgba(0, 0, 0, 0.30);
}
.button{
  width: auto;
  height: auto;
  border-radius: 20px;
  background-color: whitesmoke;
  opacity: 50%;
  font-size: xxx-large;
  color: darkslategrey;
  position: absolute;
  left: 50%;
  top: 50%;
  box-shadow: 4px 3px 11px 3px rgba(0, 0, 0, 0.30);
  border: 0 solid rgba(255, 250, 254, 0.27);
  padding: 10px 20px 15px;
}
.text {
  width: auto;
  height: auto;
  background-color: transparent;
  opacity: 80%;
  font-size: xxx-large;
  color: white;
  position: absolute;
  left: 45%;
  top: 42%;
  border: transparent;
}
button.button:hover {
  background-color: white;
}
</style>