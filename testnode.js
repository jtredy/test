// index.js

// 1) Import firebase-admin
const admin = require('firebase-admin');

// 2) Import or reference your service account JSON
//    Since we copied the JSON to the same directory, we can do:
const serviceAccount = require('./serviceAccountKey.json');

// 3) Initialize the Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // For Firestore, databaseURL is technically optional, 
  // but if you're using Realtime Database, you must specify:
  // databaseURL: "https://<YOUR-PROJECT-ID>.firebaseio.com"
});

// 4) Get a reference to Firestore
const db = admin.firestore();

// 5) Write some data to a "test" collection
db.collection('test').doc('sampleDoc').set({
  message: 'Hello from EC2!',
  createdAt: admin.firestore.FieldValue.serverTimestamp()
})
.then(() => {
  console.log('Document successfully written!');
})
.catch((error) => {
  console.error('Error writing document:', error);
});

// 6) Read the document back
db.collection('test').doc('sampleDoc').get()
  .then((doc) => {
    if (doc.exists) {
      console.log('Document data:', doc.data());
    } else {
      console.log('No such document!');
    }
  })
  .catch((error) => {
    console.error('Error reading document:', error);
  });
