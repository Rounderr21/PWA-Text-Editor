import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Logic to add content to the database
export const putDb = async (content) => {
   // Create a connection to the database database and version we want to use.
  const db = await openDB('jate', 1);
    // Create a new transaction and specify the database and data privileges.
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
    // Use the .add() method on the store and pass in the content.
  const request = store.put({id: 1, value: content});
   // Get confirmation of the request.
  const result = await request;
  console.log('Content added to the database:', result);
};

// Logic to get all content from the database
export const getDb = async () => {
    // Create a connection to the database database and version we want to use.
  const db = await openDB('jate', 1);
    // Create a new transaction and specify the database and data privileges.
  const tx = db.transaction('jate', 'readonly');
  // Open up the desired object store.
  const store = tx.objectStore('jate');
   // Use the .getAll() method to get all data in the database.
  const request = store.get(1);
    // Get confirmation of the request.
  const result = await request;
  console.log('All content from the database:', result);
  return result?.value;
};

initdb(); // Initialize the database when the module is imported