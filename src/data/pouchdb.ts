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

    const doCompact = this.#localDB.compact()

    const doCreateIndex = this.#localDB.createIndex({
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

    return Promise.all([doCompact, doCreateIndex])
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

  //XXX Used just for debugging
  getNoteByIdAndRev(id: any, rev: any) {
    let options:any = {"revs": true, "revs_info": true, "conflicts": true}
    if (rev != undefined) {
      options = {...options, "rev": rev}
    }
    this.#localDB.get(id, options).then((res: any) => {
      console.log(res)
    })
  }
  async getAllNotes() {
    const all = await this.#localDB.allDocs({"include_docs": true, "conflicts": true})
    console.log(all)
    return all
  }

  setNote(note: any) {
    delete note._rev

    return this.#localDB.get(note._id)
    .then((doc: any) => {
      this.#localDB.put({
        ...doc, ...note
      }).then((response: any) => {
        console.log(response)
      }).catch(function (err: any) {
        console.log(err);
      });
    })
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

  async moveNote(srcId: any, targetId: any) {
    // console.log(srcId)
    // console.log(targetId)

    const srcNote = await this.#localDB.get(srcId)
    const oldParent = await this.#localDB.get(srcNote.parent)
    const targetNote = await this.#localDB.get(targetId)
    const newParent = await this.#localDB.get(targetNote.parent)

    let localMovement = false
    if (oldParent._id == newParent._id) {
      localMovement = true
    }

    if (localMovement) {
      newParent.subnotes.splice(newParent.subnotes.indexOf(srcId), 1)
    } else {
      // Remove Moved Note from Subnotes Array of old Parent Note
      oldParent.subnotes.splice(oldParent.subnotes.indexOf(srcId), 1)
    }

    // Add Moved Note to Subnotes Array of new Parent Note
    newParent.subnotes.splice(newParent.subnotes.indexOf(targetId), 0, srcId)

    // Correct the parent element of the moved Note
    srcNote.parent = newParent._id

    // console.log(`srcId: ${srcId}, oldParentId: ${oldParent._id}, newParentId: ${newParent._id}`)
    // console.log(srcNote)
    // console.log(oldParent)
    // console.log(newParent)

    const saveSrcNote = this.#localDB.put({...srcNote})

    let saveOldParentNote;
    if (!localMovement) {
      saveOldParentNote = this.#localDB.put({...oldParent})
    } else {
      saveOldParentNote = Promise.resolve();
    }

    const saveNewParentNote = this.#localDB.put({...newParent})

    return Promise.all([saveSrcNote, saveOldParentNote, saveNewParentNote])
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

  async reinitDatabase(destroy: boolean) {
    this.connect().then(() => {
      if (destroy) {
        this.#localDB.destroy().then(() => {
          this.connect()
        })
      } else {
        this.#localDB.getIndexes().then((indexes: any) => {
            if (indexes.indexes[0].ddoc) {
              this.#localDB.deleteIndex(indexes.indexes[0]).then(() => {
                this.connect()
              })
            }
        })
      }
    })
  }

  async addTest() {
    this.#localDB.put({
      _id: "1111",
      title: "Connection 1",
      content: "",
      subnotes: ["aaaa", "bbbb"],
      parent: null
    }, () => {return true});

    this.#localDB.put({
      _id: "2222",
      title: "Connection 2",
      content: "",
      subnotes: [],
      parent: null
    }, () => {return true});

    this.#localDB.put({
      _id: "aaaa",
      title: "Subnote A",
      content: "",
      subnotes: [],
      parent: "1111"
    }, () => {return true});

    this.#localDB.put({
      _id: "bbbb",
      title: "Subnote A",
      content: "",
      subnotes: [],
      parent: "1111"
    }, () => {return true});
  }

})();
