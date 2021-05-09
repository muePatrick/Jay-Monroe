/* eslint-disable @typescript-eslint/no-explicit-any */
import PouchDB from 'pouchdb-browser'

export default new (class {
  #localDB: any;

  constructor() {
    this.#localDB = undefined
  }

  connect() {
    this.#localDB = new PouchDB('notes_local');
  }

  async addTest() {
    const note = {
      title: "PouchDB Note",
      content: "#Header",
      subnotes: [],
      parent: null
    };

    return await this.#localDB.post(note, function callback(err: any, result: any) {
      if (err) {
        console.log(err);
      } else {
        console.log(result)
      }
    });
  }

  async read() {
    const docs = await this.#localDB.allDocs({ "include_docs": true, descending: true }, function (err: any) {
      if (err) {
        console.log(err);
      }
    })
    const rows = docs.rows.map((e: any) => e.doc)

    return rows
  }

  getValue() {
    return true
  }
})();
