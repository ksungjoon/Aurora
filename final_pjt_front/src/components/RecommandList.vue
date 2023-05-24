<template>
    <div>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-5 g-4">
            <MovieList
            v-for="movie in filteredMovies"
            :key="movie.id"
            :movie="movie"
            />
        </div>
    </div>
</template>

// <script>
import MovieList from '@/components/MovieList.vue'

export default {
    // data(){
    //     return{
    //         movie:null
    //     }
    // },
    props:{
        recommand_genre:Number
    },
    components: {
        MovieList
    },
    created() {
        this.$store.dispatch('loadTotalMovies');
        this.$store.dispatch('loadTotalGenres');
    },
    computed: {
        limitedMovies() {
        const limit = 5;
        return this.$store.state.movieStore.totalMovies.slice(0, limit);
        },
        genres() {
        return this.$store.state.movieStore.genres;
        },
        filteredMovies() {
        if (this.recommand_genre === null) {
            return this.limitedMovies;
        } else {
            const moviesWithSameGenre = this.$store.state.movieStore.totalMovies.filter(movie =>
            movie.genres.some(genre => genre.id === this.recommand_genre)
            );

            // 인기도로 정렬된 영화 목록
            const sortedMovies = moviesWithSameGenre.sort((a, b) => b.vote_average - a.vote_average);

            // 상위 5개 영화 반환
            return sortedMovies.slice(0, 5);
        }
    }
  }
};
</script>
