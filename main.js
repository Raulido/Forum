var firebaseConfig = {
    apiKey: "AIzaSyCgx8tkfVLkwwHuHLdfPkuuYohRx4h6tJI",
    authDomain: "rebirth-1270f.firebaseapp.com",
    databaseURL: "https://rebirth-1270f.firebaseio.com",
    projectId: "rebirth-1270f",
    storageBucket: "rebirth-1270f.appspot.com",
    messagingSenderId: "583638951648",
    appId: "1:583638951648:web:5d375d04b118279e"
};
var firebase = firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
        var usersRef = database.collection("users");
       var query = usersRef.where("uid", "==", user.uid);
       query.get().then(function(querySnapshot) { //Call get() to get a QuerySnapshot

        if (querySnapshot.empty) { //if user not found in database add to database
            var d = new Date();
            usersRef.doc(user.uid).set({
                email: user.email,
                uid: user.uid, 
                profilePicture: "defaultUser.jpg", 
                date: d, 
                location: "USA"
            });
            /*
            database.collection("users").add({
                email: user.email,
                uid: user.uid, 
                profilePicture: "defaultUser.jpg"
            })*/
        }else {
           /*
                querySnapshot.docs.map(function (documentSnapshot) {
                    //Not necessary to do that  -> return documentSnapshot.data();
                    console.log(documentSnapshot.data().name); 
                });*/
        }

});
       /*
        database.collection("users").add({
            email: user.email,
            uid: user.uid
        })*/
    
    } else {
      // No user is signed in.
      location.href="index.html";
    }
});

const list = firebase.database().ref().child("threads");
function reverse(){
  CurrentThread = "";
  $("#second").css("display", "none"); 
  $("#first").css("display", "block"); 
}
var CurrentThread = "";
function hello(x){
  console.log("yo");
  CurrentThread = x;
  $("#first").css("display", "none"); 
  $("#second").css("display", "block");
  var userId = firebase.auth().currentUser.uid;
  return firebase.database().ref('threads/' + x).once('value').then(function(snapshot) {
    var content = (snapshot.val() && snapshot.val().text);
    var title = (snapshot.val() && snapshot.val().title);
    var author = (snapshot.val() && snapshot.val().author);
    var element = document.getElementById("thread5");
    var p = document.createElement("p");
    var node = document.createTextNode("Topic");
    p.appendChild(node);
    element.appendChild(p);

    var p = document.createElement("p");
    var node = document.createTextNode(title + " by " + author +"\n" + ": " + content);
    p.appendChild(node);
    p.style = "background-color: white;color: black";
    element.appendChild(p);
    
    var p = document.createElement("p");
    var node = document.createTextNode("Comments");
    p.appendChild(node);
    element.appendChild(p);

    var query = firebase.database().ref('threads/' + x + '/comments/').orderByKey();
    query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          // key will be "ada" the first time and "alan" the second time
          var key = childSnapshot.key;
          // childData will be the actual contents of the child
          var childData = childSnapshot.val().comment;
          var childData2 = childSnapshot.val().user;
          var p = document.createElement("p");
          var node = document.createTextNode(childData2 + ": "+ childData);
          p.appendChild(node);
          p.style = "background-color: grey;color: black";
          element.appendChild(p);
      });
    });
  });
}
list.on("child_added",snap => {
    var title = snap.val().title;
    var author = snap.val().author;
    var Rcount = snap.val().Rcount;
    var tr = document.createElement("tr");
    tr.className = "forumModule";
    //var node = document.createTextNode("This is new.");
    //tr.appendChild(node);
    var element = document.getElementById("table");

    var td = document.createElement("td");
    var a = document.createElement("button");
    var node = document.createTextNode(title);
    a.onclick = function(){hello(snap.key)};
    a.appendChild(node);
    td.appendChild(a);
    tr.appendChild(td);

    var td = document.createElement("td");
    var a = document.createElement("a");
    var node = document.createTextNode(author);
    a.appendChild(node);
    td.appendChild(a);
    tr.appendChild(td);

    var td = document.createElement("td");
    td.className = "pullRight";
    var node = document.createTextNode(Rcount);
    td.appendChild(node);
    tr.appendChild(td);

    element.appendChild(tr);


    
});
function logout(){
    firebase.auth().signOut().then(function() {
        location.href="index.html";
      }).catch(function(error) {
        // An error happened.
      });
}

function showDiscussions(cat_id){
    var html_id = "#cat_discussions_" + cat_id;
    if($(html_id).css("display") == "block"){
        $(html_id).css("display", "none");
    }else{
        $(html_id).css("display", "block");
    }
}

function startDiscussion(cat_id){
    var html_id = "#cat_new_discussion_" + cat_id;
    var button_id = "#startDiscussionButton_" + cat_id;
    if($(html_id).css("display") == 'block'){
        $(html_id).css("display", "none");
        $(button_id).text("Start Discussion");
    }else{
        $(html_id).css("display", "block");
        $(button_id).text("Cancel");
    }
    if($(ADD).css("display") == "none"){
        $(ADD).css("display", "block");
    }
    else{
        $(ADD).css("display", "none");
    }
}

function newElement() {
    var firebaseRef = firebase.database().ref();
    var title = $("#1").val();
    var text = $("#2").val();
    if(title == "" || text == ""){
        window.alert("Empty Title or Text");
        return;
    }
    var user = firebase.auth().currentUser;
    var email = user.email;
    var thread = firebaseRef.child("threads").push();
    thread.child("title").set(title);
    thread.child("text").set(text);
    thread.child("Rcount").set(0);
    thread.child("author").set(email);
    thread.child("threadID").set(thread.key);
  }

  function newComment() {
    var firebaseRef = firebase.database().ref();
    var text = $("#6").val();
    if(text == ""){
        window.alert("Empty Title or Text");
        return;
    }
    var user = firebase.auth().currentUser;
    var email = user.email;
    
    var thread = firebaseRef.child("/threads/" + CurrentThread);
    
    var x = thread.child("comments").push();
    x.child("comment").set(text);
    x.child("user").set(user.email);
    

    var element = document.getElementById("thread5");
    var p = document.createElement("p");
    var node = document.createTextNode(user.email + ": "+ text);
    p.appendChild(node);
    p.style = "background-color: grey;color: black";
    element.appendChild(p);

    return firebase.database().ref('threads/' + CurrentThread).once('value').then(function(snapshot) {
        var Rcount = (snapshot.val().Rcount);
        Rcount = Rcount + 1;
        thread.child("Rcount").set(Rcount);
    });
  }