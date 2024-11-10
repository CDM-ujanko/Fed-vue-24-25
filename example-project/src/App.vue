<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <div class="container-fluid">
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink to="/"
                      class="nav-link">
            Go to Home
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/about"
                      class="nav-link">
            Go to About
          </RouterLink>
        </li>

      </ul>
    </div>
  </nav>
  <nav>
  </nav>
  <RouterView class="container py-3" />
</template>


<script>

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
