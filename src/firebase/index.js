// ==========================================================================
// Firebase Config
// ==========================================================================
import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: ""
};

// firebase.initializeApp(config);
// export const googleProvider = new firebase.auth.GoogleAuthProvider();
// export const facebookProvider = new firebase.auth.FacebookAuthProvider()
// export const auth = firebase.auth();
// export default firebase;

const app = firebase.initializeApp(config);
const base = Rebase.createClass(app.database());
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

export { app, base, googleProvider, facebookProvider, githubProvider }