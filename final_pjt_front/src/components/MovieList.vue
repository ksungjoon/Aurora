<template>
<div>
    <div class= 'col'>
        <router-link :to="{ name: 'MovieDetail', params: { id: movie.id } }" >
            <div class="card">
                <img :src="movie.poster_path" alt="" class="card-img-top">
                <div class="card-body">
                    <h5 class="card-title">{{ movie.title }}</h5>
                </div>
            </div>
        </router-link>
    </div>
</div>
</template>

<script>
export default {
    props:{
        movie:{
            type: Object
        }
    }


}
</script>
