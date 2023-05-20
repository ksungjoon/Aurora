<template>
    <div class="mb-5">
        <div class="card bg-dark">
        <div>
            <div>
            <form class="mb-4">
                <div class='form-group'>
                <label for="score">평점:</label>
                <select class="form-control" id="score" v-model="score">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
                </div>
                <div class='form-group'>
                <textarea
                class="form-control"
                rows="3"
                v-model.trim="comment"
                @keyup.enter="createComment"
                placeholder="댓글을 작성해주세요.  "
                ></textarea>
                </div>
            </form>
            </div>
        </div>
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