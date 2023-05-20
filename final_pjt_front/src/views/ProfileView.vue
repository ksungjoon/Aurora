<template>
  <div>
    <h1>{{ getUsername }}의 프로필</h1>
    <ProfileItem />
  </div>
</template>

<script>
import ProfileItem from '@/components/ProfileItem.vue'
import { mapGetters } from 'vuex';
export default {
  name: 'ProfileView',
  components: {
    ProfileItem,
  },
  computed: {
    ...mapGetters(['getUsername']),
  },
};
</script>

<style>
</style>
