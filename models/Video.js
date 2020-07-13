import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema({
    fileUrl: {
        type: String,
        required: "File URL is required.",
    },
    title: {
        type: String,
        required: "Title is required.",
    },
    description: String,
    views: {
        type: Number,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
});
// Using Foriegn key
const model = mongoose.model("Video", VideoSchema);
// TypeError: 2nd argument to `Model` must be a POJO or string, **not** a schema. Make sure you're calling `mongoose.model()`, not `mongoose.Model()`.
export default model;
