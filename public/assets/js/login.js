$(document).ready(function () {
    const loginForm = $(".loginForm");
    const emailInput = $("#userEmail");
    const passwordInput = $("#userPassword");
    const googlelogin = $(".g-signin2");

    function onSignIn( googleUser) {
        const profile =  googleUser.getBasicProfile();
        
        $.get("/interface", (req, res) => {
                res.json("success!");
            }) 

    };

    googlelogin.on("click", function (event){
        event.preventDefault();
        onSignIn(googleUser);
    })

    

    loginForm.on("submit", function (event) {
        event.preventDefault();


        const userData = {
            email: emailInput.val().trim(),
            password: passwordInput.val().trim()
        };

        if (!userData.email || !userData.password) {
            return;
        }

        $.post("/api/login", userData
        ).then(function () {
            window.location.replace("/interface");
        })
            .catch(function (err) {
                console.log(err);

            });

    });


});
