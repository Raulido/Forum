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
}