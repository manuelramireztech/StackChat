const path = require("path");
const isAuthenticated = require("../config/middleware/isAuthenticated");


module.exports = function (app) {
    
    app.get("/home", function (req, res) {
        if (req.user) {
            res.redirect("/")
        }
        res.render("index");
    });


    app.get("/login", function (req, res) {
        if (req.user) {
            res.redirect("/interface");
        }
        else res.render("login");

    app.post("/api/login", function (req, res) {
        if (req.user) {
        res.redirect("/interface");
        }
        
        else res.render("login");
    });

    app.get("/register", function (req, res) {
        if (req.user) {
            res.redirect("/interface");
        }
        else res.render("register");
        //res.render("register")
    });

    app.post("/register", function (req, res) {
        if (req.user) {
            res.redirect("/interface");
        }
        else res.render("register");
        //res.render("register")
    });

    // app.get("/interface", function (req, res) {
    //     if (!req.user) {
    //         res.redirect("/login");
    //     }
    //     //else res.render("interface.html"));
    //     else res.render("interface")
    // });
    
    app.get("/interface", function (req, res) {
        
            res.render('interface')
        
        //else res.render("interface.html"));

        //res.render("index.html"));
        
    });



    app.post("/interface/:friend", (req, res) => {
        let friend = req.params.friend;
        
         res.render('interface/:friend')
        //else res.render("interface");
        //else res.render("interface", {email: req.user.email, friends: []})
    });

    app.post('/api/signup' , (req, res) => {
        if (!req.user) {
            res.redirect('/api/login')
        }
        else res.render('interface')
    });



    // app.get("/interface", isAuthenticated, function (req, res) {
    //     res.render("interface");
    // });

})

    
};