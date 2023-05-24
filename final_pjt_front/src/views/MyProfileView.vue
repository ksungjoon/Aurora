<template>
  <div class="profile-container">
    <div class="d-flex justify-content-between">
    <h1>{{ getUsername }}의 프로필</h1>
    {{ profile_img }}
    <img :src="getImageUrl" alt="Profile Image">
<!-- 
    <img :src="`http://localhost:8000${profile_img}`" alt="Profile Image"> -->



    <input type="file" @change="handleFileUpload" ref="upimage">
    <button @click="uploadImage">이미지 업로드</button>
      
      
      
      <div>
        <h4>팔로워</h4>
        <h5>{{this.followers}}</h5>
        <h4>팔로잉</h4>
        <h5>{{this.followings}}</h5>
      </div>
    </div>
    <div class="section-title">좋아요한 영화</div>
    <div class="row row-cols-1  row-cols-md-3 row-cols-lg-5 g-4">
      <ProfileLikeMovie
        v-for="likemovie in like_movie"
        :key="likemovie.id"
        :likemovie="likemovie"
      />
    </div>
      <p v-if="!like_movie.length" class="d-flex justify-content-center">
        <br>
        좋아요 누른 영화가 없어요 ㅠㅠ
        <br>
      </p>
    <div class="section-title">봤던 영화</div>
    <div class="row row-cols-1  row-cols-md-3 row-cols-lg-5 g-4">
      <ProfileWatchedMovie
        v-for="watchedmovie in watched_movie"
        :key="watchedmovie.id"
        :watchedmovie="watchedmovie"
      />
    </div>
      <p v-if="!watched_movie.length"  class="d-flex justify-content-center">
        <br>
        본 영화가 없어요 ㅠㅠ
        <br>
      </p>
  </div>
</template>

<script>
import axios from 'axios'
import ProfileLikeMovie from '@/components/ProfileLikeMovie.vue'
import ProfileWatchedMovie from '@/components/ProfileWatchedMovie.vue'
import { mapGetters } from 'vuex';
const API_URL = 'http://127.0.0.1:8000'

export default {
  name: 'ProfileView',
  data() {
    return {
      like_movie: [],
      watched_movie: [],
      followers:null,
      followings:null,
      imageFile: null,
      profile_img: '',
    }
  },
  components: {

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
    getImageUrl() {
      const defaultProfileImg = require('@/assets/default_profile.jpg');
      if (this.profile && this.profile_img) {
        return `http://localhost:8000${this.profile_img}`;
      } else {
        return defaultProfileImg;
      }
    }
  },
  methods: {
    likeMovieList() {
      axios.get(`${API_URL}/accounts/profile/${this.getUsername}/`)
        .then((res) => {
          this.like_movie = res.data.like_movies;
          this.profile_img = res.data.profile_img;
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
    },
    handleFileUpload(event) {
      this.imageFile = event.target.files[0];
      console.log(this.imageFile)
    },
    uploadImage() {
      const file = this.$refs.upimage.files[0];
      console.log(file)
      const formData = new FormData();
      console.log(this.imageFile)
      formData.append('image', file);

      console.log(formData)

      axios.put(`${API_URL}/accounts/upload_img/${this.getUsername}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Token ${this.$store.state.loginStore.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log('확인');
        this.profile_img = res.data.profile_img
        console.log(this.profile_img)
        // 이미지 업로드 성공 후 처리
      })
      .catch((err) => {
        console.error(err);
        // 업로드 실패 시 처리
      });
    }

  }
}

</script>

<style scoped>
.profile-container {
  max-width: 80%;
  margin: 0 auto;
  padding: 20px;
}

h1 {
  font-size: 24px;
  margin-bottom: 20px;
  text-align: center;
}

.section-title {
  font-size: 20px;
  font-weight: bold;
  margin: 20px 0;
}

/* Customize ProfileItem component styles */
/* Example styles */
.profile-item {
  background-color: #f5f5f5;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.profile-item h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.profile-item p {
  font-size: 14px;
  color: #666;
}

/* Customize ProfileLikeMovie component styles */
/* Example styles */
.profile-like-movie {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.profile-like-movie img {
  width: 100px;
  height: 150px;
  object-fit: cover;
  margin-right: 10px;
}

.profile-like-movie h3 {
  font-size: 16px;
}

/* Customize ProfileWatchedMovie component styles */
/* Example styles */
.profile-watched-movie {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.profile-watched-movie img {
  width: 100px;
  height: 150px;
  object-fit: cover;
  margin-right: 10px;
}

.profile-watched-movie h3 {
  font-size: 16px;
}

</style>