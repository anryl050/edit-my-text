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


// TODO: Add logic to a method that accepts some content and adds it to the database

// Export a function we will use to POST to the database.
export const putDb = async (content) => {
  console.log('PUT to the db');

  const jateDb = await openDB('jate', 1);
  const text = jateDb.transaction('jate', 'readwrite');
  const store = text.objectStore('jate');
  const request = store.put({ id: 1, jate: content });
  // Get confirmation of the request.
  const result = await request;
  console.log('data saved to the database', result);

};


// TODO: Add logic for a method that gets all the content from the database
// Export a function we will use to GET to the database.
export const getDb = async () => {
  console.log('GET from db');

  const jateDb = await openDB('jate', 1);
  const text = jateDb.transaction('jate', 'readonly');
  const store = text.objectStore('jate');
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result.value;
  
};

initdb();
