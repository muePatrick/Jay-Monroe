<template>
  <div id="app">
    <nav
      class="navbar is-primary notion-navbar"
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
              <font-awesome-icon :icon="['fas', 'cogs']" />
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

<style lang="scss">
@import "./sass/bulma.scss";
</style>
