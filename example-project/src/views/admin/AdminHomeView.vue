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
                    <th scope="col">ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Picture</th>
                    <th scope="col">Date Posted</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="post in posts">
                    <th>{{ post.id }}</th>
                    <td>{{ post.title }}</td>
                    <td><img :src="$api + post.picture"
                             :title="post.picture"
                             width="100px"></td>
                    <td>{{ post.datePosted }}</td>
                    <td>
                        <button class="btn btn-danger"
                                @click="deletePost(post.id)">Delete</button>
                        <RouterLink :to="`/admin/post/${post.id}`">Edit</RouterLink>
                    </td>
                </tr>
            </tbody>
        </table>

        <nav aria-label="...">
            <ul class="pagination pagination-sm">
                <li class="page-item active"
                    aria-current="page">
                    <span class="page-link">1</span>
                </li>
                <li class="page-item"><a class="page-link"
                       href="#">2</a></li>
                <li class="page-item"><a class="page-link"
                       href="#">3</a></li>
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
            offset: 0,
            limit: 25,
            loading: false,
            hasMore: true,
        }
    },

    mounted() {
        this.getPosts();

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

        deletePost(id) {
            if (!confirm('Are you sure you want to delete this post?')) {
                return;
            }

            this.loading = true;
            axios.get(`${this.$api}/post/${id}/delete`)
                .then((res) => {
                    this.$router.push('/admin');
                }).catch((e) => {
                    console.error(e);
                }).finally(() => {
                    this.loading = false;
                })
        }
    }

}
</script>
