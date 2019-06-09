var firebaseConfig = {
    apiKey: "AIzaSyCgx8tkfVLkwwHuHLdfPkuuYohRx4h6tJI",
    authDomain: "rebirth-1270f.firebaseapp.com",
    databaseURL: "https://rebirth-1270f.firebaseio.com",
    projectId: "rebirth-1270f",
    storageBucket: "rebirth-1270f.appspot.com",
    messagingSenderId: "583638951648",
    appId: "1:583638951648:web:5d375d04b118279e"
};

  firebase.initializeApp(firebaseConfig);

    $( document ).ready(function() {
        console.log( "testing.." );
        var user = firebase.auth().currentUser;
        console.log(user);
    });

    function openForm() {
        document.getElementById("myForm").style.display = "block";
      }
      
      function closeForm() {
        document.getElementById("myForm").style.display = "none";
      }