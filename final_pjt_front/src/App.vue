<template>
  <div id="app">
    <nav>
      <router-link to="/">Movie</router-link> |
      <template v-if="isLogin">
        <router-link :to="{ name: 'RecommandView', params: { username: getUsername } }">
          Recommand
        </router-link> |
        <a @click="logout">Logout</a> | 
        <!-- <p @click="navigateToProfile">profile</p> -->
        <router-link :to="{ name: 'MyProfileView', params: { username: getUsername } }">
          Profile
        </router-link>
      </template>
      <template v-else>
        <router-link to="/login">Login</router-link> | 
        <router-link to="/signup">SignUp</router-link>
      </template>
      <div>
        <div class="search-form">
          <div class="search-box">
            <input type="text" @keydown.enter="searchMovies" v-model="searchKeyword"/>
              <span></span>
            </div>
          </div>
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
//     navigateToProfile() {
//       const username = this.getUsername;
//       this.$store.dispatch('fetchProfile', username)
//     .then(() => {
//       this.$router.push({ name: 'ProfileView', params: { username: username } });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// },


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
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>