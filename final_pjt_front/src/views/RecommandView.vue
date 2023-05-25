<template>
  <div class="container recommand">
    <h1>{{ getUsername }}님을 위한 추천 영화</h1>
    <!-- <swiper :options="swiperOptions"> -->
      <!-- <swiper-slide> -->
        <RecommandList :recommand_genre="recommand_genre" v-if="recommand_genre" />
      <!-- </swiper-slide> -->
    <!-- </swiper> -->
  </div>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import RecommandList from '@/components/RecommandList.vue';
const API_URL = 'http://127.0.0.1:8000';

// import { Swiper, SwiperSlide } from "vue-awesome-swiper";
// import "swiper/css/swiper.css";

export default {
    data(){
        return{
            watched_like_movie:[],
            genre:[],
            recommand_genre:null,
            swiperOptions: {
  // 슬라이드를 반복해서 보여줄지 여부
  loop: true,
  // 슬라이드가 자동으로 넘어갈지 여부
  autoplay: {
    delay: 5000, // 슬라이드 간의 딜레이 (밀리초 단위)
    disableOnInteraction: false, // 사용자 상호작용 후에도 자동 재생 유지
  },
  // 페이징 버튼 (dot) 설정
  pagination: {
    el: '.swiper-pagination', // 페이징 요소 선택자
    clickable: true, // 페이징 버튼을 클릭할 수 있는지 여부
  },
  // 네비게이션 버튼 (prev/next) 설정
  navigation: {
    nextEl: '.swiper-button-next', // 다음 버튼 선택자
    prevEl: '.swiper-button-prev', // 이전 버튼 선택자
  },
  // 슬라이드의 너비와 높이를 자동으로 조정할지 여부
  autoHeight: true,
},
        }
    },
    components:{
        RecommandList,
      //    Swiper,
      //  SwiperSlide,
 
    },
    computed: {
        ...mapGetters(['getUsername', 'profile']),
    },
    created(){
        this.likeMovieList()
        // this.watchedMovieList()
        // this.loadMovies()
    },
    
    methods: {
    likeMovieList() {
      axios.get(`${API_URL}/accounts/profile/${this.getUsername}/`)
        .then((res) => {
            const likeMovies = res.data.like_movies;
            this.watched_like_movie = this.watched_like_movie.concat(likeMovies);
            this.watchedMovieList()
        })
        .catch((err) => {
          console.log(err);

        });
    },
    watchedMovieList() {
      axios.get(`${API_URL}/accounts/profile/${this.getUsername}/`)
        .then((res) => {
            const watchedMovies = res.data.watched_movies;
            this.watched_like_movie = this.watched_like_movie.concat(watchedMovies)
            this.loadMovies()
        })
        .catch((err) => {
          console.log(err);
      
        });
    },
    loadMovie(likemovie) {
      axios({
        method: "GET",
        url: `${API_URL}/api/v1/movies/${likemovie}/`
      })
        .then((res) => {
          console.log(res)
            res.data.genres.forEach((genre) => {
            this.genre.push(genre.id);
            });
        // console.log(this.genre)
        this.recommand_genre  = this.getMostFrequentGenre();
        // console.log(this.recommand_genre)
        //   this.genre.push(res.data.)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    loadMovies() {
      for (let i = 0; i < this.watched_like_movie.length; i++) {
        this.loadMovie(this.watched_like_movie[i]);
      }
    },
    getMostFrequentGenre() {
        const frequencyMap = {};
        let maxFrequency = 0;
        let mostFrequentGenre = null;

        this.genre.forEach((genre) => {
            if (frequencyMap[genre]) {
            frequencyMap[genre]++;
            } else {
            frequencyMap[genre] = 1;
            }

            if (frequencyMap[genre] > maxFrequency) {
            maxFrequency = frequencyMap[genre];
            mostFrequentGenre = genre;
            }
        });

        return mostFrequentGenre;
    },
  }
}
</script>
