<template>
<div>
  <div>
    <h5>{{ likes_count }}명이 좋아해요~!</h5>
  </div>
  <br>
  <button @click="movieLike" class="btn btn-outline-danger">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bookmark-heart-fill" viewBox="0 0 16 16">
      <path d="M2 15.5a.5.5 0 0 0 .74.439L8 13.069l5.26 2.87A.5.5 0 0 0 14 15.5V2a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v13.5zM8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"/>
    </svg>
    {{ liked ? '좋아요 취소' : '좋아요' }}
  </button>
</div>
  
</template>

<script>
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000'

export default {
    props:{
        movie:Object,
        liked:Boolean,
        likes_count:Number,
    },

    methods: {
      movieLike(){
        
        axios({
          method: 'post',
          url: `${API_URL}/api/v1/movies/${this.movie.id}/like/`,
          data:{
            
          },
          headers: {
          Authorization: `Token ${this.$store.state.loginStore.token}`,
          },
        })
        .then((res)=>{
          console.log(res)
          this.$emit('getmovielike')
        })
      
        .catch((err)=>{
          console.log(err)
        })
      },
    },
};
</script>