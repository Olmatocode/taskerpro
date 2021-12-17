<template>
  <div class="info-container logingrid" style="margin-top: 10px" v-show="logStatus === null">
    <div class="grid-items first"><input class="btn input" placeholder="Teie konto" v-model="user.id" @keypress.enter="login"></div>
    <div class="grid-items second"><input type="password" class="btn input" placeholder="Teie parool"
                                          v-model="user.password" @keypress.enter="login"><br></div>
    <div class="grid-items third">
      <button class="specbtn btn input" @click="login">Logi sisse</button>
      <button class="specbtn btn input" @click="goToRegister">Registreeri</button>
    </div>

  </div>
</template>

<script>
import router from "@/router";
import axios from "axios";

export default {
  name: "LoginPage",
  data: () => ({
    id: '',
    user: {},
    token: '',
    logStatus: ''
  }),
  methods: {
    goToRegister(){
      router.push({path: '/Register'})
    },
    login() {
      this.$http.post('api/public/tasker/login', this.user)
          .then(result => {
            this.token = result.data;
            localStorage.setItem('jwt', this.token)
            localStorage.setItem('user', this.user.id)
            axios.defaults.headers.common['Authorization'] = this.token
            router.push({path: '/tasklist/'})
                .catch(error => {
                  alert('midagi läks valesti')
                })
          })
    }
  },
  mounted() {
    this.logStatus = localStorage.getItem('user')

  }
}
</script>

<style scoped>

</style>