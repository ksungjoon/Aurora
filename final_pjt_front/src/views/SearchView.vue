<template>
  <div>
    <h1>검색하신 "{{ keyword }}"에 대한 결과는 {{ search_length }}개입니다.</h1>
    <MovieList
          v-for="movie in searchedMovies"
          :key="movie.id"
          :movie="movie"
        />
  </div>
</template>

<script>
import MovieList from '@/components/MovieList.vue'
export default {
  name: 'SearchView',
  components: {
    MovieList
  },
  computed: {
    keyword() {
      return this.$route.params.keyword;
    },
    searchedMovies() {
      const movies = this.$store.state.movieStore.totalMovies
      const filteredMovies = movies.filter(movie => movie.title.includes(this.keyword))
      return filteredMovies
    },
    search_length() {
      return this.searchedMovies.length;
    }
  }
};
</script>
