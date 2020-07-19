import passport from "passport";
import routes from "../routes";
import User from "../models/User";
import { urlencoded } from "body-parser";

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
            console.log(error);
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
    const {
        _json: { id, avatar_url, name, email },
    } = profile;

    try {
        const user = await User.findOne({ email });
        if (user) {
            // console.log(user);
            user.githubId = id;
            user.save();
            return cb(null, user); // if success : don't need err.
        }

        const newUser = await User.create({
            email,
            name,
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
export const userDetail = (req, res) => {
    res.render("userDetail", {
        pageTitle: "User Detail",
    });
};
