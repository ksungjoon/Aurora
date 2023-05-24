<template>
    <div class="container detail">
        <div class="row">
            <div class="col-md-6">
                <div class="image-box">
                <img :src="movie?.poster_path" class="rounded image-thumbnail" alt="">
                </div>
            </div>
            <div class="col-md-6 content">
                <div>
                <h2>{{ movie?.title }}</h2>
                <div class="four">
                <p>
                    <img src="@/assets/star.png" alt="" class='star'>
                    {{ movie?.vote_average }}</p>
                <div v-if="isLogin" class="">
        
                    <MovieLike :movie='movie' :likes_count='likes_count' :liked='liked' @getmovielike="getMovieLike"/>
                    <MovieWatched :movie='movie' :watched='watched' @getmoviewatched="getMovieWatched"/> 
                    
                </div>
                </div>
                <p>줄거리: {{ movie?.overview }}</p>
                
                </div>
                <br>

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
.detail {
    background-color: rgba(255, 255, 255, 0.6);
  border-radius: 5px;
  margin-top: 50px;
  margin-bottom: 50px;
}
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
    width:90%;
    height:90%;
    object-fit:cover;
    margin-top: 30px;

}
.star {
    height:30px;
    width: 30px;
    margin: 10px auto;
}
.content{
    margin-top: 40px;
}
.four {
  display: flex;
}

.four > * {
  margin-right: 10px; /* 각 요소 사이의 간격 조정을 위한 마진 설정 */
}

</style>