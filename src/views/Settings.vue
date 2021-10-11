<template>
  <div class="viewRoot">
    <div class="box settingsBox">
      <div class="field">
        <label class="label">View Settings</label>
        <input
          id="settingsShowUser"
          type="checkbox"
          name="settingsShowUser"
          class="switch is-rounded"
          :checked="settingsShowUser"
          @change="changeSettingsShowUser($event)"
        />
        <label for="settingsShowUser">Show User in Treeview</label>
      </div>
      <div class="field">
        <input
          id="settingsShowChat"
          type="checkbox"
          name="settingsShowChat"
          class="switch is-rounded"
          :checked="settingsShowChat"
          @change="changeSettingsShowChat($event)"
        />
        <label for="settingsShowChat">Show Chat in Treeview</label>
      </div>
      <div class="field">
        <input
          id="settingsNotesMenuDocked"
          type="checkbox"
          name="settingsNotesMenuDocked"
          class="switch is-rounded"
          :checked="settingsNotesMenuDocked"
          @change="changeSettingsNotesMenuDocked($event)"
        />
        <label for="settingsNotesMenuDocked">Dock Notes Menu</label>
      </div>
      <div class="field">
        <input
          id="settingsWysiwyg"
          type="checkbox"
          name="settingsWysiwyg"
          class="switch is-rounded"
          :checked="settingsWysiwyg"
          @change="changeSettingsWysiwyg($event)"
        />
        <label for="settingsWysiwyg">Start Editor in Wysiwyg Mode</label>
      </div>
    </div>

    <div class="box settingsBox">
      <label class="label">Database Settings</label>
      <div class="field has-addons">
        <p class="control">
          <button class="button" @click="downloadFile">
            <span class="icon is-small">
              <font-awesome-icon :icon="['fas', 'file-download']" />
            </span>
            <span>Download Database Dump</span>
          </button>
        </p>
        <p class="control">
          <button class="button" @click="uploadFile">
            <span class="icon is-small">
              <font-awesome-icon :icon="['fas', 'file-upload']" />
            </span>
            <span>Upload Database Backup</span>
          </button>
        </p>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-primary" @click="reinitDatabase(false)">
            Recreate Index and Compress Database
          </button>
        </div>
      </div>
      <div class="field">
        <div class="control">
          <button class="button is-danger" @click="reinitDatabase(true)">
            Delete and Reinit Database
          </button>
        </div>
      </div>
    </div>

    <div class="box settingsBox">
      <label class="label">Database Debugging</label>
      <p>(Open Console To View Results)</p>
      <br />
      <div class="field">
        <label class="label">Doc Id</label>
        <input class="input" type="text" placeholder="_id" v-model="id" />
        <label class="label">Doc Rev (optional)</label>
        <input class="input" type="text" placeholder="_rev" v-model="rev" />
      </div>
      <div class="field is-grouped">
        <div class="control">
          <button class="button is-primary" @click="retrieveData">
            Retrieve Id
          </button>
        </div>
        <div class="control">
          <button class="button is-primary">
            Placeholder
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import database from "@/data/pouchdb";
import store from "@/store/index.ts";

export default {
  components: {},
  data() {
    return {
      foo: "bar",
      id: undefined,
      rev: undefined
    };
  },
  computed: {
    settingsShowUser() {
      return store.state.settingsShowUser;
    },
    settingsShowChat() {
      return store.state.settingsShowChat;
    },
    settingsNotesMenuDocked() {
      return store.state.settingsNotesMenuDocked;
    },
    settingsWysiwyg() {
      return store.state.settingsWysiwyg == "wysiwyg";
    }
  },
  watch: {},
  created() {
    return true;
  },
  methods: {
    changeSettingsShowUser(event) {
      store.commit("settingsShowUser", event.srcElement.checked);
    },
    changeSettingsShowChat(event) {
      store.commit("settingsShowChat", event.srcElement.checked);
    },
    changeSettingsNotesMenuDocked(event) {
      store.commit("settingsNotesMenuDocked", event.srcElement.checked);
    },
    changeSettingsWysiwyg(event) {
      store.commit(
        "settingsWysiwyg",
        event.srcElement.checked ? "wysiwyg" : "markdown"
      );
    },
    async reinitDatabase(destroy) {
      database.reinitDatabase(destroy);
      if (destroy) window.alert("Database deleted");
    },
    retrieveData() {
      database.getNoteByIdAndRev(this.id, this.rev);
    },
    downloadFile() {
      database.downloadFile();
    },
    uploadFile() {
      database.uploadFile();
    }
  }
};
</script>

<style lang="css" scoped>
.viewRoot {
  margin: 0;
  padding: 0;
  border: 0;
}

.settingsBox {
  margin: 5rem;
}
</style>
