import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import { urlencoded } from "body-parser";
import { Mongoose } from "mongoose";
import { mongodb } from "mongodb";

//export const join = (req, res) => res.render("join");
export const getJoin = (req, res) => {
    // res.render(routes.join, {
    res.render("join", {
        pageTitle: "Join",
    });
};
// next 인자를 더 사용함으로써 미들웨어화 되었다..?!
export const postJoin = async (req, res, next) => {
    //const obj = req.body;   // obj.name;s
    const {
        body: { name, email, password, password2 },
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

    if (password !== password2) {
        res.status(400);
        res.render("join", {
            pageTitle: "Incorrect Join",
        });
    } else {
        // Todo: Register User

        // res.redirect(routes.home);
        // res.render("join", {
        //     pageTitle: "Correct Join"
        // });
        console.log("[userController][postJoin]: " + name, email, password);
        try {
            const user = await User({
                name,
                email,
            });
            // passport 설정내용이 없어도 작동이 매우 잘되었음..
            await User.register(user, password);
            // !!!!!!!!!!!!!
            next();
        } catch (error) {
            console.log("???" + error);
            res.redirect(routes.home);
        }
        // Todo: Log user in
        // res.redirect(routes.home);
    }
};

export const getLogin = (req, res) =>
    res.render("login", {
        pageTitle: "Log In",
    });

// export const postLogin = (req, res) => {
//     // Todo: check User Info
//     res.redirect(routes.home);
// };
export const postLogin = passport.authenticate("local", {
    successRedirect: routes.home,
    failureRedirect: routes.login,
});

export const githubLogin = passport.authenticate("github");

export const githubLoginCallbackTest = passport.authenticate("github", {
    failureRedirect: "/login",
});

export const postGithubLogin = (req, res) => {
    res.redirect(routes.home);
};

export const githubLoginCallback = async (accessToken, refreshToken, profile, cb) => {
    // console.log(accessToken, refreshToken, profile, cb);
    // console.log("[profile]:" + JSON.stringify(profile));
    const {
        _json: { id, avatar_url, name, email, login },
    } = profile;

    try {
        let user = undefined;

        if (null === email) {
            user = await User.findOne({ githubId: id });
        } else {
            user = await User.findOne({ email });
        }

        //const user = await User.findOne({ email });
        if (user) {
            console.log("finded!!" + user);
            user.githubId = id;
            user.save();
            return cb(null, user); // if success : don't need err.
        }
        let tempName = name;
        console.log("name:" + name);
        if (null === name) {
            tempName = login;
        }

        const newUser = await User.create({
            email,
            name: tempName,
            githubId: id,
            avatarUrl: avatar_url,
        });
        return cb(null, newUser);
    } catch (error) {
        return cb(error);
    }
};

export const logout = (req, res) => {
    // Todo: Process Log Out
    req.logout();
    res.redirect(routes.home);
};

// export const users = (req, res) => res.render("users");

export const editProfile = (req, res) =>
    res.render("editProfile", {
        pageTitle: "Edit Profile",
    });
export const changePassword = (req, res) => {
    res.render("changePassword", {
        pageTitle: "Change Password",
    });
};
export const userDetail = async (req, res) => {
    let {
        params: { id },
    } = req;
    console.log("before id:" + id);
    //console.log("test.." + Mongoose.Schema.ObjectId(id));
    try {
        const user = await User.findOne({ _id: id });
        res.render("userDetail", {
            pageTitle: "User Detail (not me-version.)",
            user,
        });
    } catch (error) {
        console.log("???" + error);
        //???CastError: Cast to ObjectId failed for value "dfsf" at path "_id" for model "User"
        //(node:5516) UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        res.redirect(routes.home);
    }
};

export const getMe = (req, res) => {
    res.render("userDetail", {
        pageTitle: "User Detail",
        user: req.user,
    });
};

export const facebookLogin = passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
});

export const facebookLoginCallback = (
    accessToken,
    refreshToken,
    profile,
    cb
) => {
    console.log(
        "[facebookLoginCallback]" + accessToken,
        refreshToken,
        profile,
        cb
    );
};

export const postFacebookLogin = (req, res) => {
    res.redirect(routes.home);
};
