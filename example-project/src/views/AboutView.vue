<template>
    <div>
        <h2>This is the about page!</h2>
        <p>{{ message }}</p>
    </div>
</template>

<script>

export default {
    name: 'AboutView',
    data() {
        return {
            message: 'Hello from the about page!'
        }
    },

    mounted() {

        console.log(this.$store);
    }
}
</script>