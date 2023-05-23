<template>
  <div class="Main">
    <div class="container">
      <h3 id="genre">장르 선택</h3>
      <select v-model="genreid" @change="resetPage">
        <option value="0">전체</option>
        <option v-for="genre in genres" :key="genre.id" :value="genre.id">{{ genre.name }}</option>
      </select>
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        <MovieList
          v-for="movie in displayedMovies"
          :key="movie.id"
          :movie="movie"
        />
      </div>
      <nav v-if="totalPages > 1">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click="goToPage(currentPage - 1)" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li class="page-item" v-for="pageNumber in visiblePages" :key="pageNumber" :class="{ active: currentPage === pageNumber }">
            <a class="page-link" href="#" @click="goToPage(pageNumber)">{{ pageNumber }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click="goToPage(currentPage + 1)" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
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
      genreid: '0',
      moviesPerPage: 15,
      currentPage: 1
    };
  },
  created() {
    this.$store.dispatch('loadTotalMovies');
    this.$store.dispatch('loadTotalGenres');
  },
  computed: {
    genres() {
      return this.$store.state.movieStore.genres;
    },
    filteredMovies() {
      if (this.genreid === '0') {
        return this.$store.state.movieStore.totalMovies;
      } else {
        return this.$store.state.movieStore.totalMovies.filter(movie => movie.genres.some(genre => genre.id === this.genreid));
      }
    },
    totalPages() {
      return Math.ceil(this.filteredMovies.length / this.moviesPerPage);
    },
    visiblePages() {
      const maxVisiblePages = 5;
      let startPage = this.currentPage - Math.floor(maxVisiblePages / 2);
      if (startPage < 1) startPage = 1;
      let endPage = startPage + maxVisiblePages - 1;
      if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = Math.max(endPage - maxVisiblePages + 1, 1);
      }
      return Array.from({ length: endPage - startPage + 1 }, (_, index) => startPage + index);
    },
    displayedMovies() {
      const startIndex = (this.currentPage - 1) * this.moviesPerPage;
      const endIndex = startIndex + this.moviesPerPage;
      return this.filteredMovies.slice(startIndex, endIndex);
    }
  },
  methods: {
    goToPage(pageNumber) {
      if (pageNumber >= 1 && pageNumber <= this.totalPages) {
        this.currentPage = pageNumber;
      }
    },
    resetPage() {
      this.currentPage = 1;
    }
  }
}
</script>