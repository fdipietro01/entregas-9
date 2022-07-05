import admin from "firebase-admin";

export class Contenedor {
  constructor(url, serviceAccount, collection) {
    this.asignadorDeId = 0;
    this.url = url;
    this.serviceAccount = serviceAccount;
    this.db;
    this.collection = collection;
    this.query;
  }

  async init() {
    try {
      if (admin.apps.length === 0) {
        await admin.initializeApp({
          credential: admin.credential.cert(this.serviceAccount),
          url: this.url,
        });
        console.log("Firestore connected");
      }
      this.db = await admin.firestore();
      this.query = await this.db.collection(this.collection);
    } catch (err) {
      console.log("Error on connect", err);
    }
  }

  async save(element) {
    try {
      this.asignadorDeId++;
      let doc = this.query.doc();
      await doc.create({
        ...element,
        id: this.asignadorDeId,
        timestamp: Date().toLocaleString(),
      });
      return element;
    } catch (err) {
      console.log(err, "error on save");
      this.asignadorDeId--;
      return;
    }
  }
  async read(id) {}

  async update(element, id) {}

  async delete(id) {}
}
