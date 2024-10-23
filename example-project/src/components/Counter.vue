<template>
    <div class="counter">
        <p>My internal count is {{ count }}</p>
        <button @click="count++">Add one</button>
        <button @click="count--">Reduce one</button>
    </div>
</template>

<script>
    export default {
        name: 'Counter',
        data () {
            return {
                count: 0
            }
        }
    }
</script>


<style>
    .counter {
        border: 1px solid orchid;
        border-radius: 30px;
        padding: 30px;
        margin: 30px;
    }
</style>