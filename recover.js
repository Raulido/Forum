$(".left form").on("submit", function(event){
    event.preventDefault();
    var email = $(".left .email").val();
    var auth = firebase.auth();
    auth.sendPasswordResetEmail(email).then(function() {
        // Email sent.
        window.alert("email sent: ");
    }).catch(function(error) {
        // An error happened.
        console.log(error);
    });
});
