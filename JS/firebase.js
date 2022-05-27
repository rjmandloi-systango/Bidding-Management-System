  import firebaseCredentials from '../env.json' assert { type: "json" };
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";

  const firebaseConfig = {
    apiKey: firebaseCredentials.apiKey,    
    authDomain:firebaseCredentials.authDomain,
    databaseURL: firebaseCredentials.databaseURL,
    projectId: firebaseCredentials.projectId ,
    storageBucket: firebaseCredentials.storageBucket,
    messagingSenderId: firebaseCredentials.messagingSenderId,
    appId: firebaseCredentials.appId
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  import { getDatabase,set,ref,get,child, update, remove ,orderByChild ,query ,onValue ,limitToFirst  } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";
  import { getStorage, ref as sRef, uploadBytesResumable, getDownloadURL }
    from "https://www.gstatic.com/firebasejs/9.6.10/firebase-storage.js";

  const db=getDatabase();
  const databaseRef = ref(db);
  const storage = getStorage();

  export {limitToFirst, db,set,ref,get,child, update, remove , app,storage ,databaseRef,sRef, uploadBytesResumable, getDownloadURL , orderByChild ,query,onValue};
  //for img upload
