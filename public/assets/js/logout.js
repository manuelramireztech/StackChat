$(document).ready(function () {
    const logoutBtn = $("#logoutBtn");

    logoutBtn.on("click", function (event) {
        event.preventDefault();

        $.get("/logout"
        ).then(function (data) {
    
            window.location.replace("/login");
        })
            .catch(function (err) {
                console.log(err);
            });
    });


});



