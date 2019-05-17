var firebaseConfig = {
    apiKey: "AIzaSyCgx8tkfVLkwwHuHLdfPkuuYohRx4h6tJI",
    authDomain: "rebirth-1270f.firebaseapp.com",
    databaseURL: "https://rebirth-1270f.firebaseio.com",
    projectId: "rebirth-1270f",
    storageBucket: "rebirth-1270f.appspot.com",
    messagingSenderId: "583638951648",
    appId: "1:583638951648:web:5d375d04b118279e"
};
firebase = firebase.initializeApp(firebaseConfig);
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
    } else {
      // No user is signed in.
      location.href="index.html";
    }
});
$(".left form").on("submit", function(event){
    event.preventDefault();
    firebase.auth().signOut().then(function() {
        // Sign-out successful.
        location.href="main.html";
    }).catch(function(error) {
        // An error happened.
        console.log(error);
    });
});