<template>
    <div>
        <div>
            <h2>This is the Home page!</h2>
        </div>

        <div class="row row-cols-2 row-cols-md-3 g-1">
            <div v-for="p in posts"
                 class="col">
                <div class="card border-dark h-100">
                    <div class="card-header">Article:</div>
                    <div class="card-body text-dark">
                        <h5 class="card-title">
                            <RouterLink :to="`/post/${p.index}`">{{
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
</template>

<script>

import { getAll } from '../data/posts.js'
export default {
    name: 'HomeView',

    components: {},

    data() {
        return {
            posts: getAll()
        }
    },

    methods: {}

}
</script>
