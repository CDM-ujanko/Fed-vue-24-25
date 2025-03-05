<template>
    <div class="container-sm login">
        <form @submit.prevent="login">
            <div class="mb-3">
                <label for="username"
                       class="form-label">Username</label>
                <input type="text"
                       class="form-control"
                       id="username"
                       v-model="username">
            </div>
            <div class="mb-3">
                <label for="password"
                       class="form-label">Password</label>
                <input type="password"
                       class="form-control"
                       id="password"
                       v-model="password">
            </div>
            <div v-if="errorMessage"
                 class="alert alert-danger"
                 role="alert">
                {{ errorMessage }}
            </div>
            <button type="submit"
                    :disabled="isFormInvalid || loading"
                    class="btn btn-primary">Login
                <div v-if="loading"
                     class="spinner-border"
                     role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </button>
        </form>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'LoginView',
    data() {
        return {
            username: '',
            password: '',
            errorMessage: '',
            loading: false
        }
    },

    computed: {
        isFormInvalid() {
            return !this.username || !this.password
        }
    },

    methods: {
        login() {
            let data = {
                username: this.username,
                password: this.password
            }

            this.loading = true;
            this.errorMessage = '';


            axios.post(this.$api + '/login',
                data, {
                headers: {
                    // Overwrite Axios's automatically set Content-Type
                    'Content-Type': 'application/json'
                }
            })
                .then((res) => {
                    console.log(res);
                    this.$store.login(res.data);
                    this.$router.push('/admin');
                }).catch((e) => {
                    console.error(e)
                    this.errorMessage = 'Invalid username/password';
                }).finally(() => {
                    this.loading = false;
                })
        }
    }
}
</script>

<style scoped>
.login {
    max-width: 400px;
}
</style>