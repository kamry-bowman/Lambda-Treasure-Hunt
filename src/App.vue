<template>
  <div id="app">
    <Game />
  </div>
</template>

<script>
import Game from "./components/Game.vue";
import axios from "axios";
axios.defaults.baseURL = "https://lambda-treasure-hunt.herokuapp.com/api/adv";
axios.defaults.headers.common["Authorization"] = `Token ${
  process.env.VUE_APP_SECRET_TOKEN
}`;

export default {
  name: "app",
  components: {
    Game
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  * {
    box-sizing: border-box;
  }
}
</style>
