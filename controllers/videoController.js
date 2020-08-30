import routes from "../routes";
// import {videos} from "../db"
import User from "../models/User";
import Video from "../models/Video";

export const home = async (req, res) => {
  // start to looking for videos ///////////////////////////////////
  // js가 videos를 찾기 시작은 하지만 그 결과 값을 받는 것을 확인하고 다음 코드를 진행하는 것은 아니다.
  // javascript는 기다리지 않는다 !!! 살펴 보는 것을 시작하고 다음 작업도 같이 진행한다 !!!!!
  // 그래서 살펴보는 것을 시작하고 결과 받는 것 까지 확인 한 후에 다음 작업을 진행하고 싶다면 반드시 async 라는 키워드를 사용해야한다.
  // async : js가 이 function의 어떤 부분은 꼭 끝나는 것을 기다려야 한다고 하는 것이다.
  // await : 다음 과정이 끝날 때까지 잠시 기달 : 성공여부에 상관없이 끝나기를 기다리는 것.

  try {
    const videos = await Video.find({}).sort({ _id: -1 });
    // throw Error("test error");
    res.render("home", {
      pageTitle: "Home",
      videos: videos,
    });
  } catch (error) {
    console.log("[ERROR] " + error);
    res.render("home", {
      pageTitle: "Home",
      videos: [],
    });
  }
  // (node:2548) UnhandledPromiseRejectionWarning: MongoError: Invalid database name: 'wetube";'
  // ...
  // (node:2548) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (
  // 결과 적으로 try{}catch{} 안하고 async function 실행하려니 nodejs 에서 error(UnhandledPromiseRejectionWarning) 발생시켜 버리고.. 그래서  mongodb

  // error 를 최선의 방법을 생각해 다뤄야, 잡아야 한다.
  // 큰 error는 NodeJS가 망가지지만 작은 err는 안망가지고 catch에서 처리되는 걸로 넘어감

  // SyntaxError: /Users/naami/dev/nomadCoder/wetube/controllers/videoController.js:
  //Identifier 'videos' has already been declared (42:13)
};
export const search = async (req, res) => {
  const {
    query: { term: searchingBy },
  } = req;

  let videos = [];
  try {
    videos = await Video.find({
      title: {
        $regex: searchingBy,
        $options: "i",
      },
    });
  } catch (error) {
    console.log(error);
  }
  console.log("search:" + videos);
  res.render("search", {
    pageTitle: "Search",
    searchingBy,
    videos,
  });
};

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });
export const postUpload = async (req, res) => {
  // export const postUpload = (req, res) => {
  // const {
  //     body: {
  //         file,
  //         title,
  //         description
  //     }
  // } = req;
  // console.log("videoController postUpload: " + description);
  // Todo: Upload and Save Video
  //res.redirect(routes.videoDetail(11111));
  // # 3.6 Uploading and Creating a Video
  // 중요) Video가 아닌 file은 들어오지 않게 보호 해야한다.
  // const {body, file} = req;
  // console.log(body, file);

  const {
    body: { title, description },
    file: { path },
  } = req;
  console.log(
    "title ))" + title + " \n description))" + description + " \npath))" + path
  );
  //temp
  // res.render("upload", {pageTitle: "Upload"});
  const user = await User.findById({ _id: req.user._id });
  // Could you tell me why I need to create a new instance, please.:
  // Because the save method is an instance method. You call it on the instance you want to save, not the User type in general.


  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: user._id
  });


  user.videos.push(newVideo._id);
  user.save();

  // res.render(routes.videoDetail(newVideo.id));
  // Error: Failed to lookup view "/videos/5f00a29595667f089242c33e" in views directory "/Users/naami/dev/nomadCoder/wetube/views"
  // at Function.render
  // 1) 올바른 코딩 302)
  res.redirect(routes.videoDetail(newVideo._id));
  // POST /videos/upload 302 50.824 ms - 108
  // [controller][videoDtail]id: 5f01f853b4ebed078cb76de1
  // GET /videos/5f01f853b4ebed078cb76de1 200 60.351 ms - 975

  // 2) 올바르지 않은 코딩 200)
  // res.render("videoDetail", {
  //     pageTitle: "[TEST VideoDetail",
  //     videoId: newVideo.id
  // });
  // POST /videos/upload 200 103.390 ms - 980
  // AND!!
  // post 200 결과로 화면 변환을 마무리 해버림. >> 화면 변환이 post url로 되어버리면 안 됨!
  // still remain localhost:4000/videos/upload with Video Detail about 5f01fa3ffbbdf7084e928bc4
  // It's definitely wrong coding.
};

export const videoDetail = async (req, res) => {
  // TEST) send parameter from url
  const {
    params: { id },
  } = req;
  // params key가 왜 id 인가?!! routes.js 에서 그렇게 정의하였기 때문이다.
  console.log("[controller][videoDtail]id: " + id);

  try {
    const video = await Video.findById(id).populate("creator");
    console.log("[videoDetail] video:" + video);
    const test = video.creator;
    console.log("creator:" + video.creator.name);
    res.render("videoDetail", {
      pageTitle: video.title,
      video,
    });//http://localhost:4000/users/5f2fd9e754a44a0dbe6ed070
  } catch (error) {
    // console.log(error);
    res.redirect(routes.home);
  }
};
export const getEditVideo = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const video = await Video.findById(id);

    //if (video.creator !== req.user._id) { object vs string
    if (video.creator != req.user._id) {
      console.log("not equal user.");
      //console.log("vid:" + video.creator + "/" + typeof (video.creator));
      //console.log("vid:" + video.creator.toString() + "/" + typeof (video.creator.toString()));
      throw Error();
    } else {
      res.render("editVideo", {
        pageTitle: `Edit ${video.title}`,
        video,
      });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
  } = req;
  console.log("NEW:::" + title, description + "//" + id);
  try {
    const testResult = await Video.findOneAndUpdate(
      { _id: id },
      { title, description },
      { new: true },
      (err, doc) => {
        // callback
        if (err) {
          console.log("Something wrong when updating data!");
        }

        console.log("success??? result(doc):" + doc);
      }
    ).exec();
    console.log("testResult" + testResult);
    // const test = await Video.findOne({"_id":id});
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    console.log("[findOneAndUpdate Error]" + error);
    res.redirect(routes.home);
  }
  // Cat.findOneAndUpdate({age: 17}, {$set:{name:"Naomi"}}, {new: true}, (err, doc) => {
  //     if (err) {
  //         console.log("Something wrong when updating data!");
  //     }

  //     console.log(doc);
  // });
};
export const deleteVideo = (req, res) =>
  res.render("deleteVideo", { pageTitle: "Delete Video" });

export const getDeleteVideo = async (req, res) => {
  const {
    params: { id },
  } = req;

  console.log("[getDeleteVideo] id: " + id);

  try {
    const video = await Video.findById(id);

    if (video.creator != req.user._id) {
      console.log("not equal user.");
      //console.log("vid:" + video.creator + "/" + typeof (video.creator));
      //console.log("vid:" + video.creator.toString() + "/" + typeof (video.creator.toString()));
      throw Error();
    } else {
      const result = await Video.findOneAndRemove({ _id: id });
      //  await User.findOneAndDelete({ _id: req.user._id }, { $uns et: { "vidoes": { _id: id } } });
      // ㅇㅏ예 모든 user데이터를 지웠네.ㅋㅋ update가 맞았나보다.
      console.log("[getDeleteVideo] result: " + result);
    }
  } catch (error) {
    console.log("[getDeleteVideo] Error: " + error);
  }
  res.redirect(routes.home);
};

// Register Video View
export const postRegisterView = async (req, res) => {
  const {
    params: { id }
  } = req;


  try {
    const video = await Video.findById({ _id: id });
    console.log(video);
    video.views += 1;
    console.log("postRegisterView id:" + id);
    console.log(video.views);
    video.save();
    res.status(200);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
}