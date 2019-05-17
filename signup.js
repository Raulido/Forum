$(document).ready(function(){
    var firebaseConfig = {
        apiKey: "AIzaSyCgx8tkfVLkwwHuHLdfPkuuYohRx4h6tJI",
        authDomain: "rebirth-1270f.firebaseapp.com",
        databaseURL: "https://rebirth-1270f.firebaseio.com",
        projectId: "rebirth-1270f",
        storageBucket: "rebirth-1270f.appspot.com",
        messagingSenderId: "583638951648",
        appId: "1:583638951648:web:5d375d04b118279e"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
});


$(".left form").on("submit", function(event){
    event.preventDefault();
    var email = $(".left .email").val();
    var password = $(".left .password").val();
    console.log(email);
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(user) {
        console.log(user);
        location.href="main.html"

    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    });
});
