<template>
  <div>
    <h1>{{ getUsername }}의 프로필</h1>
    <!-- <button @click="look">클릭</button> -->
    <!-- <ProfileItem/> -->
    <p>{{this.followers}}</p>
    <p>{{this.followings}}</p>
    <div>좋아요한 영화</div>
    <ProfileLikeMovie
      v-for="likemovie in like_movie"
      :key="likemovie.id"
      :likemovie="likemovie"
    />
    <div>봤던 영화</div>
    <ProfileWatchedMovie
      v-for="watchedmovie in watched_movie"
      :key="watchedmovie.id"
      :watchedmovie="watchedmovie"
    />
  </div>
</template>

<script>
import axios from 'axios'
// import ProfileItem from '@/components/ProfileItem.vue'
import ProfileLikeMovie from '@/components/ProfileLikeMovie.vue'
import ProfileWatchedMovie from '@/components/ProfileWatchedMovie.vue'
import { mapGetters } from 'vuex';
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ProfileView',
  data() {
    return {
      like_movie: null,
      watched_movie: null,
      followers:null,
      followings:null
    }
  },
  components: {
    // ProfileItem,
    ProfileLikeMovie,
    ProfileWatchedMovie
  },
  created(){
    this.likeMovieList(),
    this.watchedMovieList()
    this.fetchProfile()
  },
  computed: {
    ...mapGetters(['getUsername', 'profile']),
  },
  methods: {
    // look() {
    //   this.likeMovieList();
    //   this.watchedMovieList();
    // },
    likeMovieList() {
      axios.get(`${API_URL}/accounts/profile/${this.getUsername}/`)
        .then((res) => {
          this.like_movie = res.data.like_movies;
        })
        .catch((err) => {
          console.log(err);
          this.like_movie = [];
        });
    },
    watchedMovieList() {
      axios.get(`${API_URL}/accounts/profile/${this.getUsername}/`)
        .then((res) => {
          this.watched_movie = res.data.watched_movies;
        })
        .catch((err) => {
          console.log(err);
          this.watched_movie = [];
        });
    },
    fetchProfile() {
      axios({
      url: `${API_URL}/accounts/profile/${this.getUsername}/`,
      method: 'get',
      headers: { Authorization: `Token ${this.$store.state.loginStore.token}` }
      })
      .then((res) => {
          console.log(res.data)
          console.log('제발')
          this.followers=res.data.followers.length;
          this.followings=res.data.followings.length;
          
      })
      .catch((err) => {
          console.log(err);
        
      });
    }
  }
};
</script>
