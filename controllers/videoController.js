import routes from "../routes"
import {videos} from "../db"


export const home = (req, res) => {
    res.render("home", {
        pageTitle: "Home",
        videos: videos
    });
    // SyntaxError: /Users/naami/dev/nomadCoder/wetube/controllers/videoController.js: 
    //Identifier 'videos' has already been declared (42:13)

}

export const search = (req, res) => {
    // console.log(req);
    // ...
    // },
    // params: {},
    // query: { term: 'item3' },
    // res: ServerResponse { ...
    // console.log("query::" + req.query.term);
    // console.log(Object.keys(req.query).length);
    // query: {term:'t', sth1:'val1', sth2:'val2'}


    // const searchingBy = req.query.term;  // beforeES6
    // {query} = req; // === req.query
    // const {
    //     query:{term}
    // } = req; // === req.query.term
    // console.log("term:" + term);
    const {
        query: {    // query를 사용하려면 GET 방식이여야만 한다?!!
            term: searchingBy
        }
    } = req;
    
    // res.render("search", {
    //     pageTitle: "Search", 
    //     searchingBy: searchingBy
    // });
    res.render("search", {
        pageTitle:"Search" ,
        searchingBy ,
        videos
    })
};

//export const videos_name_test = (req, res) => res.render("videos", {pageTitle: "Videos"});
export const getUpload = (req, res) => res.render("upload", {pageTitle: "Upload"});
export const postUpload = (req, res) => {
    const {
        body: {
            file,
            title,
            description
        }
    } = req;
    console.log("videoControl: " + description); 
    // Todo: Upload and Save Video
    res.redirect(routes.videoDetail(11111));
};
export const videoDetail = (req, res) => {
    // TEST) send parameter from url
    const {
        params: {
            id
        }
    } = req;
    console.log("id: " + id);
    res.render("videoDetail", {
        pageTitle: "Video Detail",
        videoId: id
    });
};
export const editVideo  = (req, res) => res.render("editVideo", {pageTitle: "Edit Video"});
export const deleteVideo = (req, res) => res.render("deleteVideo", {pageTitle: "Delete Video"});