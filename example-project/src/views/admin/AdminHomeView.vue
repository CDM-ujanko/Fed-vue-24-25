<template>
    <div class="container">
        <div class="mt-3 d-flex justify-content-end">
            <RouterLink to="/admin/post"
                        type="button"
                        class="btn btn-outline-info">Create New</RouterLink>

        </div>
        <table class="table table-striped my-3">
            <thead>
                <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Picture</th>
                    <th scope="col">Date Posted</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in posts">
                    <td>{{ post.title }}</td>
                    <td class="text-break"><img :src="$api + post.picture"
                             :title="post.picture"
                             width="100px"></td>
                    <td>{{ humanizeDate(post.datePosted) }}</td>
                    <td>
                        <RouterLink :to="`/admin/post/${post.id}`"
                                    tag="button"
                                    class="btn btn-outline-primary btn-sm px-2 py-0 mb-2 me-2">Edit</RouterLink>
                        <button class="btn btn-outline-danger btn-sm px-2 py-0 mb-2 me-2"
                                @click="deletePost(post.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <nav aria-label="">
            <ul class="pagination pagination-sm">
                <li v-for="p in pages"
                    class="page-item"
                    :class="{ active: p === page + 1 }"
                    aria-current="page"
                    @click="goToPage(p - 1)">
                    <span class="page-link">{{ p }}</span>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
import axios from 'axios';
import { RouterLink } from 'vue-router';

export default {
    name: 'AdminHomeView',

    components: {},

    data() {
        return {
            posts: [],
            page: 0,
            pageSize: 5,
            pages: 0,
            loading: false
        }
    },

    mounted() {
        this.getPosts();
    },

    methods: {
        /**
         * Convert a date string to a human readable format.
         * @param {String} dateString the date string.
         * @returns {Sting} The human readable date.
         */
        humanizeDate(dateString) {
            let date = new Date(dateString);

            if (date === "Invalid Date" || isNaN(date)) {
                return '';
            }

            const options = {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            };

            return date.toLocaleDateString('en-EN', options);
        },

        goToPage(p) {
            this.page = p;
            this.getPosts();
        },

        /** 
         * Fetch a page of posts based on offset and limit.
         */
        getPosts() {
            this.loading = true;
            axios.get(`${this.$api}/post?page=${this.page}&pageSize=${this.pageSize}`)
                .then((res) => {
                    this.posts = res.data.posts;
                    this.pages = Math.ceil(res.data.totalSize / this.pageSize)
                }).catch((e) => {
                    console.error(e);
                }).finally(() => {
                    this.loading = false;
                })
        },

        deletePost(id) {
            if (!confirm('Are you sure you want to delete this post?')) {
                return;
            }

            this.loading = true;
            axios.get(`${this.$api}/post/${id}/delete`)
                .then((res) => {
                    this.$router.go()
                }).catch((e) => {
                    console.error(e);
                }).finally(() => {
                    this.loading = false;
                })
        }
    }

}
</script>
