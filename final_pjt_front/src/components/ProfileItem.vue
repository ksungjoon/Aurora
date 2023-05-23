<template>
<div>
  <button @click="followUser">
    {{ followed ? '언팔로우' : '팔로우' }}
  </button>
  <p>팔로워</p>
  {{followers_count}}
  <p>팔로잉</p>
  {{followings_count}}
</div>
  
</template>

<script>
import axios from "axios";
import { mapGetters } from 'vuex';

const API_URL = 'http://127.0.0.1:8000'

export default {
    props:{
        followed:Boolean,
        followers_count:Number,
        followings_count:Number,
    },
    computed: {
      ...mapGetters(['getUsername', 'profile']),
    },
    methods: {
      followUser(){
        
        axios({
          method: 'post',
          url: `${API_URL}/accounts/${this.profile.username}/follow/`,
          data:{
            
          },
          headers: {
          Authorization: `Token ${this.$store.state.loginStore.token}`,
          },
        })
        .then((res)=>{
          console.log(res)
          this.$emit('getuserlike')
        })
      
        .catch((err)=>{
          console.log(err)
        })
      },
    },
};
</script>