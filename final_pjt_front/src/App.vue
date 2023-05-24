<template>
  <div id="app">
    <nav>
      <div class="nav-left">
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
          <a class="logout-link" @click="logout">Logout</a>
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
    <div class="footer">footer 구역입니다.</div>
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

<style scoped>
html,
body {
  height: 100%;
}

#app {
  background-image: url('@/assets/beautiful-nature-3989829.jpg');
  background-size: cover;
  background-position: center center;
  min-height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

nav {
  padding: 10px;
  background-color: #0f3a53;
  display: flex;
  justify-content: space-between;
}

nav a {
  font-weight: bold;
  color: rgb(238, 225, 225);
  text-decoration: none; 
  margin: 0 10px;
}

nav a.router-link-exact-active {
  color: #2dbedb;
}

.nav-left {
  display: flex;
  align-items: center;
}

.nav-right {
  display: flex;
  align-items: center;
}

.router-view {
  flex-grow: 1;
}
.logout-link {
  color: rgb(238, 225, 225);
}
.footer {
  height: 50px;
  margin-top: auto;
  background-color: rgb(159, 43, 43);
  color: white;
}
</style>
