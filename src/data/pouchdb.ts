/* eslint-disable @typescript-eslint/no-unused-vars */
// HACK
/* eslint-disable @typescript-eslint/no-explicit-any */ 
import PouchDB from 'pouchdb-browser'
import PouchFind from 'pouchdb-find'
PouchDB.plugin(PouchFind)

export default new (class {
  #localDB: any;

  constructor() {
    this.#localDB = undefined
  }

  connect() {
    this.#localDB = new PouchDB('notes_local');
    this.#localDB.createIndex({
      index: {fields: ['parent']}
    }).then(function (result: any) {
      console.log(`Database index ${result.result}`)
    }).catch(function (err: any) {
      console.log(err);
    });

    this.#localDB.allDocs({
      "include_docs": true,
      "attachments": false
    }).then(function (result: any) {
      console.log(result)
    }).catch(function (err: any) {
      console.log(err);
    });
  }

  getNotesByParent(root:any = null) {
    return this.#localDB.find({
      selector: {
        parent: root
      }
    })
  }

  getRootIds() {
    this.#localDB.allDocs({
      "include_docs": false,
      "attachments": false
    }).then(function (result: any) {
      console.log(result.rows.map((i: any) => i.id))
    }).catch(function (err: any) {
      console.log(err);
    });
  }

  getNoteById(id: any) {
    return this.#localDB.get(id)
  }

  getNoteArrayByIds(noteIds: any) {
    return this.#localDB.allDocs({
      "include_docs": true,
      "attachments": false,
      "keys": [...noteIds]
    })
  }

  setNote(note: any) {
    console.log({...note})
    // FIXME remove force, add working revision system
    return this.#localDB.put({...note}, {force: true}).then((response: any) => {
      console.log(response)
    }).catch(function (err: any) {
      console.log(err);
    });


  }

  async addTest() {
    this.#localDB.put({
      _id: "1111",
      title: "1111",
      content: "# 1111",
      subnotes: ["aaaa", "bbbb"],
      parent: null
    }, () => {return true});

    this.#localDB.put({
      _id: "2222",
      title: "2222",
      content: "# 2222",
      subnotes: [],
      parent: null
    }, () => {return true});

    this.#localDB.put({
      _id: "aaaa",
      title: "aaaa",
      content: "# aaaa",
      subnotes: [],
      parent: "1111"
    }, () => {return true});

    this.#localDB.put({
      _id: "bbbb",
      title: "bbbb",
      content: "# bbbb",
      subnotes: [],
      parent: "1111"
    }, () => {return true});
  }

})();
