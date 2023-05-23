<template>
<div>
<div class="d-flex justify-content-end">
  <div class="p-2 bd-highlight">
  <h4>팔로워</h4>
  <h5>{{followers_count}}</h5>
  <h4>팔로잉</h4>
  <h5>{{followings_count}}</h5>
  </div>
</div>
<div>
  <button type="button" class="btn btn-primary" @click="followUser">
    {{ followed ? '언팔로우' : '팔로우' }}
  </button>
</div>
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