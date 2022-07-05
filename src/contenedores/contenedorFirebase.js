import admin from "firebase-admin";

export class Contenedor {
  constructor(url, serviceAccount, collection) {
    this.asignadorDeId = 0;
    this.url = url;
    this.serviceAccount = serviceAccount;
    this.db;
    this.collection = collection;
    this.query;
    this.admin = admin;
  }

  async init() {
    try {
      if (admin.apps.length === 0) {
          admin.initializeApp({
          credential: admin.credential.cert(this.serviceAccount),
          url: this.url,
        });
        console.log("Firestore connected");
      }
      this.db = admin.firestore()
      this.query = this.db.collection(this.collection);
    } catch (err) {
      console.log("Error on connect", err);
    }
  }

  async save(element) {
    try {
      this.asignadorDeId++;
      let doc = this.query.doc(`${this.asignadorDeId}`);
      const newElement = {
        ...element,
        id: this.asignadorDeId,
        timestamp: Date().toLocaleString(),
      };
      await doc.create(newElement);
      return newElement;
    } catch (err) {
      console.log(err, "error on save");
      this.asignadorDeId--;
      return;
    }
  }
  async read(id) {
    try {
      if (id) {
        const product = await this.query.doc(`${id}`).get();
        if (product.empty) return;
        return product.data();
      } else {
        const products = await this.query.get();
        return products.docs.map((doc) => doc.data());
      }
    } catch (err) {
      return;
    }
  }

  async update(element, id) {
    try {
      const product = this.query.doc(`${id}`);
      if (!product) return;
      await product.update({ ...element });
      const newProd = await this.query.doc(`${id}`).get();
      return newProd.data();
    } catch (err) {
      return;
    }
  }

  async delete(id) {
    try {
      const product = this.query.doc(`${id}`);
      const deleted = await this.query.doc(`${id}`).get()
      await product.delete();
      return deleted.data();
    } catch (err) {
      return;
    }
  }
}
