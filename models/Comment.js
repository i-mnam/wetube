import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: "Text is required",
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const model = mongoose.model("Comment", CommentSchema);
// to text index required for $text query
model.createIndexes();
export default model;
