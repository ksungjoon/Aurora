<template>
  <div id="app">
    <nav>
      <div class="nav-left">
        <div class="logo">
          <img src="@/assets/logo_ssafy_coke.png" alt="logo">
        </div>
        <router-link to="/">Movie</router-link>
        <template v-if="isLogin">
          <router-link :to="{ name: 'RecommandView', params: { username: getUsername } }">
            Recommand
          </router-link>
        </template>
      </div>
      <div class="nav-right">
        <div class="search-form">
          <div class="search-box">
            <input type="text" @keydown.enter="searchMovies" v-model="searchKeyword"/>
          </div>
        </div>
        <template v-if="isLogin">
          <a @click="logout">Logout</a>
          <router-link :to="{ name: 'MyProfileView', params: { username: getUsername } }">
            Profile
          </router-link>
        </template>
        <template v-else>
          <router-link to="/login">Login</router-link>
          <router-link to="/signup">SignUp</router-link>
        </template>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'App',
  data() {
    return {
      searchKeyword: "",
    };
  },
  computed: {
    ...mapGetters(['isLogin', 'getUsername']),
  },
  methods: {
    ...mapActions(['logout', 'loadTotalMovies', 'fetchCurrentUser']),
  
    searchMovies() {
      const searchRoute = {
        name: 'SearchView',
        params: { keyword: this.searchKeyword },
      };
      this.$router.push(searchRoute);
      this.searchKeyword=""
    },
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 5px;
  background-color: #d6dbe0;
  display: flex;
  justify-content: space-between;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none; 
  margin: 0 5px;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.logo {
  display: flex;
  align-items: center;
}

.logo img {
  height: 50px;
  width: 60px;
  margin-right: 10px;
}

.nav-left {
  display: flex;
  align-items: center;
}

.nav-right {
  display: flex;
  align-items: center;
}
</style>
