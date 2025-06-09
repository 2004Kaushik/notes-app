import Note from "../../models/Note.js";

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({createAt: -1}); //show the newest first
        res.status(200).json(notes);
    } catch (error) {
        console.log("error in getAllNotes controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function createNote(req, res) {
    try {
        const { title, content } = req.body;
        const note = new Note({ title: title, content: content });
        const savedNote = await note.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.log("error in createNote controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateNote(req, res) {
    try {
        const {title, content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {
            new: true
        });
        if(!updateNote) return res.status(404).json({message: "note not found"});
        res.status(200).json(updatedNote);
    } catch (error) {
        console.log("error in updateNote controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function deleteNote(req, res) {
        try {
        const {title, content} = req.body;
        const deleteNote = await Note.findByIdAndDelete(req.params.id, {title, content});
        if(!deleteNote) return res.status(404).json({message: "note not found"});
        res.status(200).json({message: "Note deleted successfully!"});
    } catch (error) {
        console.log("error in deleteNote controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getNoteById(req, res) {
    try {
        const notes = await Note.findById(req.params.id);
        res.status(200).json(notes);
    } catch (error) {
        console.log("error in getAllNotes controller: ", error);
        res.status(500).json({ message: "Internal server error" });
    }
}