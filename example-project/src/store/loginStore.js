import { defineStore } from 'pinia'

const LOGIN_STORAGE_KEY = 'post_store_jwt';

export const useLoginStore = defineStore('login', {
    state: () => {
        let token = null;
        try {
            token = JSON.parse(localStorage.getItem(LOGIN_STORAGE_KEY))
        } catch (e) {
            console.error(e);
        }
        console.log('Token', token);
        return {
            token: token,
        }
    },
    getters: {
        isLoggedIn: (state) => Boolean(state.token),
    },
    actions: {
        login(token) {
            this.token = token;
            localStorage.setItem(LOGIN_STORAGE_KEY, JSON.stringify(token));

        },
    },
})