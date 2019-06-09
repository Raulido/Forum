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
  var db = firebase.firestore();
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      document.getElementById("emailField").innerText = user.email;
      var docRef = db.collection("users").doc(user.uid);
      
      docRef.get().then(function(doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        var d = new Date();
        var dateString = d.toString();
        var splitDate = dateString.split(" ");
        dateString = splitDate[1] + " " + splitDate[2] + ", " + splitDate[3];
        document.getElementById("dateField").innerText = "Member Since: " + dateString;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }

    }).catch(function(error) {
    console.log("Error getting document:", error);
      });
    }
    else{

  }
});


function logout(){
  firebase.auth().signOut().then(function() {
      location.href="index.html";
    }).catch(function(error) {
      // An error happened.
    });
}

    function openForm() {
        document.getElementById("myForm").style.display = "block";
      }
      
      function closeForm() {
        document.getElementById("myForm").style.display = "none";
      }