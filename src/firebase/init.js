import firebase from '@firebase/app';
import '@firebase/firestore'

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDi6bENTwdT8HbordW-bRAtf02Ex6szrKA",
    authDomain: "vue-shopping-list-c63d7.firebaseapp.com",
    databaseURL: "https://vue-shopping-list-c63d7.firebaseio.com",
    projectId: "vue-shopping-list-c63d7",
    storageBucket: "vue-shopping-list-c63d7.appspot.com",
    messagingSenderId: "845583855707",
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  
  // Export database
  export default firebaseApp.firestore()
