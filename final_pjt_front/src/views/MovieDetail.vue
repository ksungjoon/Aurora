<template>
    <div class="container">
        <div class="row">
            <div class="col-md-6">
                <div class="image-box">
                <img :src="movie?.poster_path" class="rounded image-thumbnail" alt="">
                </div>
            </div>
            <div class="col-md-6">
                <div>
                <h1>{{ movie?.title }}</h1>
                <br>
                <p>줄거리: {{ movie?.overview }}</p>
                <p>
                    <img src="@/assets/star.png" alt="" class='star'>
                    {{ movie?.vote_average }}</p>
                </div>
                <br>
                <div v-if="isLogin">
                    <div>
                    <MovieLike :movie='movie' :likes_count='likes_count' :liked='liked' @getmovielike="getMovieLike"/>
                    <br>
                    <MovieWatched :movie='movie' :watched='watched' @getmoviewatched="getMovieWatched"/> 
                    </div>
                </div>
            </div>
        </div>
        <br>
        <CommentForm @create-comment="createComment" :movie="movie"/>
        <CommentList :movie="movie" :comments='comments'/>
        <!-- {{liked}} {{likes_count}}
        {{watched}} -->
    </div>
</template>

<script>
import axios from 'axios'
import CommentForm from '@/components/CommentForm'
import CommentList from '@/components/CommentList'
import MovieLike from '@/components/MovieLike'
import MovieWatched from '@/components/MovieWatched'
import { mapGetters } from 'vuex';

const API_URL = 'http://127.0.0.1:8000'

export default {
    name: 'MovieDetail',
    components:{
        CommentForm,
        CommentList,
        MovieLike,
        MovieWatched

    },
    data() {
        return {
        movie: null,
        comments:[],
        likes_count:0,
        liked:false,
        watched:false,
        }
    },
    created() {
        this.getMovieDetail()
    },
    computed: {
    ...mapGetters(['isLogin', 'getUsername']),
    },

    methods: {
        getComments() {
        axios({
            method: "get",
            url: `${API_URL}/api/v1/comments/list/${this.movie.id}/`,
        }).then((res) => {
            this.comments = res.data;
            console.log(this.comments);
        })
        .catch((err)=>{
            console.log(err);
            this.comments = []
        });
        },
        getMovieDetail() {
        axios({
            method: 'get',
            url: `${API_URL}/api/v1/movies/${ this.$route.params.id }/`,
        })
        .then((res) => {
            console.log(res)
            this.movie = res.data
            this.getComments();
            this.getMovieLike()
            this.getMovieWatched()
        })
        .catch((err) => {
            console.log(err)
        })
        },
        createComment(res){
            this.comments.push(res.data)
        },

        getMovieLike(){
        axios({
          method:'get',
          url:`${API_URL}/api/v1/movies/${ this.movie.id}/like/count`,
          headers: {
                Authorization: `Token ${this.$store.state.loginStore.token}`,
            },
        })
        .then((res)=>{
        //   console.log(res)
          this.likes_count = res.data.likes_count
          this.liked = res.data.liked
        })
        .catch((err)=>{
          console.log(err)
        })
        },
        getMovieWatched(){
        axios({
          method:'get',
          url:`${API_URL}/api/v1/movies/${ this.movie.id}/watched/count`,
          headers: {
                Authorization: `Token ${this.$store.state.loginStore.token}`,
            },
        })
        .then((res)=>{
          console.log(res)
          this.watched = res.data.watched
        })
        .catch((err)=>{
          console.log(err)
        })
      }

    }
}
</script>
<style scoped>
.profile-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
/* .image-box {
    width:380px;
    height:220px;
    overflow:hidden;
    margin:0 auto;
} */
.image-thumbnail {
    width:100%;
    height:100%;
    object-fit:cover;
}
.star {
    height:30px;
    width: 30px;
    margin: 10px auto;
}

</style>