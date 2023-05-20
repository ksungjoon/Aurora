<template>
  <div class="Main">
    <div class="container">
      <h3 id="genre">장르 선택</h3>
      <select v-model="genreid">
        <option value="0">전체</option>
        <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
      </select>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        <MovieList
          v-for="movie in filteredMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>

<script>
import MovieList from '@/components/MovieList.vue'

export default {
  name: 'MovieView',
  components: {
    MovieList
  },
  data() {
    return {
      genreid: '0' // 문자열로 변경하여 일치성을 검사합니다.
    };
  },
  created() {
    this.$store.dispatch('loadTotalMovies');
    this.$store.dispatch('loadTotalGenres');
  },
  computed: {
    limitedMovies() {
      const limit = 15;
      return this.$store.state.movieStore.totalMovies.slice(0, limit);
    },
    genres() {
      return this.$store.state.movieStore.genres;
    },
    filteredMovies() {
      if (this.genreid === '0') { // 값 비교를 문자열로 변경합니다.
        return this.limitedMovies;
      } else {
        return this.limitedMovies.filter(movie => movie.genres.some(genre => genre.id === this.genreid));
      }
    }
  },
}
</script>
