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

      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink to="/Admin"
                      class="nav-link">
            Admin
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>

  <RouterView class="container py-4" />
</template>


<script>

</script>

<style scoped></style>
