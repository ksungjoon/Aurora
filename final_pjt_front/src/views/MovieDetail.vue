<template>
    <div>
        <h1>Detail</h1>
        <p>글 번호 : {{ movie?.id }}</p>
        <p>제목 : {{ movie?.title }}</p>
        <MovieLike :movie='movie' :likes_count='likes_count' :liked='liked' @getmovielike="getMovieLike"/> 
        <CommentForm @create-comment="createComment" :movie="movie"/>
        <CommentList :movie="movie" :comments='comments'/>
        {{liked}} {{likes_count}}
    </div>
</template>

<script>
import axios from 'axios'
import CommentForm from '@/components/CommentForm'
import CommentList from '@/components/CommentList'
import MovieLike from '@/components/MovieLike'

const API_URL = 'http://127.0.0.1:8000'

export default {
    name: 'MovieDetail',
    components:{
        CommentForm,
        CommentList,
        MovieLike

    },
    data() {
        return {
        movie: null,
        comments:[],
        likes_count:0,
        liked:false,
        }
    },
    created() {
        this.getMovieDetail()
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
          console.log(res)
          this.likes_count = res.data.likes_count
          this.liked = res.data.liked
        })
        .catch((err)=>{
          console.log(err)
        })
      }

    }
}
</script>