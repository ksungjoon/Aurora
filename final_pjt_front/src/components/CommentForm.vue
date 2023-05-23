<template>
    <div class = "card mb-2">
        <div class="card-header bg-light ">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-dots-fill" viewBox="0 0 16 16">
                <path d="M16 8c0 3.866-3.582 7-8 7a9.06 9.06 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7zM5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0zm3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
            </svg>
            REPLY
        </div>
        <div class="card-body">
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <div class="d-flex justify-content-start flex-row mb-2 " >
                        <img src="@/assets/star.png" alt="" class="star" >
                        <select style="max-width: 50px" class="form-control" id="score" v-model="score">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"
                    v-model.trim="comment"
                    @keyup.enter="createComment"
                    placeholder="댓글을 작성해주세요."
                    ></textarea>
                    <button type="button" class="btn btn-dark mt-3" @click="createComment">post reply</button>
                </li>
            </ul>
        </div>
    </div>

    
</template>

<script>
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

export default {
    name: "CommentForm",
    props:{
        movie: Object,
    },
    data(){
        return{
            comment: null,
            score: null,
        }
    },
    methods:{
        createComment() {
            const comment = this.comment;
            if (!comment) {
                alert("내용을 입력하세요!");
                return;
            }
            axios({
                method: "post",
                url: `${API_URL}/api/v1/movies/${this.movie.id}/comments/`,
                data: {
                content: comment,
                score: this.score,
                },
                headers: {
                Authorization: `Token ${this.$store.state.loginStore.token}`,
                },
            })
                .then((res) => {
                console.log(res);
                this.$emit("create-comment", res);
                })
                .catch((err) => {
                console.log(err);
                });
            this.comment = null;
            this.score = null;
    },
    }

    
}
</script>
<style scoped>
.star {
    height:30px;
    width: 30px;
    margin: 10px;
}
</style>