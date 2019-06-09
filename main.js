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
firebase.auth().onAuthStateChanged(function(user) {
    if(user){   
    }
    else{
        location.href="index.html";
    }
});

const list = firebase.database().ref().child("threads");

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
    var a = document.createElement("a");
    var node = document.createTextNode(title);
    a.href = "#";
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


    
    console.log(snap.val());
});

/*
var li = document.createElement("li");
  var inputValue = document.getElementById("myInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("myUL").appendChild(li);
  }
  document.getElementById("myInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
*/
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
  }
