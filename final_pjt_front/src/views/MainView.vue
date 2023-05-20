<template>
  <div class="Main">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        <MovieList 
          v-for="movie in limitedMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import MovieList from '@/components/MovieList.vue'

export default {
  name: 'MovieView',
  components: {
    MovieList
  },
  created() {
    this.$store.dispatch('loadTotalMovies');
  },
  computed: {
    limitedMovies() {
      const limit = 15; // 제한할 영화 개수를 설정합니다.
      return this.$store.state.movieStore.totalMovies.slice(0, limit);
    }
  }
}
</script>
