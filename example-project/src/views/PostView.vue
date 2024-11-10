<template>
    <div>
        <h1>{{ post.title }}</h1>
        <p>Posted: {{ postDate.toLocaleDateString() }}</p>
        <article>{{ post.text }}</article>
    </div>
</template>

<script>
import { getPost, POST_DATA } from '../data/posts.js';

export default {
    name: 'PostView',
    data() {
        return {
            post: POST_DATA[0],
            // postDate: new Date(POST_DATA[0].datePosted),
        }
    },

    mounted() {
        // let date = new Date(this.post.datePosted);
        // this.postDate = date.toLocaleDateString();
        // console.log(date.toLocaleDateString());
        console.log('mounted')
    },

    computed: {
        postDate() {
            if (this.post && this.post.datePosted) {
                return new Date(this.post.datePosted);
            }

            return new Date();
        }
    },

    methods: {
        getPost(id) {
            try {
                this.post = getPost(id)
            } catch (error) {
                this.$router.push('NotFound')
            }
        }
    }
}
</script>