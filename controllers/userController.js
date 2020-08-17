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
            // const idStr = user._id;
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

export const githubLoginCallback = async (req, accessToken, refreshToken, profile, cb) => {
    // console.log(accessToken, refreshToken, profile, cb);
    // console.log("[profile]:" + JSON.stringify(profile));
    const {
        _json: { id, avatar_url, name, email, login },
    } = profile;

    try {
        let user = undefined;
        console.log("email:" + email);
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

export const getEditProfile = (req, res) => {
    console.log("getEditPrfile: name:" + req.user.name);
    res.render("editProfile", {
        pageTitle: "Edit Profile",
    });
};
export const postEditProfile = async (req, res) => {
    const {
        body: { name, email },
        file,
    } = req;
    console.log(req.user); // 이전 데이터 ㄸㄸㄸㄸㄸ
    console.log("name, email:" + name + "//" + email + "//" + req.user._id);
    console.log("file:" + file + "///" + ((file) ? file.path : 'path none.'));
    let user = null;
    try {
        user = await User.findByIdAndUpdate({ _id: req.user._id }, {
            name,
            email,
            avatarUrl: (file) ? file.path : req.user.avatarUrl,
        });

        console.log("============이전:" + req.user.name); // 이전데이터 ㄷ ㄷ ㄷ ㄷ
        console.log("============이후:" + user.name);

        // res.render(rouets.me, {
        //     user: user
        // });
        res.redirect(routes.me);
    } catch (error) {
        // res.render("editProfile", {
        //     pageTitle: "Edit Profile",
        // });
        res.redirect(routes.editProfile);
    }
};
export const getChangePassword = (req, res) => {
    res.render("changePassword", {
        pageTitle: "Change Password",
    });
};

export const postChangePassword = async (req, res) => {
    const {
        body: { oldPassword, newPassword, newPassword1 }
    } = req;

    try {
        if (newPassword !== newPassword1) {
            console.log("wrong type new password.");
            res.status(400);
            res.redirect(`/users${routes.changePassword}`);
            return;
        }
        // await User.changePassword(oldPassword, newPassword);
        const user = await User.findById({ _id: req.user._id });
        console.log("ddddsuccess");
        await user.changePassword(oldPassword, newPassword);

        res.redirect(routes.me);
    } catch (error) {
        console.log("fail to change password. " + error);
        res.status(400);
        res.redirect(`/users${routes.changePassword}`);
    }
};
export const userDetail = async (req, res) => {
    let {
        params: { id },
    } = req;
    console.log("before id:" + id);
    //console.log("test.." + Mongoose.Schema.ObjectId(id));

    try {
        const user = await User.findOne({ _id: id }).populate("videos");

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

export const getMe = async (req, res) => {
    try {
        // const user = await User.findOne({ _id: req.user._id });
        //최고의 난위도 이슈.. How do you turn a Mongoose document into a plain object?
        // mongoose doc은 변경이 불가하였던 애였다..
        // object vs string
        //let user = await (await User.findById({ _id: req.user._id })).toObject();

        // if (typeof (user._id) === "object") {
        //     console.log("[getMe][result DB]: " + user._id + "//" + typeof (user._id));
        //     user._id = user._id.toString();
        //     console.log("[getMe][result DB][change]: " + typeof (user._id));
        // }

        //const user = await User.findById({ _id: req.user._id });
        const user = await User.findById({ _id: req.user._id }).populate("videos");
        // console.log("avatar url:" + user.avatarUrl);
        res.render("userDetail", {
            pageTitle: "User Detail",
            user: user,
        });
    } catch (error) {
        console.log("???getme" + error);
        //???CastError: Cast to ObjectId failed for value "dfsf" at path "_id" for model "User"
        //(node:5516) UnhandledPromiseRejectionWarning: Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
        res.redirect(routes.editProfile);
    }
};

export const facebookLogin = passport.authenticate("facebook", {
    scope: ["email"], //"public_profile",
});

export const facebookLoginCallbackTest = (
    req,
    accessToken,
    refreshToken,
    profile,
    cb
) => {
    console.log(req);
    console.log(
        "[facebookLoginCallback]" + accessToken,
        refreshToken,
        profile,
        cb
    );
    console.log("--------------------------");
    console.log(profile._json); // undefined at profile._json... why...
};

export const facebookLoginCallback = async (req, accessToken, refreshToken, profile, cb) => {
    const {
        _json: { id, name, picture, email },
    } = profile;
    // const id = cb._json.id;
    // const name = cb._json.name;
    // const picture = cb._json.picture;
    // const email = cb._json.email;
    console.log(cb);
    console.log("id:" + id);
    console.log("I can't understand about profile..:" + JSON.stringify(profile));

    try {
        let user = undefined;

        if (null === email) {
            console.log(
                " fb는 정책과 passport사용상 email못가지고 오는 경우는  없겠지.?!"
            );
            // user = await User.findOne({ facebookId: id });
        } else {
            user = await User.findOne({ email });
            // await가 없으니 Object object로 나온다.. 헐 !!
            console.dir("user?" + user);
            if (user) {
                if (user.facebookId !== id) {
                    user.facebookId = id;
                    if (user.avatarUrl === undefined) {
                        user.avatarUrl = picture.data.url;
                    }
                    user.save();
                }
                return cb(null, user);
            }
        }

        const newUser = await User.create({
            email,
            name,
            facebookId: id,
            avatarUrl: picture.data.url,
        });

        return cb(null, newUser);
    } catch (error) {
        return cb(error);
    }
};

export const postFacebookLogin = (req, res) => {
    res.redirect(routes.home);
};
