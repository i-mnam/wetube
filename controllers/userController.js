import routes from "../routes"

//export const join = (req, res) => res.render("join");
export const getJoin = (req, res) => {
    // res.render(routes.join, {
    res.render("join", {
        pageTitle: "Join"
    });
};
export const postJoin = (req, res) => {
    //const obj = req.body;   // obj.name;s
    const {
        body: {
            name, 
            email,
            password,
            password2
        }
    } = req;

    // ECMA Script6 TEST
    // const {
    //     body: {
    //         email: testEmail,
    //     }
    // } = req;
    // console.log("ES6_TEST variable testEmail: " + testEmail);

    // const {
    //     body: {
    //         email: tE2,
    //         password2: tP2
    //     }
    // } = req;
    // console.log("ES6_TEST variable test: " + tE2 + "// " + tP2);

    if(password !== password2) {
        res.status(400);
        res.render("join", {
            pageTitle: "Incorrect Join"
        });
    } else {
        // Todo: Register User
        // Todo: Log user in
        res.redirect(routes.home);
        // res.render("join", {
        //     pageTitle: "Correct Join"
        // });
    }
};

export const getLogin = (req, res) => res.render("login", {
    pageTitle: "Log In"
});

export const postLogin = (req, res) => {
    // Todo: check User Info
    res.redirect(routes.home);
}

export const logout = (req, res) => res.render("logout", {
    pageTitle: "Log Out"
});

// export const users = (req, res) => res.render("users");

export const editProfile = (req, res) =>  res.render("editProfile", {
    pageTitle: "Edit Profile"
});
export const changePassword = (req, res) => {
    res.render("changePassword", {
        pageTitle: "Change Password"
    });
}
export const userDetail = (req, res) => {
    res.render("userDetail", {
        pageTitle: "User Detail"
    });
}