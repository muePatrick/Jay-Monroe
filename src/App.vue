<template>
  <div id="app">
    <nav
      class="navbar is-dark notion-navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">
            <span class="icon is-medium has-text-light">
              <font-awesome-icon :icon="['fas', 'sticky-note']" />
            </span>
            Notes
          </router-link>
          <router-link to="/chat" class="navbar-item">
            <span class="icon is-medium has-text-light">
              <font-awesome-icon :icon="['fas', 'comments']" />
            </span>
            Chat
          </router-link>
          <router-link to="/settings" class="navbar-item">
            <span class="icon is-medium has-text-light">
              <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
            </span>
            Settings
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

<style scoped>
.notion-navbar {
  /* background-color: #454b4e; */
  background-color: #35808c;
}
</style>
