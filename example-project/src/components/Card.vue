<template>
    <div class="card">
        <img src="../assets/logo.svg" class="card-img-top" alt="Vue Logo">
        <div class="card-body">
            <h5 class="card-title">{{ card.title }}</h5>
            <p v-if="show" class="card-text">{{ card.text }}</p>
            <button 
                @click="toggleText" 
                class="btn btn-secondary">
                {{ show ? 'Hide' : 'Show'}}
            </button>
            <div>
                <button v-if="canLeft" >Left</button>
                <button >Right</button>
            </div>
            <button @click="remove" class="btn btn-danger">Delete</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Card',
        emits: ['remove-card'],
        props: {
            card: {
                type: Object,
                required: true,
                // default: () => ({})
            },
            index: {
                type: Number,
                required: true
            },
            canLeft: {
                type: Boolean,
                required: true
            }
        },
        data () {
            return {
                count: 0,
                show: true,
            }
        },

        methods: {
            remove() {
                console.log('del!');
                this.$emit('remove-card', this.index);
            },

            toggleText() {
                this.show = !this.show;
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