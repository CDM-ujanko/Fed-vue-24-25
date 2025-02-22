<template>
    <div class="mt-3">
        <FilePicker v-model="post.picture"
                    class="mb-3" />

        <img v-if="post.picture"
             class="thumbnail mb-3"
             :src="$api + post.picture"
             alt="Post image">

        <div class="mb-3">
            <label for="title"
                   class="form-label">Title</label>
            <input type="text"
                   id="title"
                   class="form-control"
                   placeholder="Title"
                   v-model="post.title">
        </div>

        <div class="mb-3">
            <label for="datePosted"
                   class="form-label">Date posted</label>
            <input type="date"
                   id="datePosted"
                   class="form-control"
                   placeholder="Date Posted"
                   v-model="datePosted">
        </div>

        <div class="form-floating">
            <textarea class="form-control"
                      placeholder="Post text"
                      id="postDescription"
                      v-model="post.text"
                      style="height: 400px;"></textarea>
            <label for="postDescription">Text</label>
        </div>
        <div class="my-3">
            <div v-if="loading"
                 class="spinner-border text-light"
                 role="status">
            </div>
            <button v-else
                    :disabled="!isValid"
                    class="btn btn-primary"
                    @click="savePost">Save</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import FilePicker from './FilePicker.vue';

export default {
    name: 'AdminPostView',
    components: {
        FilePicker
    },

    data() {
        return {
            post: {},
            datePosted: null,
            loading: false
        }
    },

    mounted() {
        if (this.$route.params.id) {
            this.getPost();
        }
    },

    computed: {
        isValid() {
            //return this.picture && this.post.title && this.post.text && this.datePosted;

            if (!this.post.picture) {
                return false;
            }

            if (!this.post.title || !this.post.text) {
                return false;
            }

            if (!this.datePosted) {
                return false;
            }

            return true;
        },

        /**
         * Are we in edit mode.
         */
        isEditMode() {
            return !!this.$route.params.id;
        }
    },

    methods: {
        getPost() {
            axios.get(this.$api + '/post/' + this.$route.params.id)
                .then((res) => {
                    this.post = res.data;
                    this.datePosted = this.getTimeString(this.post.datePosted);
                }).catch((err) => {
                    console.error(err);
                    this.$router.push('/not-found');
                });
        },

        /**
         * Converts a date string from an unknown format into a yyyy-MM-dd format.
         * @param date {String} A date string.
         * @return {String} A date string in yyyy-MM-dd format.
         */
        getTimeString(date) {
            let d = new Date(date ?? '');

            let month = ('00' + (d.getMonth() + 1)).slice(-2);
            let day = ('00' + d.getDate()).slice(-2);

            return `${d.getFullYear()}-${month}-${day}`
        },

        savePost() {
            let data = JSON.parse(JSON.stringify(this.post));

            data.datePosted = new Date(this.datePosted).toISOString();
            this.loading = true;

            axios.post(this.$api + '/post' + (this.isEditMode ? `/${this.$route.params.id}` : ''),
                data, {
                headers: {
                    // Overwrite Axios's automatically set Content-Type
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    this.$router.push('/admin');
                }).catch((e) => {
                    console.error(e)
                }).finally(() => {
                    this.loading = false;
                })

        }
    }
}
</script>

<style scoped>
.thumbnail {
    max-height: 200px;
}
</style>