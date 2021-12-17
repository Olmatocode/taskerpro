<template>
  <div class="container">
    <div class="sidebar" v-if="!user">
      <NavLinks></NavLinks>
    </div>
    <div class="main">
      <slot>
        <router-view/>
      </slot>
    </div>

  </div>
</template>

<script>
import NavLinks from "@/components/NavLinks";

export default {
  components: {
    NavLinks

  },
  data: function () {
    return {
      user: '',
      mounted() {
        this.user = localStorage.getItem('user')
      }
    }
  }
}


</script>
<style>
@import './assets/css/mainstyles.css';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #e5f8f4;
}

.container {
  width: 100%;
  display: grid;
  grid-template-areas: "sidebar main";
  grid-template-columns: minmax(200px, 15%) minmax(300px, 85%);
}

.sidebar {
  grid-area: sidebar;
  height: 100vh;
  color: #ffffff;
  text-decoration: none;
  min-width: 250px;
  max-width: 25%;
}

.main {
  grid-area: main;
  height: 100vh;
  min-width: 75%;
}
</style>
