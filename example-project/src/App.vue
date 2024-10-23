<template>
  <header>

    {{ message  }}
    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>

    <Counter v-for="n in counters"></Counter>
  </header>
</template>


<script>
  import HelloWorld from './components/HelloWorld.vue'
  import Counter from './components/Counter.vue';

  export default {
    components: {
      HelloWorld,
      Counter
    },
    data() {
      return {
        message: 'Hello world!',
        counters: 5
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
