<template>
  <div id="app">
    <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">
            <span class="icon is-medium has-text-light">
              <font-awesome-icon :icon="['fas', 'sticky-note']" />
            </span>
            Notes
          </router-link>
        </div>
      </div>
    </nav>

    <div>
      <router-view />
    </div>
  </div>
</template>

<style>
@import "./css/bulma.css";
</style>
