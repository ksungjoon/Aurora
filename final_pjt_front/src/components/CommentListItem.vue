<template>
  <div class = "card mb-2">
    <div>
      <div class="card-header bg-light d-flex justify-content-start align-items-center">
        <div class=" d-flex align-items-center"><p class="mr-7" @click="navigateToProfile">작성자: {{ comment.user.username }}</p></div>
        <div class=" d-flex align-items-center"><p class="ml-2 align-items-center"><img src="@/assets/star.png" alt="" class="star">: {{ comment.score }}</p></div>
      </div>
      <br>
      <div>
        <p>{{ comment.content }}</p>
        <!-- <p>{{ comment.content }}</p> -->
      </div>
      <div><p class='text-muted'>작성일시: {{ formatDate(comment.created_at) }}</p></div>
      <button type="button" class="btn btn-dark mt-3"  @click="deleteComment">삭제</button>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';
import axios from "axios";
const API_URL = "http://127.0.0.1:8000";

export default {
  name: "CommentListItem",
  props: {
    comment: Object
  },
  computed: {
    ...mapGetters(['getUsername']),
    isSameUser() {
      return this.getUsername === this.comment.user.username;
    }
  },
  methods: {
    navigateToProfile() {
      const username = this.comment.user.username;
      if (this.isSameUser) {
        this.$router.push({ name: 'MyProfileView', params: { username: this.getUsername } });
      } else {
        this.$store.dispatch('fetchProfile', username)
          .then(() => {
            this.$router.push({ name: 'ProfileView', params: { username: username } });
          })
          .catch((err) => {
            console.log(err);
          });
      }
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
    formatDate(dateTime) {
      const date = new Date(dateTime);
      return date.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
    },
  },
};
</script>

<style scoped>
.star {
    height:20px;
    width: 20px;
    margin: 5px;
}
</style>