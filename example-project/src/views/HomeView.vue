<template>
    <div>
        <div class="container">
            <div class="row row-cols-2 row-cols-md-3 g-1">
                <div v-for="p in posts"
                    class="col">
                    <div class="card border-dark h-100">
                        <div class="card-header">Article:</div>
                        <div class="card-body text-dark">
                            <img width="200" :src="$api + p.picture" class="card-img-top" alt="Post image">

                            <h5 class="card-title">
                                <RouterLink :to="`/post/${p.id}`">{{
                                    p.title
                                }}</RouterLink>
                            </h5>
                            <p class="card-text">{{ p.text }}</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Posted: {{ p.datePosted }}</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

// import { getAll } from '@/data/posts.js';

export default {
    name: 'HomeView',

    components: {},

    data() {
        return {
            posts: []
        }
    },

    mounted() {

        console.log(this.$api);

        axios.get(`${this.$api}/post`).then((res) => {
            console.log(res);
            this.posts = res.data;
        }).catch((e) => {
            console.error(e);
        })
    }

}
</script>
