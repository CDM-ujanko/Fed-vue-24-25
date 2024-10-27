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

</template>


<script>
  import HelloWorld from './components/HelloWorld.vue'
  import Counter from './components/Counter.vue';
  import Card from './components/Card.vue';

  export default {
    components: {
      HelloWorld,
      Counter,
      Card
    },

    data() {
      return {
        message: 'Hello world!',
        counters: 5,
        items: ['pera', 'zika', 'laza', 2, {title: 'blas'}],
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

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
