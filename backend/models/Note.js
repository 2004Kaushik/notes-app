import mongoose from "mongoose";

// create a schema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
},
    { timestamps: true } // createdAt, updatedAt
);



// create a model off of that schema
const Note = mongoose.model("Note", noteSchema);

export default Note;