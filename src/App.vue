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
      <div class="navbar-brand">
        <!-- <a class="navbar-item" href="https://bulma.io">
          <img
            src="https://bulma.io/images/bulma-logo.png"
            width="112"
            height="28"
          />
        </a> -->

        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          @click="navbarExtended = !navbarExtended"
          :class="{ 'is-active': navbarExtended }"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div
        id="navbarBasicExample"
        class="navbar-menu"
        :class="{ 'is-active': navbarExtended }"
      >
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
          <!-- <hr class="navbar-divider"> -->
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
      loadingDone: false,
      navbarExtended: false
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
