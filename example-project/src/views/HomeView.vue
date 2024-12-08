<template>
    <div>
        <div class="container">
            <div class="row row-cols-2 row-cols-md-3 g-1">
                <div v-for="p in posts"
                     class="col">
                    <div class="card border-dark h-100">
                        <div class="card-header">Article:</div>
                        <div class="card-body text-dark">
                            <img width="200"
                                 :src="$api + p.picture"
                                 class="card-img-top"
                                 alt="Post image">

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

            <div class="d-flex flex-column align-items-center py-4">
                <div v-if="loading"
                     class="spinner-border text-light"
                     role="status">
                </div>

                <button v-if="hasMore"
                        @click="updateOffset"
                        :disabled="loading"
                        class="btn btn-primary mt-4 mx-auto">
                    Load more
                </button>
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
            posts: [],
            offset: 0,
            limit: 6,
            loading: false,
            hasMore: true,
        }
    },

    mounted() {
        this.getPosts();
        // window.addEventListener('scroll', this.scrollEventHandler)
    },

    methods: {
        updateOffset() {
            this.offset += this.limit;
            this.getPosts();
        },

        getPosts() {
            this.loading = true;
            axios.get(`${this.$api}/post?offset=${this.offset}&limit=${this.limit}`).then((res) => {
                console.log(res);
                this.posts = this.posts.concat(res.data.posts);
                this.hasMore = res.data.totalSize > this.offset + this.limit;
            }).catch((e) => {
                console.error(e);
            }).finally(() => {
                this.loading = false;
            })
        },

        scrollEventHandler(e) {
            console.log(e);
            const tracker = e.target;
            const limit = tracker.scrollHeight - tracker.clientHeight;
            if (e.target.scrollTop === limit) {
                console.log('bottom')
            }
        }
    }

}
</script>
