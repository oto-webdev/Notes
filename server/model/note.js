import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
        ref: "User"
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    body: {
        type: String,
        required: [true, 'Body is required'],
        minlength: [20, 'Body must be at least 20 characters long']
    }
}, {
    timestamps: true
})

const Note = mongoose.model("Note", noteSchema)

export default Note;
