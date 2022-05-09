  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBtT7SoJwQwbMzzvBaQIoC37DoXAfhYt9o",
    authDomain: "bidding-management-syste-da0d1.firebaseapp.com",
    projectId: "bidding-management-syste-da0d1",
    storageBucket: "bidding-management-syste-da0d1.appspot.com",
    messagingSenderId: "464106697543",
    appId: "1:464106697543:web:0cc24fd654a3aaa4ce1262"
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
