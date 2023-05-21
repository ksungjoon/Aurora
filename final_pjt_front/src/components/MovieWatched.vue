<template>
<div>
  <button @click="movieWatched">
    {{ watched ? '봤던영화 취소' : '봤던영화' }}
  </button>
</div>
  
</template>

<script>
import axios from "axios";

const API_URL = 'http://127.0.0.1:8000'

export default {
    props:{
        movie:Object,
        watched:Boolean,
    },

    methods: {
      movieWatched(){
        
        axios({
          method: 'post',
          url: `${API_URL}/api/v1/movies/${this.movie.id}/watched/`,
          data:{
            
          },
          headers: {
          Authorization: `Token ${this.$store.state.loginStore.token}`,
          },
        })
        .then((res)=>{
          console.log(res)
          this.$emit('getmoviewatched')
        })
      
        .catch((err)=>{
          console.log(err)
        })
      },
    },
};
</script>