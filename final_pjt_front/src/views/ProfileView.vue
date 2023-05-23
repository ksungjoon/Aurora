<template>
  <div>
    <h1>{{ profile.username }}의 프로필</h1>
    <!-- <button @click="look">클릭</button> -->
    <ProfileItem :followed='followed' :followers_count='followers_count' :followings_count='followings_count' @getuserlike="getUserLike"/>
    <!-- <p>{{profile.followers.length}}</p>
    <p>{{profile.followings.length}}</p> -->
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
import ProfileItem from '@/components/ProfileItem.vue'
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
      followed:false,
      followers_count: 0,
      followings_count: 0,
    }
  },
  components: {
    ProfileItem,
    ProfileLikeMovie,
    ProfileWatchedMovie
  },
  created(){
    this.likeMovieList(),
    this.watchedMovieList()
    this.getUserLike()
  },
  // created(){
  //   this.likeMovieList(),
  //   this.watchedMovieList()
  // },
  computed: {
    ...mapGetters(['getUsername', 'profile']),
  },
  methods: {
    // look() {
    //   this.likeMovieList();
    //   this.watchedMovieList();
    // },
    likeMovieList() {
      axios.get(`${API_URL}/accounts/profile/${this.profile.username}/`)
        .then((res) => {
          this.like_movie = res.data.like_movies;
        })
        .catch((err) => {
          console.log(err);
          this.like_movie = [];
        });
    },
    watchedMovieList() {
      axios.get(`${API_URL}/accounts/profile/${this.profile.username}/`)
        .then((res) => {
          this.watched_movie = res.data.watched_movies;
        })
        .catch((err) => {
          console.log(err);
          this.watched_movie = [];
        });
    },
    getUserLike(){
      axios({
        method:'get',
        url:`${API_URL}/accounts/${ this.profile.username}/followcount/`,
        headers: {
              Authorization: `Token ${this.$store.state.loginStore.token}`,
          },
      })
      .then((res)=>{
      //   console.log(res)
  
        this.followed = res.data.followed
        this.followers_count= res.data.followers_count
        this.followings_count= res.data.followings_count
      })
      .catch((err)=>{
        console.log(err)
      })
      },
  }
};
</script>
