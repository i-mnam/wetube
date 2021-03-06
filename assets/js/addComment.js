import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const commentListArray = commentList.querySelectorAll("li");


const deleteComment = async (e) => {
    let target = e.target;
    let creatorId = null;
    let commentId = null;
    if (target.dataset.creator == null) {
        if (e.target.tagName !== "SPAN") {
            console.log("deleteComment null error:" + e.target);
        }
        target = e.target.parentElement;
    }
    creatorId = target.dataset.creator;
    commentId = target.dataset.id;

    // console.log("id:" + commentId + "//creator:" + creatorId);
    const videoId = window.location.href.split("/videos/")[1];

    const response = await axios({
        url: `/api/${videoId}/comment/`,
        method: "DELETE",
        data: {
            commentId: commentId,
            creatorId: creatorId,
        },
    });

    // console.log("deleteComment res:" + response);
};

const increaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const addComment = comment => {
    const li = document.createElement("li");
    const span = document.createElement("span");

    span.innerHTML = comment;
    li.appendChild(span);
    commentList.prepend(li);
    increaseNumber();
};

const sendComment = async (comment) => {
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method: "POST",
        data: {
            comment: comment,
        },
    });

    console.log("axios res:" + response);
    if (response.status === 200) {
        addComment(comment);
    }
};

const handleSubmit = (e) => {
    e.preventDefault();

    const commentInput = addCommentForm.querySelector("input");
    const comment = commentInput.value;

    sendComment(comment);
    commentInput.value = "";
}

function init() {
    addCommentForm.addEventListener("submit", handleSubmit);
    commentListArray.forEach(ele => ele.addEventListener("click", deleteComment));
}

if (addCommentForm) {
    init();
}