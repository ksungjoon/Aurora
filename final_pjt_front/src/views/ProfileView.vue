<template>
  <div>
    <h1>{{ getUsername }}의 프로필</h1>
    <ProfileItem/>
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
// import MovieList from '@/components/MovieList.vue'
import ProfileItem from '@/components/ProfileItem.vue'
import ProfileLikeMovie from '@/components/ProfileLikeMovie.vue'
import ProfileWatchedMovie from '@/components/ProfileWatchedMovie.vue'
import { mapGetters } from 'vuex';
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ProfileView',
    data() {
        return {
        like_movie:null,
        watched_movie:null
        }
    },
  created(){
    this.likeMovieList()
    this.watchedMovieList()
  },

  components: {
    ProfileItem,
    ProfileLikeMovie,
    ProfileWatchedMovie,
    // MovieList
  },
  computed: {
    ...mapGetters(['getUsername']),
  },
  methods:{
    likeMovieList(){
      axios({
          method: "get",
          url: `${API_URL}/accounts/profile/${this.getUsername}/`,
        }).then((res) => {
          console.log(res)
          this.like_movie = res.data.like_movies;
          console.log(this.like_movie);
        })
        .catch((err)=>{
            console.log(err);
            this.like_movie = []
        });
    },
    watchedMovieList(){
      axios({
          method: "get",
          url: `${API_URL}/accounts/profile/${this.getUsername}/`,
        }).then((res) => {
          console.log(res)
          this.watched_movie = res.data.watched_movies;
          console.log(this.watched_movie);
        })
        .catch((err)=>{
            console.log(err);
            this.watched_movie = []
        });
    },
  }
};
</script>

<style>
</style>
