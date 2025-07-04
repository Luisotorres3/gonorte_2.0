import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

// Inicializa Firebase Admin
initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();

async function addRegistrationDateToUsers() {
  const usersRef = db.collection('users');
  const snapshot = await usersRef.get();
  let updated = 0;
  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    if (!data.registrationDate) {
      await docSnap.ref.update({ registrationDate: Timestamp.now() });
      updated++;
      console.log(`Updated user ${docSnap.id}`);
    }
  }
  console.log(`Done. Updated ${updated} users.`);
}

addRegistrationDateToUsers().catch(console.error); 