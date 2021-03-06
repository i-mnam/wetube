// Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

// Users
const USERS = "/users";
const USER_DETAIL = "/:id"; // HERE!!!!! //
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";
const ME = "/me";

// Videos
const VIDEOS = "/videos";
const VIDEO_DETAIL = "/:id";
const UPLOAD = "/upload";
const EDIT_VIDEO = "/:id/edit";
const DELETE_VIDEO = "/:id/delete";

// Github
const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

// Facebook
const FACEBOOK = "/auth/facebook";
const FACEBOOK_CALLBACK = "/auth/facebook/callback";

// API
const API = "/api";
const REGISTER_VIEW = "/:id/view";
const ADD_COMMENT = "/:id/comment";
const DELETE_COMMENT = "/:id/comment";

// routes
const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    users: USERS,
    userDetail: (id) => {
        if (id) {
            return `/users/${id}`; // 이 작업하기 전엔 depth개념 있게 라우팅 주소가 잡혔는데, 굳이 하드코딩 사용해서 해야하나?
        } else {
            return USER_DETAIL;
        }
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    videos: VIDEOS,
    upload: UPLOAD,
    videoDetail: (id) => {
        if (id) {
            //console.log("[routes][videoDetail()] HAVE A ID.");
            return `/videos/${id}`;
        } else {
            console.log("[routes][videoDetail()] NO ID.");
            return VIDEO_DETAIL;
        }
    },
    // editVideo: function () {
    //     console.log("**** edit video ROUTE");
    //     return EDIT_VIDEO;
    // },
    editVideo: (id) => {
        if (id) {
            return `/videos/${id}/edit`;
        } else {
            console.log("[routes][editVideo()] NO ID.");
            return EDIT_VIDEO;
        }
    },
    deleteVideo: (id) => {
        if (id) {
            return `/videos/${id}/delete`;
        } else {
            return DELETE_VIDEO;
        }
    },

    github: GITHUB,
    githubCallback: GITHUB_CALLBACK,
    me: ME,
    facebook: FACEBOOK,
    facebookCallback: FACEBOOK_CALLBACK,

    PORT: 4000,
    DOMAIN: "http://localhost",

    api: API,
    registerView: REGISTER_VIEW,
    addComment: ADD_COMMENT,
    deleteComment: DELETE_COMMENT,
};
//userDetail: USER_DETAIL, videoDetail: VIDEO_DETAIL,
// old version
// ...
// userDetail: function(id) {
//     if(id) {
//         console.log("routes.userDetail() 이렇게 호출해줄래.?");
//         return `/users/${id}`;
//     } else {
//         console.log("fail to call routes.userDetail()");
//         return USER_DETAIL; //왜? id없이 로그인 성공해서 userDetail까지 못올텐데?
//     }
// },
// ...
export default routes;
