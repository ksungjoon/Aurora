<template>
  <div>
    <div class="commentItem">
      <div class="divide">
        <div class="top">
          <div class="image_area">
            <img src="@/assets/default_profile.jpg" alt="프로필">
            <div class="middle">
              <div class="stars">
                <img src="@/assets/star.png" alt="" class="star" v-for="n in comment.score" :key="n">
              </div>
              <div class="name">
                <p @click="navigateToProfile">{{ comment.user.username }}</p>
                <p>{{ formatDate(comment.created_at) }}</p>
              </div>
            </div>
          </div>
          <div class="last">
            <button type="button" @click="deleteComment">삭제</button> 
          </div>
        </div>
        <div class="under">
          <p>{{ comment.content }}</p>
        </div>  
      </div>
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
    ...mapGetters(['getUsername', 'profile']),
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
p {
  margin: 0;
}
.star {
    height:20px;
    width: 20px;
    margin: 5px;
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.image_area {
  display: flex;
  align-items: center;
  order: 1;
}
.image_area img{
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
  margin-left: 10px;
}

.last {
  order: 2; /* 오른쪽에 배치 */
}
.name {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.name p {
  margin-right: 10px; /* 원하는 간격으로 설정 */
}

</style>