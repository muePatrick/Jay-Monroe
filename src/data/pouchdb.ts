/* eslint-disable @typescript-eslint/no-unused-vars */
// HACK
/* eslint-disable @typescript-eslint/no-explicit-any */ 
import PouchDB from 'pouchdb-browser'
import PouchFind from 'pouchdb-find'
PouchDB.plugin(PouchFind)

export default new (class {
  // Disable linter for #localDB since it does not recognize the private var parameter
  // eslint-disable-next-line
  #localDB: any;

  constructor() {
    this.#localDB = undefined
  }

  // TODO move this to constructor
  connect() {
    this.#localDB = new PouchDB('notes_local');

    this.#localDB.compact()

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

  // getNotesByParent(root:any = null) {
  //   return this.#localDB.find({
  //     selector: {
  //       parent: root
  //     }
  //   })
  // }

  getRootIds() {
    return this.#localDB.find({
      fields: ['_id'],
      selector: {
        parent: null
      }
    })
  }

  getNoteById(id: any) {
    return this.#localDB.get(id)
  }

  setNote(note: any) {
    // FIXME remove force, add working revision system
    return this.#localDB.put({...note}, {force: true}).then((response: any) => {
      console.log(response)
    }).catch(function (err: any) {
      console.log(err);
    });
  }

  addNoteUnder(noteId: any) {
    // TODO allow noteId = null to add to root level
    return this.#localDB.post({
      title: 'New Note',
      content: '',
      parent: noteId,
      subnotes: []
    })
  }

  addRootNote() {
    return this.#localDB.post({
      title: 'New Root Note',
      content: '',
      parent: null,
      subnotes: []
    })
  }

  removeNotesAndSubnotes(note: any) {
    this.#localDB.remove(note).then((r: any) => {
      console.log(r)
    })

    return this.#localDB.get(note.parent).then((p: any) => {
      console.log(p.subnotes)
      const x = p.subnotes
      x.splice(p.subnotes.indexOf(note._id), 1)
      p.subnotes = x
      console.log(p.subnotes)
      this.#localDB.put({...p}, {force: true})
    })
  }

  async addTest() {
    this.#localDB.put({
      _id: "1111",
      title: "Connection 1",
      content: "# 1111",
      subnotes: ["aaaa", "bbbb"],
      parent: null
    }, () => {return true});

    this.#localDB.put({
      _id: "2222",
      title: "Connection 2",
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
