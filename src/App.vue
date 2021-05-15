<template>
  <div id="app">
    <div class="pageloader" :class="{ 'is-active': !loadingDone }">
      <span class="title">Connecting To Database</span>
    </div>

    <nav
      class="navbar is-primary notion-navbar"
      role="navigation"
      aria-label="main navigation"
    >
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link
            to="/"
            class="navbar-item"
            :class="{ 'is-active': currentRoute == '/' }"
          >
            <span class="icon is-medium has-text-light">
              <font-awesome-icon :icon="['fas', 'sticky-note']" />
            </span>
            <span class="is-unselectable">Notes</span>
          </router-link>
          <router-link
            to="/chat"
            class="navbar-item"
            :class="{ 'is-active': currentRoute == '/chat' }"
          >
            <span class="icon is-medium has-text-light">
              <font-awesome-icon :icon="['fas', 'comments']" />
            </span>
            <span class="is-unselectable">Chat</span>
          </router-link>
          <router-link
            to="/settings"
            class="navbar-item"
            :class="{ 'is-active': currentRoute == '/settings' }"
          >
            <span class="icon is-medium has-text-light">
              <font-awesome-icon :icon="['fas', 'cogs']" />
            </span>
            <span class="is-unselectable">Settings</span>
          </router-link>
        </div>
      </div>
    </nav>

    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
import database from "@/data/pouchdb";

export default {
  data() {
    return {
      loadingDone: false
    };
  },
  computed: {
    currentRoute() {
      return this.$route.path;
    }
  },
  watch: {},
  created() {
    database.connect().then(() => {
      setTimeout(() => {
        this.loadingDone = true;
      }, 500);
    });
    return true;
  },
  methods: {}
};
</script>

<style lang="scss">
@import "./sass/bulma.scss";
</style>
