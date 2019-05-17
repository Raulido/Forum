$(".left form").on("submit", function(event){
    event.preventDefault();
    var email = $(".left .email").val();
    var password = $(".left .password").val();
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(user) {
        location.href="main.html";

    })
    .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
    });
});
