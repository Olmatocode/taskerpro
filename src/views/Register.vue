<template>
  <div class="form info-container logingrid">
    <form>
      <br>
      <div class="grid-items first">
        <input type="text" class="btn input "  id="clientName" placeholder="Enter your name" v-model="newClient.clientName" required><br></div>
      <div class="grid-items second">
        <input type="password" class="btn input"  id="password" placeholder="Enter new password" v-model.number="newClient.password"
               minlength="8" required><br>
      </div>
      <div class="grid-items second">      <input type="password" class="btn input"  id="passwordChk" placeholder="Confirm password"
                                                  v-model.number="passCheck.password"><br>
        <input type="checkbox" class="input"  v-on:click="passVis()">Show Password<br>
        <input type="button" class="btn input"  v-on:click="chkPass()" value="Sign Up"/><br><br>
        <input type="hidden" class="btn input"  id="login" v-on:click="goLogin()" value="Login"/></div>
      <div></div>



    </form>
    <div style="font-weight: bold; margin-top: 50px; position: absolute"> {{ output }}</div>
  </div>


</template>

<script>
import router from "@/router";
export default {
  name: "Register",
  data: function () {
    return {
      newClient: {},
      passCheck: {},
      clientName: "",
      passCode: "",
      output: ""
    }
  },
  methods: {
    chkPass: function () {
      if (this.newClient.clientName && this.newClient.password) {
        if (this.passCheck.password == this.newClient.password) {
          this.signup()
          this.unhide()
        } else {
          this.output = "Your passwords do not match."
        }
      } else {
        this.output = "Fill out the required fields to continue."
      }
    },
    signup: function () {
      this.$http.post("api/tasker/newClient", this.newClient)
          .then(response => {
            this.output = "Welcome! Your client id is: " + response.data
          })
    },
    passVis: function () {
      let x = document.getElementById("password");
      let y = document.getElementById("passwordChk")
      if (x.type === "password") {
        x.type = "text";
        y.type = "text";
      } else {
        x.type = "password";
        y.type = "password";
      }
    },
    unhide: function() {
      let x = document.getElementById("login");
      if (x.type === "hidden"){
        x.type = "button";
      }
    },
    goLogin: function () {
      router.push({name: 'Home'})
    }
  }
}
</script>

<style scoped>
.dfform {
  margin-top: 5%;
  width: 800px;
  height: 300px;
  padding: 12px 20px;
  box-sizing: border-box;
  border: 0px solid rgba(255, 250, 254, 0.27);
  border-radius: 20px;
  background-color: rgba(255, 250, 254, 0.4);
  box-shadow: 4px 3px 11px 3px rgba(0, 0, 0, 0.30);
  resize: none;
}
</style>