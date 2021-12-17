<template>
  <div class="info-container logingrid">
    <div class="grid-items first"><input class="btn input" placeholder="Teie konto" v-model="user.clientName"></div>
    <div class="grid-items second"><input type="password" class="btn input" placeholder="Teie parool" v-model="user.password"></div>
    <div class="grid-items third"><button class="specbtn btn input" @click="login">Logi sisse</button></div>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "LoginBox",
  data: () => ({
    id: '',
    user: {},
    token: ''
  }),
  methods: {
    login() {
      this.$http.post('api/tasker/public/login', this.user)
          .then(result => {
            this.token = result.data;
            localStorage.setItem('jwt', this.token)
            localStorage.setItem('user', this.user.clientName)
            this.$http.defaults.headers.common['Authorization'] = "Bearer " + this.token})
      router.push({path:'/tasklist/'})
          .catch(error => {
            alert('midagi läks valesti')

          })
    },
    logout() {
      this.token = '';
      localStorage.removeItem('user-token');
      location.reload();
    }
  }
}
</script>

<style scoped>
.info-container.logingrid {
  align-content: center;
  max-width: 200px;
  margin: auto;

  padding-top: 10px;
  display: grid;
  grid-template-columns: 1px auto 10px;
  grid-template-rows: 50px 50px 50px;
  max-height: 200px;
  gap: 10px;
}
.btn.input{

  padding: 8px;
}
.grid-items {
  grid-column: 2;
  max-width: fit-content;
  max-height: fit-content;
  padding: 10px;
  margin-bottom: 30px;
}
.first {
  grid-row: 1;
}
.second {
  grid-row: 2;
}
.third {
  grid-row: 3;
}
</style>