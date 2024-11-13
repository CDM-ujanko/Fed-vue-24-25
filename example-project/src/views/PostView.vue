<template>
    <div>
        <img class="w-100" :src="'/src/assets/post-images/' + post.picture" alt="Post image">
        <h1>{{ post.title }}</h1>
        <p>Posted: {{ post.datePosted }}</p>
        <article>{{ post.text }}</article>
    </div>
</template>

<script>
import { getPost } from '@/data/posts.js';

export default {
    name: 'PostView',
    data() {
        return {
            post: {}
        }
    },

    mounted() {
        this.getPost();
    },

    methods: {
        getPost() {
            try {
                this.post = getPost(this.$route.params.id);
            } catch(err) {
                this.$router.push('/not-found');
            }  
        }
    }
}
</script>