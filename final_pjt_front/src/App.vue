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


        <div class="search container">
          <input class="search input" type="text" placeholder="Search" @keydown.enter="searchMovies" v-model="searchKeyword">
        </div>


        <!-- <div class="search-form">
          <div class="search-box">
            <input type="text" @keydown.enter="searchMovies" v-model="searchKeyword"/>
          </div>
        </div> -->
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
/* @import url('https://fonts.googleapis.com/css2?family=Stylish&display=swap'); */

html,
body {
  height: 100%;
}

#app {
  background-image: url('@/assets/beautiful-nature-3989829.jpg');
  background-size: cover;
  background-position: center center;
  min-height: 100%;
  font-family: "Helvetica Nene", Helvetica, Arial, sans-serif; 
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000000;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

nav {
  padding: 10px;
  background-color:rgba(87, 79, 190, 0.432);;
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
.search input{
  width: 100%;
  padding: 12px 24px;
  background-color: transparent;
  transition: transform 250ms ease-in-out;
  font-size: 14px;
  line-height: 18px;
  
  color: #575756;
  background-color: transparent;
/*         background-image: url(http://mihaeltomic.com/codepen/input-search/ic_search_black_24px.svg); */

  background-image: url("data:image/svg+xml;charset=utf8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Cpath d='M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z'/%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-size: 18px 18px;
  background-position: 95% center;
  border-radius: 50px;
  border: 1px solid #575757;
  transition: all 250ms ease-in-out;
  backface-visibility: hidden;
  transform-style: preserve-3d;
        
}   

.search ::placeholder {
  color: color(#575756 a(0.8));
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.search :hover,:focus {
    padding: 12px 0;
    outline: 0;
    border: 1px solid transparent;
    border-bottom: 1px solid #575756;
    border-radius: 0;
    background-position: 100% center;
}
    


</style>
