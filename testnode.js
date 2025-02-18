const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

console.log('Project ID from JSON:', serviceAccount.project_id);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function runTest() {
  try {
    // Write
    await db.collection('testCollection').doc('exampleDoc').set({
      message: 'Hello from a clean setup!',
      timestamp: admin.firestore.FieldValue.serverTimestamp()
    });
    console.log('Write success!');

    // Read
    const doc = await db.collection('testCollection').doc('exampleDoc').get();
    if (doc.exists) {
      console.log('Doc data:', doc.data());
    } else {
      console.log('No such document!');
    }
  } catch (err) {
    console.error('Error:', err);
  }
}

runTest();
