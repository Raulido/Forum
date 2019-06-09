$(".left form").on("submit", function(event){
    event.preventDefault();
    var email = $(".left .email").val();
    var password = $(".left .password").val();
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(function(error) {
        location.href="main.html";
      })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        return;
      });
});
