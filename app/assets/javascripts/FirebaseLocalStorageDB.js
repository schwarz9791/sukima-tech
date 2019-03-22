/**
 * Firebaseの認証情報を管理するデータベースクラス
 *
 * Usage:
 * import FirebaseLocalStorageDB from 'FirebaseLocalStorageDB'
 *
 * const db = await FirebaseLocalStorageDB.connect()
 * db.getAll()
 */

class FirebaseLocalStorageDB {
  static get DB_NAME() {
    return 'firebaseLocalStorageDb'
  }
  static get STORE_NAME() {
    return 'firebaseLocalStorage'
  }

  async connect() {
    return new Promise((resolve, reject) => {
      if (this.db) {
        resolve(this)
        return
      }
      const indexedDB =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB

      const openReq = indexedDB.open(FirebaseLocalStorageDB.DB_NAME, 1)

      openReq.onsuccess = event => {
        this.db = event.target.result
        resolve(this)
      }

      openReq.onblocked = event => {
        reject(new Error('Fail to connect indexedDB.'))
      }
    })
  }

  async get(itemId) {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(
        FirebaseLocalStorageDB.STORE_NAME,
        'readonly'
      )
      const store = tx.objectStore(FirebaseLocalStorageDB.STORE_NAME)
      const key = IDBKeyRange.only(itemId)
      store.openCursor(key).onsuccess = event => {
        const cursor = event.target.result
        if (cursor) {
          resolve(cursor.value)
        } else {
          resolve(null)
        }
      }
    })
  }

  async getAll() {
    return new Promise((resolve, reject) => {
      const tx = this.db.transaction(
        FirebaseLocalStorageDB.STORE_NAME,
        'readonly'
      )
      const store = tx.objectStore(FirebaseLocalStorageDB.STORE_NAME)

      store.getAll().onsuccess = event => {
        resolve(event.target.result)
      }
    })
  }
}

export default new FirebaseLocalStorageDB()
