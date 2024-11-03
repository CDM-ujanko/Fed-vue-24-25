<template>
    <div>
        <h2>This is the post page!</h2>
        {{ $route.params.id }}
    </div>
</template>

<script>
export default {
    name: 'PostView',
    data() {
        return {
        }
    },

    mounted() {
        console.log(this.$route.params)
    }
}
</script>