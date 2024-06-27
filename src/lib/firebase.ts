import admin from 'firebase-admin'
import firebaseConfig  from './firebaseConfig'

try {
  admin.initializeApp({
    credential: admin.credential.cert(
        firebaseConfig as admin.ServiceAccount
    ),
  })
  console.log('Initialized.')
} catch (error: any) {
  /*
   * We skip the "already exists" message which is
   * not an actual error when we're hot-reloading.
   */
  if (!(/already exists/.test(error.message))) {
    console.error('Firebase admin initialization error', error.stack)
  }
}

export default admin