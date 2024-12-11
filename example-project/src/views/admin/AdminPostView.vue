<template>
    <div class="mt-3">
        <img v-if="post.picture"
             class="w-100"
             :src="$api + post.picture"
             alt="Post image">

        <div class="mb-3">
            <label for="picture">Picture</label>
            <input type="file"
                   class="form-control"
                   id="picture"
                   @change="onPictureChange"
                   accept="image/png, image/jpeg">
        </div>

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
                    class="btn btn-primary"
                    @click="savePost">Save</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'AdminPostView',
    data() {
        return {
            post: {},
            picture: null,
            datePosted: null,
            loading: false
        }
    },

    mounted() {
        console.log('mounted admin post view');
        if (this.$route.params.id) {
            this.getPost();
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
            let month = ('00' + d.getMonth()).slice(-2);
            let day = ('00' + d.getDay()).slice(-2);

            return `${d.getFullYear()}-${month}-${day}`
        },

        onPictureChange(e) {
            let files = e.target.files || e.dataTransfer.files;

            if (!files.length) {
                return;
            }

            this.picture = files[0]
        },

        savePost() {
            let data = JSON.parse(JSON.stringify(this.post));
            data.picture = this.picture;
            this.loading = true;

            axios.post(this.$api + '/post/',
                data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            }).then((res) => {
                console.log(res);
            }).catch((e) => {
                console.error(e)
            }).finally(() => {
                this.loading = false;
            })

        }
    }
}
</script>