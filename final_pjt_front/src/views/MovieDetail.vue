<template>
    <div>
        <h1>Detail</h1>
        <p>글 번호 : {{ movie?.id }}</p>
        <p>제목 : {{ movie?.title }}</p>
        <CommentForm @create-comment="createComment" :movie="movie"/>
        <CommentList :movie="movie" :comments='comments'/>

    
    </div>
</template>

<script>
import axios from 'axios'
import CommentForm from '@/components/CommentForm'
import CommentList from '@/components/CommentList'

const API_URL = 'http://127.0.0.1:8000'

export default {
    name: 'MovieDetail',
    components:{
        CommentForm,
        CommentList
    },
    data() {
        return {
        movie: null,
        comments:[],
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
        })
        .catch((err) => {
            console.log(err)
        })
        },
        createComment(res){
            this.comments.push(res.data)
        },

    }
}
</script>