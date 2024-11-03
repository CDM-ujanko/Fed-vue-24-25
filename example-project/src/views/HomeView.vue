<template>

    <header>

        <div class="wrapper">
            <HelloWorld msg="You did it!" />
        </div>

        <div class="container">
            <div class="row">
                <Card v-for="(c, i) in cards"
                      class="col-4 g-1"
                      :card="c"
                      :index="i"
                      :can-left="i > 0"
                      :can-right="i < cards.length - 1"
                      @remove-card="removeCard">
                </Card>
            </div>
        </div>

        <!-- <div v-for="(stvar, blabla) in items">{{ blabla }} {{ stvar }}</div> -->
    </header>

    <div>
        <h2>This is the Home page!</h2>
    </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld.vue'
import Counter from '../components/Counter.vue';
import Card from '../components/Card.vue';

export default {
    name: 'HomeView',

    components: {
        HelloWorld,
        Counter,
        Card
    },

    data() {
        return {
            message: 'Hello world!',
            counters: 5,
            items: ['pera', 'zika', 'laza', 2, { title: 'blas' }],
            cards: [
                {
                    title: 'Card title 1',
                    text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
                },
                {
                    title: 'Card title 2',
                    text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
                },
                {
                    title: 'Card title 3',
                    text: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.'
                },
                {
                    title: 'Card title 4',
                    text: 'Som equick example text to build on the card title and make up the bulk of the card\'s content.'
                }
            ]
        }
    },

    methods: {
        removeCard(payload) {
            let card = this.cards.splice(payload, 1)[0];
            console.log('card', payload, card);
        }
    }

}
</script>
