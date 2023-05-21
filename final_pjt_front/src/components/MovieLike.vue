<template>
<div>
  <button @click="movieLike">
    {{ liked ? '좋아요 취소' : '좋아요' }}
  </button>
  {{ likes_count }}
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