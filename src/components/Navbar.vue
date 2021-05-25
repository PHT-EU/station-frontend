<template>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://ui.pht.medic.uni-tuebingen.de/" target="_blank">
        <img src="@/assets/logo.png" width="28" height="28">
        <p id="brand-text">PHT</p>
      </a>

      <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" class="navbar-menu">
      <div class="navbar-start">
        <router-link to="/trains" class="navbar-item">
          Trains
        </router-link>
        <router-link to="/data" class="navbar-item">
          Data
        </router-link>
        <router-link to="/about" class="navbar-item">
          About
        </router-link>

      </div>

      <div class="navbar-end">
        <div class="navbar-item">
          <div class="buttons">
            <a class="button is-primary is-outlined">
              <i class="fas fa-tools"></i>
            </a>
            <a class="button is-primary">
              <strong>Log in</strong>
            </a>

          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: "Navbar"
}
</script>

<style scoped>
  #brand-text {
    margin: 0 5px;
    font-size: large;
  }
</style>
