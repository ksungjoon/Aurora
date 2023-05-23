<template>
    <div>
        <p @click="navigateToProfile">{{ comment.user.username }}</p>
        <!-- <div>{{comment.user.username}}</div> -->
        <div>{{comment.content}}</div>
        <div>{{comment.score}}</div>
        <div>{{comment}}</div>
        <button @click="deleteComment">삭제</button>
    </div>
</template>

<script>
import axios from "axios";
const API_URL = "http://127.0.0.1:8000";

export default {
    name: "CommentListItem",
    props:{
        comment :Object
    },
    methods: {
        navigateToProfile() {
            const username = this.comment.user.username;
            console.log(username)
            this.$store.dispatch('fetchProfile', username)
        .then(() => {
            this.$router.push({ name: 'ProfileView', params: { username: username } });
        })
        .catch((err) => {
            console.log(err);
        });   
    },
    deleteComment() {
        axios({
            method: "delete",
            url: `${API_URL}/api/v1/comments/${this.comment.id}`,
        headers: {
            Authorization: `Token ${this.$store.state.loginStore.token}`,
        },
        })
        .then((res) => {
            console.log(res);

            this.$emit("delete-comment", this.comment.id);
        })
        .catch((err) => {
            console.log(err);
        });
    },
},

    
}
</script>
