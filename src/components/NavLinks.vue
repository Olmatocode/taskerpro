<template>
  <div id="nav">
    <nav >
      <ul>
        <li>
          <router-link to="/">Ülevaade</router-link>
        </li>
        <li>
          <router-link to="/">Teated</router-link>
        </li>
        <li>
          <router-link to="/taskList">Töökäsud</router-link>
        </li>
        <li>
          <router-link to="/" @click="logout"  v-if="user !== null">Logi välja</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "NavLinks",
  data: function () {
    return {
      user: ''
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('jwt');
      this.$http.defaults.headers.delete;
      localStorage.removeItem('user');
      router.push({path: '/'})

    }
  }
}
</script>

<style scoped>
ul {
  list-style: none;
  text-align: left;
  padding: 40px;
  line-height: 1.8;
}

ul a {
  font-size: x-large;
  color: whitesmoke;
  text-decoration: none;
}


</style>